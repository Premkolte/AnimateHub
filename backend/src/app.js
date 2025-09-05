import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'
import axios from "axios";


const app = express();

// ~------------------ CORS
// CORS origin policy supporting multiple URLs from env
const allowedOrigins = process.env.ALLOWED_CORS_ORIGINS.split(',').map(origin => origin.trim())

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // if you're using cookies or sessions
};
app.use(cors(corsOptions));



// ~--------------------- LIMIT JSON | ENABLING COOKIES
// to set max size of json coming from frontend to backend
app.use(express.json({ limit: '1024kb' }))
// limit the incoming html forms data
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(cookieParser())




// *--------------------- ROUTES IMPORT
// all routes are meant to be imported here
import authRoute from "./routes/auth.route.js"
import componentsRoute from "./routes/components.route.js"
import profileRoute from "./routes/profile.route.js"
import adminRoute from "./routes/admin.route.js"
import blogRoute from "./routes/blog.route.js"
import commentRoute from "./routes/comment.route.js"








// *--------------------- ROUTES DECLARATION
// all routes will be declared here
app.use("/api/auth", authRoute)
app.use("/api/components", componentsRoute)
app.use("/api/profile", profileRoute)
app.use("/api/admin", adminRoute)
app.use("/api/blogs", blogRoute)
app.use("/api/blogs/comments",commentRoute)






// *--------------------- HEALTH CHECK & UPTIME MONITOR
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

// Optional uptime ping for free hosting (Render/Heroku etc.)
if (process.env.SERVER_URL) {
    const interval = 300000; // 5 minutes
    setInterval(async () => {
        try {
            const response = await axios.get(process.env.SERVER_URL + "/api/health");
            console.log(`[Uptime Ping] ${new Date().toISOString()} | Status: ${response.status}`);
        } catch (err) {
            console.error(`[Uptime Ping Error] ${new Date().toISOString()} |`, err.message);
        }
    }, interval);
}



export default  app 
