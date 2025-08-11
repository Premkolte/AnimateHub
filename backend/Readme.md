# AnimateHub Backend

Backend service for AnimateHub, a platform for discovering and sharing UI animations. Built with Node.js, Express, and MongoDB, it provides a robust API for user authentication, animation management, and community features.

## 🚀 Features

- **RESTful API** built with Express.js
- **JWT Authentication** with secure cookie storage
- **Email Verification** for new user accounts
- **Password Reset** functionality
- **MongoDB** database with Mongoose ODM
- **CORS** enabled with configurable allowed origins
- **Environment-based** configuration
- **Development** mode with hot-reload support
- **Rate limiting** and security best practices

## 📦 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Premkolte/AnimateHub.git
   cd AnimateHub/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ALLOWED_CORS_ORIGINS=http://localhost:3000,http://localhost:3001
   # Add other environment variables as needed
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The server will be available at `http://localhost:3000` by default.

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── controllers/    # Route controllers (auth, user, animations)
│   ├── models/         # Database models (User, Animation, etc.)
│   ├── routes/         # Route definitions
│   ├── middlewares/    # Custom middleware (auth, error handling)
│   ├── services/       # Business logic and external services
│   │   └── email/      # Email templates and sending logic
│   ├── utils/          # Utility functions and helpers
│   ├── app.js          # Express application setup
│   └── index.js        # Server entry point
├── .env                # Environment variables
├── .gitignore          # Git ignore file
├── package.json        # Project dependencies and scripts
└── README.md           # This file
```

## 🚦 Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable                | Description                                      | Required | Default                     |
|-------------------------|--------------------------------------------------|----------|-----------------------------|
| `PORT`                 | Port to run the server on                        | No       | `5000`                      |
| `MONGODB_URI`          | MongoDB connection string                        | Yes      | -                           |
| `JWT_SECRET`           | Secret key for JWT token signing                | Yes      | -                           |
| `EMAIL_USER`           | Email address for sending notifications         | Yes      | -                           |
| `EMAIL_PASSWORD`       | App password for the email service              | Yes      | -                           |
| `BCRYPT_SALT_ROUNDS`   | Number of salt rounds for password hashing      | No       | `10`                        |

## 🚀 Available Scripts

- `npm run dev` - Start the development server with hot-reload using nodemon
- `npm start` - Start the production server
- `npm test` - Run tests (if configured)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the `Authorization` header as `Bearer <token>` for protected routes.

## 📧 Email System

The backend includes a built-in email system for:
- Account verification
- Password reset
- Account notifications

## 🌐 API Documentation

For detailed API documentation, please refer to the [API Documentation](https://github.com/Premkolte/AnimateHub/tree/main/backend/docs/API.md) (coming soon).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
