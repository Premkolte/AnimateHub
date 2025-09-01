import "dotenv/config" // load the env file
import connectToDatabase from "./src/utils/db.js"
import app from "./src/app.js"

const PORT = process.env.PORT || 5000;
connectToDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`SERVER running at port: ${PORT}`)
    })
}).catch(() => {
    console.log("Failed to connect to the database.")
})
