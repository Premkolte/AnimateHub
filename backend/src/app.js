import express from "express"
import cors from "cors"
import cookieParser from 'cookie-parser'



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


// *--------------------- ROUTES DECLARATION
// all routes will be declared here



// *--------------------- SELF PING -> recommended for free hosting plans which put the server on sleep if not used for some time, like Render
const interval = 300000; // Interval in milliseconds (5 minutes)
function reloadWebsite() {
    axios.get(process.env.SERVER_URL)
        .then(response => {
            console.log(`Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`);
        })
        .catch(error => {
            console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
        });
}
setInterval(reloadWebsite, interval);


export { app }
