# Note App Backend API

This is the backend for the Note App, built with Express, Mongoose, and Zod for validation.

## 🚀 Postman Testing Guide (User CRUD API)

Assuming your server is running on `http://localhost:5000`.

### 1. Create a New User
* **Method:** `POST`
* **URL:** `http://localhost:5000/users/create-user`
* **Headers:** `Content-Type: application/json`
* **Body (raw > JSON):**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "secretpassword",
  "role": "user"
}
```
* **Note:** `role` can be `"user"` or `"admin"`. It is optional, default is `"user"`.

### 2. Get All Users
* **Method:** `GET`
* **URL:** `http://localhost:5000/users/`
* **Action:** Just hit send. You will get an array of all users (passwords will be hidden).

### 3. Get a Single User
* **Method:** `GET`
* **URL:** `http://localhost:5000/users/<USER_ID>`
* **Action:** Replace `<USER_ID>` with an actual `_id` from the database (e.g., `http://localhost:5000/users/64b5f8c...`).

### 4. Update a User
* **Method:** `PATCH`
* **URL:** `http://localhost:5000/users/update-user/<USER_ID>`
* **Headers:** `Content-Type: application/json`
* **Body (raw > JSON):**
```json
{
  "firstName": "Updated Name",
  "role": "admin"
}
```
* **Note:** You can pass only the fields you want to update (partial update).

### 5. Delete a User
* **Method:** `DELETE`
* **URL:** `http://localhost:5000/users/delete-user/<USER_ID>`
* **Action:** Hit send. The user will be removed from the database.
