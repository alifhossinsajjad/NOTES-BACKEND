# 🚀 Advanced Scalable Note App Backend

Welcome to the backend of the Note App! This is not just a regular backend—it has been engineered from the ground up by following industry-standard **Enterprise Architecture Patterns** to ensure it is highly scalable, secure, and maintainable.

## 🌟 Why is this Backend Unique?
Most beginner backends dump all routes, models, and logic into a single `server.ts` or `app.ts` file. While that works for small projects, it becomes a nightmare when the app grows. 

This backend is different because:
1. **Modular MVC Architecture:** We have decoupled the code into `models`, `controllers`, `interfaces`, and `routes`. 
2. **Future-Proof Folder Structure:** If your app grows from 2 modules (Notes, Users) to 50 modules (Payments, Notifications, Analytics), **you will never need to restructure the folders**. You simply add a new controller and model in the existing structure, and it will scale beautifully.
3. **Double-Layer Validation:** We are not relying only on Mongoose. We use **Zod** for strict runtime validation before data even hits the database.
4. **Type-Safe:** Fully written in TypeScript using Generics (`<IUser>`, `<INote>`) to ensure zero unexpected bugs during development.
5. **Secure by Default:** Sensitive data like MongoDB URIs are protected using `.env` variables, and passwords/secrets are explicitly stripped from API responses.

## 📂 Folder Structure
The project follows a standard **Modular / MVC Pattern**:
```text
src/
├── app.ts                 # Express App Setup & Global Middleware
├── server.ts              # Database Connection & Server Listener
└── app/
    ├── interfaces/        # TypeScript Interfaces for Type Safety (e.g., user.interface.ts)
    ├── models/            # Mongoose Schemas & Zod Validation (e.g., user.model.ts)
    └── controller/        # Business Logic & Routes (e.g., user.controller.ts)
```

---

## 📡 API Endpoints Documentation

Base URL: `http://localhost:5000` (or your configured `PORT`)

### 🧑‍💻 1. User Endpoints (`/users`)

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/users/create-user` | Create a new user | `{"firstName": "John", "lastName": "Doe", "email": "john@ex.com", "password": "123", "role": "user"}` |
| `GET` | `/users/` | Get all users | None |
| `GET` | `/users/:id` | Get user by ID | None |
| `PATCH` | `/users/update-user/:id` | Update user | `{"firstName": "Updated Name"}` (Partial allowed) |
| `DELETE`| `/users/delete-user/:id` | Delete user | None |

**Example Response (Create User):**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@ex.com",
    "role": "user",
    "_id": "64b5f8c..."
  }
}
```
*(Note: Passwords are intentionally omitted from all responses for security).*

---

### 📝 2. Notes Endpoints (`/notes`)

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `POST` | `/notes/create-note` | Create a new note | `{"title": "My Note", "content": "Hello World"}` |
| `GET` | `/notes/` | Get all notes | None |
| `GET` | `/notes/:id` | Get note by ID | None |
| `PATCH`| `/notes/update-note/:id` | Update note | `{"title": "Updated Title"}` (Partial allowed) |
| `DELETE`| `/notes/delete-note/:id`| Delete note | None |

**Example Response (Get All Notes):**
```json
{
  "success": true,
  "message": "Notes fetched successfully",
  "data": [
    {
      "_id": "6a6da69...",
      "title": "My Note",
      "content": "Hello World",
      "createdAt": "2026-08-01T10:00:00.000Z",
      "updatedAt": "2026-08-01T10:00:00.000Z"
    }
  ]
}
```

---
*Built with ❤️ following Senior Engineer Best Practices.*
