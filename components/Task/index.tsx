"use client";
import { useState, useEffect } from 'react';

// Server-Side Rendering to load initial tasks
export async function getServerSideProps() {
  const tasks = [
    { id: 1, title: 'Task 1', description: 'Description 1', priority: 'high', completed: false },
    { id: 2, title: 'Task 2', description: 'Description 2', priority: 'medium', completed: false },
  ];

  return { props: { initialTasks: tasks } };
}

export default function Home({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks || []);  // Ensure tasks is initialized as an array
  const [newTask, setNewTask] = useState({ title: '', description: '', priority: 'low' });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState({ title: '', description: '', priority: 'low' });
  const [searchTerm, setSearchTerm] = useState('');

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    } else {
      // Save initial tasks to local storage if there are no saved tasks
      localStorage.setItem('tasks', JSON.stringify(initialTasks));
    }
  }, [initialTasks]);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (!newTask.title || !newTask.description) return; // Simple validation
    const taskToAdd = {
      ...newTask,
      id: Date.now(), // Unique ID based on timestamp
      completed: false,
    };
    setTasks([...tasks, taskToAdd]);
    setNewTask({ title: '', description: '', priority: 'low' });
  };

  // Edit a task
  const startEditingTask = (task) => {
    setEditingTaskId(task.id);
    setEditingTask({ title: task.title, description: task.description, priority: task.priority });
  };

  const saveTaskEdit = (id) => {
    const updatedTasks = tasks.map(task => task.id === id ? { ...task, ...editingTask } : task);
    setTasks(updatedTasks);
    setEditingTaskId(null); // Reset edit state
  };

  // Toggle completion status of a task
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  };

  // Sort tasks dynamically by priority
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 }; // Assign weights to priorities
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // Filter tasks based on the search term
  const filteredTasks = sortedTasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Task Manager</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Task Input Form */}
      <div className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <select
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {Array.isArray(filteredTasks) && filteredTasks.map((task) => (
          <li key={task.id} className={`task ${task.priority}`}>
            {editingTaskId === task.id ? (
              // Edit Task Form
              <div>
                <label>Title</label>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                />
                <label>Description</label>
                <textarea
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                />
                <label>Priority</label>
                <select
                  value={editingTask.priority}
                  onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button onClick={() => saveTaskEdit(task.id)}>Save</button>
                <button onClick={() => setEditingTaskId(null)}>Cancel</button>
              </div>
            ) : (
              // Task Display
              <div>
                <h3>Title: {task.title}</h3>
                <p>Description: {task.description}</p>
                <span>Priority: {task.priority}</span><br/>
                <span>Status: {task.completed ? 'Completed' : 'Pending'}</span><br/>
                <button className='mx-2' onClick={() => toggleTaskCompletion(task.id)}>
                  {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                </button>
                <button className='mx-2' onClick={() => startEditingTask(task)}>Edit</button>
                <button className='mx-2' onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Style (CSS) */}
      <style jsx>{`
        .container {
          width: 90%;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        h1 {
        color: black;
          text-align: center;
          margin-bottom: 20px;
        }
        .search-bar {
          margin-bottom: 20px;
          padding: 10px;
          width: 100%;
          font-size: 16px;
          border-radius: 4px;
          border: 1px solid #ddd;
        }
        .task-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
          padding: 20px;
          background-color: #f0f0f0;
          border-radius: 8px;
        }
        input, select, textarea {
          padding: 8px;
          font-size: 16px;
          width: 100%;
          border: 1px solid #ddd;
          border-radius: 4px;
          color: black;
        }
        textarea {
          resize: vertical;
          min-height: 80px;
        }
        button {
          padding: 10px 15px;
          font-size: 16px;
          cursor: pointer;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
        }
        button:hover {
          background-color: #005bb5;
        }
        .task-list {
    list-style: none;
    padding: 0;
  }
  .task {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: black;
    margin-bottom: 15px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  .task-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    color: white;
  }
  .task.high {
    border-left: 6px solid red;
  }
  .task.medium {
    border-left: 6px solid yellow;
  }
  .task.low {
    border-left: 6px solid green;
  }
  h3, p {
    margin: 0;
  }
  .task-actions {
    display: flex;
    gap: 10px;
  }
  span {
    margin-top: 5px;
    font-size: 14px;
    font-weight: bold;
  }
  button {
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    background-color: #0070f3;
    color: white;
    border: none;
    border-radius: 4px;
  }
  button:hover {
    background-color: #005bb5;
  }
      `}</style>
    </div>
  );
}


