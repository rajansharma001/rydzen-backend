# rydzen-backend

Backend API for the **Rydzen** platform, built with Node.js, Express, and MongoDB.  
Provides secure, scalable RESTful endpoints, authentication, and modular architecture for managing your application data.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Configuration**: Environment variables using `.env`
- **Structure**: Controllers, services, routes, middleware, models

---

## 📁 Project Structure

```
.
├── config/          # Configuration files (DB connection, environment, secrets)
├── controllers/     # Request handlers / business logic
├── middleware/      # JWT auth, validation, error handling, logging
├── models/          # Mongoose / DB models / schemas
├── routes/          # API route definitions
├── app.js            #Express app initialization
├── package.json
├── tsconfig.json     # If using TypeScript
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/rajansharma001/rydzen-backend.git
cd rydzen-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=1d
NODE_ENV=development
```

---

## ▶️ Running the App

- **Development mode**

  ```bash
  npm run dev
  ```

- **Production mode**
  ```bash
  npm run build
  npm start
  ```

---

## 🔐 Authentication

- JWT-based authentication for secure API endpoints.
- Tokens sent in the `Authorization` header for protected routes.

---

## 🔧 Environment Variables

- PORT
- MONGODB_URI
- JWT_SECRET
- JWT_EXPIRES_IN
- NODE_ENV

---

## 🚧 Future Improvements

- Role-based access control (RBAC)
- Logging and monitoring
- API documentation

---
