import mongoose from "mongoose"

export default async function connectToDatabase() {

    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
        console.log("MongoDB connection string is not defined in environment variables.")
        return
    }

    try {
        let connection = await mongoose.connect(MONGODB_URI)
        if (connection) {
            console.log("Successfully connected to the database")
        }
    } catch (error) {
        console.error("Failed to connect to the database: ", error);
        throw error;
    }
}