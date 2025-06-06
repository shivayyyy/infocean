import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.log("something is wrong with the database connection");
    // Optionally, you can throw the error to be caught by the caller
    throw new Error("Database connection failed");
  }
};

export default connectDB;
