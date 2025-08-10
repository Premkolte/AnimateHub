import "dotenv/config" // load the env file
import connectToDatabase from "./src/utils/db.js"
import { app } from "./src/app.js"

connectToDatabase().then(() => {
    app.listen(5000, () => {
        console.log(`SERVER running at port: 5000`)
    })
}).catch(() => {
    console.log("Failed to connect to the database.")
})
