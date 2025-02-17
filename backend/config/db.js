import mongoose, { connect } from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      usenewUrlParser: true,
    });
    console.log(`Successfully connected to the MongoDB👍 ${conn.connection.host}`);
  } catch (error) {
    process.exit(1);
  }
};

export default connectDB;
