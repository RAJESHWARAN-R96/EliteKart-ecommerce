import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected || mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        const rawUri = process.env.MONGODB_URI;
        if (!rawUri) {
            console.warn("MONGODB_URI is not defined in environment variables");
            return;
        }

        let uri = rawUri.trim();
        // If URI does not have database name and doesn't contain query params or trailing slash, add default db name
        if (!uri.includes('mongodb.net/') && !uri.includes('27017/') && !uri.endsWith('/e-commerce') && !uri.includes('?')) {
            uri = `${uri}/e-commerce`;
        }

        await mongoose.connect(uri);
        isConnected = true;
        console.log("MongoDB Connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
    }
}

export default connectDB;
