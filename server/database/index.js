import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/Profile`);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error : ", error);
    process.exit();
  }
}

export default connectDB;
