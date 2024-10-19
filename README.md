This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



# Task Manager - Next.js

A simple task management application built with Next.js that allows users to add, edit, delete, search, and sort tasks by priority. Tasks are stored in `localStorage` for persistence, with initial tasks loaded server-side.

## Features

- **Add tasks:** Create new tasks with a title, description, and priority level (high, medium, low).
- **Edit tasks:** Modify existing tasks.
- **Delete tasks:** Remove tasks from the list.
- **Task completion:** Mark tasks as completed or pending.
- **Search tasks:** Filter tasks by searching titles or descriptions.
- **Sort by priority:** Automatically sorts tasks by priority (high -> medium -> low).
- **Local storage:** Tasks persist in the browser's `localStorage`.
- **Server-side rendering (SSR):** Initial tasks are loaded on the server.

## Technologies Used

- **Next.js**: Framework for React with server-side rendering and static site generation.
- **React Hooks**: State and side-effect management using `useState` and `useEffect`.
- **LocalStorage**: Browser storage for persisting tasks.
- **CSS in JSX**: Scoped CSS using styled JSX.

## Getting Started

Follow the instructions below to get this project up and running on your local machine.

### Prerequisites

- Node.js and npm installed on your system. You can download Node.js from [here](https://nodejs.org/).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/task-manager-nextjs.git
