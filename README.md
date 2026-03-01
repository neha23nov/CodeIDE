#  CodeIDE

This project is a full-stack web application that allows users to create, edit, and manage coding projects in multiple programming languages. It features a React-based frontend and an Express.js backend, with MongoDB as the database.

## Features

### Frontend
- **Sign Up and Login**: User authentication with secure token-based login.
- **Home Page**: Displays a list of projects created by the user.
- **Create Project**: Allows users to create new projects by selecting a programming language and providing a project name.
- **Edit Project**: Users can rename existing projects.
- **Delete Project**: Users can delete projects they no longer need.
- **Code Editor**: Integrated Monaco Editor for writing and editing code.
- **Run Code**: Execute code using the [Piston API](https://emkc.org/api/v2/piston/execute).
- **Responsive UI**: Built with TailwindCSS for a modern and responsive design.

### Backend
- **User Management**: Handles user registration, login, and authentication using JWT.
- **Project Management**: APIs for creating, editing, fetching, and deleting projects.
- **Database**: MongoDB for storing user and project data.

## Project Structure

### Frontend
Located in the `frontend/` directory:
- **React**: Used for building the user interface.
- **React Router**: For navigation between pages.
- **React Toastify**: For displaying notifications.
- **TailwindCSS**: For styling.
- **Vite**: For fast development and build processes.

### Backend
Located in the `backend/` directory:
- **Express.js**: For building RESTful APIs.
- **Mongoose**: For interacting with MongoDB.
- **JWT**: For secure authentication.
- **Bcrypt.js**: For password hashing.

 ## Technologies Used
## Frontend
React
React Router
TailwindCSS
Vite
Monaco Editor
React Toastify
## Backend
Express.js
MongoDB
Mongoose
JWT
Bcrypt.js
External APIs
Piston API: Used for fetching runtimes and executing code.
