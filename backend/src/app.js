// --------------------- IMPORTS ---------------------
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import axios from "axios";

// --------------------- APP INIT ---------------------
const app = express();

// --------------------- CORS CONFIGURATION ---------------------
const allowedOrigins = process.env.ALLOWED_CORS_ORIGINS
  ? process.env.ALLOWED_CORS_ORIGINS.split(",").map(origin => origin.trim())
  : ["*"]; // fallback to allow all in local dev

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    console.warn(`[CORS BLOCKED] Origin: ${origin}`);
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// --------------------- GLOBAL MIDDLEWARES ---------------------
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// --------------------- ROUTE IMPORTS ---------------------
import authRoute from "./routes/auth.route.js";
import componentsRoute from "./routes/components.route.js";
import profileRoute from "./routes/profile.route.js";
import adminRoute from "./routes/admin.route.js";
import blogRoute from "./routes/blog.route.js";
import commentRoute from "./routes/comment.route.js";

// --------------------- ROUTE DECLARATIONS ---------------------
app.use("/api/auth", authRoute);
app.use("/api/components", componentsRoute);
app.use("/api/profile", profileRoute);
app.use("/api/admin", adminRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/blogs/comments", commentRoute);

// --------------------- HEALTH CHECK ---------------------
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || "development",
  });
});

// --------------------- UPTIME MONITOR ---------------------
if (process.env.SERVER_URL && process.env.NODE_ENV === "production") {
  const interval = 300000; // 5 minutes
  setInterval(() => {
    (async () => {
      try {
        const response = await axios.get(`${process.env.SERVER_URL}/api/health`);
        console.log(`[Uptime Ping ✅] ${new Date().toISOString()} | Status: ${response.status}`);
      } catch (err) {
        console.error(`[Uptime Ping ❌] ${new Date().toISOString()} |`, err.message);
      }
    })();
  }, interval);
}

// --------------------- GLOBAL ERROR HANDLER ---------------------
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(`[Error] ${err.message}`);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// --------------------- 404 HANDLER ---------------------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
