import mongoose, { connect } from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Successfully connected to the MongoDB👍`);
  } catch (error) {
    console.error("Error: ${error.message}");
    process.exit(1);
  }
};

export default connectDB;
