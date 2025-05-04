import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const ConnectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_ATLAS_URL);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
