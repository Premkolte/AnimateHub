# AnimateHub Backend

Backend service for AnimateHub, handling authentication, data management, and other core functionalities.

## 🚀 Features

- **RESTful API** built with Express.js
- **MongoDB** database integration with Mongoose
- **CORS** enabled with configurable allowed origins
- **Cookie-based** authentication
- **Environment-based** configuration
- **Development** mode with hot-reload support

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
│   ├── controllers/    # Route controllers
│   ├── models/         # Database models
│   ├── routes/         # Route definitions
│   ├── middlewares/    # Custom middleware
│   ├── utils/          # Utility functions
│   ├── app.js          # Express application setup
│   └── index.js        # Server entry point
├── .env                # Environment variables (create this file)
├── package.json        # Project dependencies and scripts
└── README.md           # This file
```

## 🚦 Environment Variables

| Variable              | Description                                   | Default Value           |
|-----------------------|-----------------------------------------------|-------------------------|
| `PORT`               | Port to run the server on                     | `3000`                  |
| `MONGODB_URI`        | MongoDB connection string                     | - (required)            |
| `ALLOWED_CORS_ORIGINS`| Comma-separated list of allowed CORS origins  | `http://localhost:3000` |

## 🚀 Available Scripts

- `npm run dev` - Start the development server with hot-reload
- `npm start` - Start the production server
- `npm test` - Run tests (if configured)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
