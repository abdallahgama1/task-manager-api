# Task Manager API

Task Manager API is a RESTful API built with NestJS and MongoDB. It allows users to manage tasks (create, read, update, and delete) and supports user authentication via JWT stored in secure HTTP-only cookies.

## Features

- **User Authentication:**  
  - User registration and login with JWT.
  - Secure cookie storage for the access token.
  - Logout endpoint to clear the authentication cookie.

- **Task Management:**  
  - CRUD operations for tasks.
  - Task filtering by title, status, and due date.
  - Input validation using `class-validator`.
  - Error handling with meaningful responses.

- **Testing:**  
  - Unit tests for controllers and services using Jest.

## Technologies Used

- **Backend Framework:** NestJS (Node.js)
- **Database:** MongoDB
- **Authentication:** JWT and Passport.js
- **Validation:** class-validator & class-transformer
- **Testing:** Jest

## Prerequisites

- Node.js (v16+ recommended)
- npm (or yarn)
- MongoDB (local installation or a remote instance like MongoDB Atlas)

## Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone <repository_url>
   cd task-manager-api
   ```

2. **Install dependencies:**
3. 
```bash
  npm install
```

3.**Create a .env file in the root directory:**

```bash
  npm run start:dev
```

The API will be available at: http://localhost:3000


## API Endpoints

 **Authentication**  
- **POST /auth/register:**
  Registers a new user.
- **POST /auth/login** 
  Logs in a user. On successful login, a secure HTTP-only cookie (access_token) is set.
- **VPOST /auth/logout** 
  Logs out the user by clearing the access_token cookie.

 **Authentication**  
  All endpoints under /tasks are protected by JWT authentication. Ensure your HTTP client sends cookies with each request.
  
- **POST /tasks**
  Creates a new task.
- **GET /tasks** 
  Retrieves tasks. Supports query parameters for filtering (e.g., title, status, due date).
- **GET /tasks/:id** 
  Retrieves a specific task by its ID.
- **PATCH /tasks/:id** 
  Updates an existing task.
- **DELETE /tasks/:id** 
  Deletes a task.

## Cookie-Based Authentication
Instead of sending the JWT in the Authorization header, the token is stored in a secure HTTP-only cookie named access_token. This is set when a user logs in and cleared on logout.

**Client-Side Note**
- **Browser/HTTP Clients:**
  Cookies are sent automatically with requests if your client is on the same domain or if CORS is configured correctly.
- **Cross-Origin Requests:**

## Testing
```bash
npm run test
```

## Environment Variables
- **JWT_SECRET: Secret key used for signing JWT tokens.**
- **MONGO_URI: MongoDB connection string.**
- **NODE_ENV: Application environment (development, production, etc.).** 
```.env
PORT = 3000 
JWT_SECRET = YOUR_SECRET_KEY
MONOGO_URI = YOUR_MONGO_DB_URI
```