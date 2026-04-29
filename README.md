# Task Manager App (MERN Stack)

---

## 1. Project Title

**Task Manager App (MERN Stack)**

---

## 2. Project Description

The Task Manager App is a full-stack web application designed to help users efficiently organize, track, and manage their daily tasks. It supports both regular users and administrators with role-based access. The application is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) to provide a scalable and responsive solution.

---

## 3. Tech Stack

### Core Technologies

- MongoDB – Database
- Express.js – Backend Framework
- React.js – Frontend Library
- Node.js – Runtime Environment

### Additional Tools

- Axios – API communication
- JSON Web Token (JWT) – Authentication
- Bootstrap / CSS – UI styling
- dotenv – Environment variable management

---

## 4. Core Features

- User Authentication (Register/Login)
- Role-Based Access Control (User/Admin)
- Task CRUD Operations (Create, Read, Update, Delete)
- Admin User Management
- Task Filtering, Sorting, and Pagination
- Protected Routes (Frontend & Backend)

---

## 5. Roles & Permissions

| Feature                    | User | Admin |
| -------------------------- | ---- | ----- |
| Register/Login             | ✓    | ✓     |
| Create Tasks               | ✓    | ✓     |
| View Own Tasks             | ✓    | ✓     |
| Update Own Tasks           | ✓    | ✓     |
| Delete Own Tasks           | ✓    | ✓     |
| Filter/Sort/Paginate Tasks | ✓    | ✓     |
| View All Users             | ✗    | ✓     |
| Create New Users           | ✗    | ✓     |
| Update User Details        | ✗    | ✓     |
| Delete Users               | ✗    | ✓     |

---

## 6. Folder Structure

```
task-manager-mern/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

---

## 7. Local Setup Instructions

### Backend Setup

1. Navigate to backend folder:

```
cd backend
```

2. Install dependencies:

```
npm install
```

3. Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Run backend server:

```
npm start
```

5. Backend URL:

```
http://localhost:5000
```

---

### Frontend Setup

1. Navigate to frontend folder:

```
cd frontend
```

2. Install dependencies:

```
npm install
```

3. Create `.env` file:

```
REACT_APP_API_URL=http://localhost:5000
```

4. Run frontend:

```
npm start
```

5. Frontend URL:

```
http://localhost:3000
```

---

## 8. Authentication Flow

1. User registers using email and password.
2. User logs in with credentials.
3. Backend validates credentials and generates a JWT token.
4. Token is sent to frontend and stored (localStorage/sessionStorage).
5. For protected routes:
   - Frontend sends token in request headers.
   - Backend verifies token using JWT middleware.

6. If token is valid:
   - Access is granted.

7. If token is invalid or expired:
   - Access is denied and user is redirected to login.

---

## 9. API Overview

### Authentication APIs

- POST `/auth/register` – Register new user
- POST `/auth/login` – Login user

### Task APIs

- GET `/tasks` – Get all tasks
- POST `/tasks` – Create task
- GET `/tasks/:id` – Get single task
- PUT `/tasks/:id` – Update task
- DELETE `/tasks/:id` – Delete task

### User APIs (Admin Only)

- GET `/users` – Get all users
- POST `/users` – Create user
- PUT `/users/:id` – Update user
- DELETE `/users/:id` – Delete user

---

## 10. Creating First Admin

1. Register a normal user using `/auth/register`.
2. Open MongoDB database (using MongoDB Compass or CLI).
3. Locate the user in the `users` collection.
4. Update the role field:

```
role: "admin"
```

5. Save changes.
6. Login again to access admin features.

---

## 11. Future Enhancements

- Real-time notifications
- File upload support
- Task reminders
- Real-time updates using WebSockets
- Mobile application version

---

## Object Overview and Scope

### Overview

The Task Manager App is a full-stack system that allows users to efficiently manage tasks with features such as task creation, tracking, and updates. It ensures secure authentication and role-based access using modern web technologies.

### Scope of the Project

- User registration and login
- Task creation, update, and deletion
- Task filtering, sorting, and pagination
- Admin-based user management
- Role-based access control

---

## Modules of the System

### 1. Task Management Module

- Create tasks
- View tasks (list and detailed view)
- Update task information
- Delete tasks
- Apply filters
- Sorting and pagination

### 2. User Management Module (Admin Only)

- Create new users
- View all users
- Update user details
- Delete users

### 3. Authentication Module

- Register new users (Sign Up)
- Login existing users (Sign In)
- Generate and validate JWT tokens

---
