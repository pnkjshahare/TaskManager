# Task Manager

## Overview

A simple Task Manager web application where users can **add, update, delete, and mark tasks as completed**.

## Features

- Add a new task (Title, Description)
- Mark a task as completed
- Edit a task
- Delete a task
- View all tasks
- Drag-and-drop for task reordering (Bonus)
- Dark mode (Bonus)
- Authentication using JWT (Bonus)

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Libraries Used**: MERN (MongoDB, Express.js, React, Node.js)
- **Deployment**: Vercel (Frontend), Render/Heroku (Backend)

## Installation & Setup

### Prerequisites

- Node.js & npm installed
- MongoDB database (local or Atlas)

### Clone Repository

```sh
 git clone https://github.com/yourusername/task-manager.git
 cd task-manager
```

### Backend Setup

```sh
 cd backend
 npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_uri
PORT=5000
JWT_SECRET=your_secret_key
```

Run the backend:

```sh
 npm start
```

### Frontend Setup

```sh
 cd frontend
 npm install
```

Run the frontend:

```sh
 npm run dev
```

## API Endpoints

### Task Routes

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| GET    | `/api/tasks`         | Get all tasks           |
| POST   | `/api/tasks`         | Create a new task       |
| GET    | `/api/tasks/:id`     | Get a single task by ID |
| PUT    | `/api/tasks/:id`     | Update a task           |
| DELETE | `/api/tasks/:id`     | Delete a task           |
| PUT    | `/api/tasks/reorder` | Reorder tasks           |

## Deployment

### Frontend Deployment (Vercel)

```sh
 cd frontend
 vercel
```

### Backend Deployment (Render)

```sh
 cd backend
 render deploy
```

## Live Demo

[Task Manager Live Demo](your-demo-link)

## License

This project is open-source and available under the MIT License.
