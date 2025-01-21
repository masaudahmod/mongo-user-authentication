# MongoDB Authentication and User Profile Management

This README provides a guide to create a RESTful API for user profile authentication and management using MongoDB. The API includes endpoints for creating, updating, deleting, and retrieving user profiles.

---

## Prerequisites

1. **Node.js**: Install [Node.js](https://nodejs.org/).
2. **MongoDB**: Install MongoDB locally or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/atlas/database).
3. **Postman** (optional): For API testing.

---

## Setup

1. **Initialize a Node.js Project**
   ```bash
   mkdir mongodb-auth-api
   cd mongodb-auth-api
   npm init -y
   ```

2. **Install Dependencies**
   ```bash
   npm install express mongoose dotenv bcrypt jsonwebtoken
   ```

3. **Create Directory Structure**
   ```
   mongodb-auth-api
   ├── config
   │   └── db.js
   ├── controllers
   │   └── userController.js
   ├── models
   │   └── userModel.js
   ├── routes
   │   └── userRoutes.js
   ├── .env
   ├── server.js
   └── package.json
   ```
---

## API Endpoints

### 1. **Register User**
- **POST** `/api/v1/users/register`
- **Body**:
  ```json
  {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "Pa$sword123"
  }
  ```

### 2. **Login User**
- **POST** `/api/v1/users/login`
- **Body**:
  ```json
  {
      "email": "john@example.com",
      "password": "password123"
  }
  ```

### 3. **Update User**
- **PUT** `/api/v1/users/:id`
- **Body**:
  ```json
  {
      "name": "John Updated",
      "email": "johnupdated@example.com",
      "password": "newpassword123"
  }
  ```

### 4. **Delete User**
- **DELETE** `/api/v1/users/:id`

---

## Testing

1. Use [Postman](https://www.postman.com/) or similar tools to test the API endpoints.
2. Ensure you provide the JWT token for protected routes if you implement middleware.

---

## License
This project is open-source and available under the MIT License.

