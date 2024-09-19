import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        console.log('mongoose Connected☕');

    } catch (error) {
        console.log(error);
        process.exit(1)

    }
}