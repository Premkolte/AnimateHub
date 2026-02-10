import mongoose from "mongoose";

const MAX_RETRY = 5;
const RETRY_INTERVAL = 5000;

class DatabaseConnection {
    constructor() {
        this.retryCount = 0;
        this.isConnected = false;

        mongoose.set('strictQuery', true);

        mongoose.connection.on('connected', () => {
            console.log("MongoDB connected successfully");
            this.isConnected = true;
            this.retryCount = 0;
        });

        mongoose.connection.on('error', (error) => {
            console.log("MongoDB connection failed:", error.message);
            this.isConnected = false;
        });

        mongoose.connection.on('disconnected', () => {
            console.log("MongoDB disconnected");
            this.isConnected = false;
            this.handleDisconnection();
        });

        process.on('SIGTERM', this.handleAppTermination.bind(this));
        process.on('SIGINT', this.handleAppTermination.bind(this));
    }

    async connect() {
        try {
            if (!process.env.MONGO_URI) {
                throw new Error("MONGO_URI is not defined in environment variables");
            }

            const connectionOptions = {
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
                family: 4
            };

            if (process.env.NODE_ENV === 'development') {
                mongoose.set('debug', true);
            }

            await mongoose.connect(process.env.MONGO_URI, connectionOptions);
            this.retryCount = 0;
        } catch (error) {
            console.error('Database connection error:', error.message);
            await this.handleConnectionError();
        }
    }

    async handleConnectionError() {
        if (this.retryCount < MAX_RETRY) {
            this.retryCount++;
            console.log(`Retrying to connect to MongoDB - Attempt ${this.retryCount} of ${MAX_RETRY}`);
            
            await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
            return this.connect();
        } else {
            console.error("Max retries reached. Could not connect to MongoDB.");
            process.exit(1);
        }
    }

    async handleDisconnection() {
        if (!this.isConnected && this.retryCount < MAX_RETRY) {
            console.log("Attempting to reconnect...");
            await this.connect();
        }
    }

    async handleAppTermination() {
        try {
            await mongoose.connection.close();
            console.log("MongoDB connection closed through the app");
            process.exit(0);
        } catch (error) {
            console.error("Error while closing MongoDB connection", error);
            process.exit(1);
        }
    }

    getConnectionStatus() {
        return {
            isConnected: this.isConnected,
            readyState: mongoose.connection.readyState,
            host: mongoose.connection.host,
            name: mongoose.connection.name,
            retryCount: this.retryCount
        };
    }
}

const dbConnection = new DatabaseConnection();

export default dbConnection.connect.bind(dbConnection);
export const getDBStatus = dbConnection.getConnectionStatus.bind(dbConnection);