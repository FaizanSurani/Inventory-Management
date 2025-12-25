import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connection Established");
    } catch (error) {
        console.log("Error while connecting");
    }
}

export default DB;