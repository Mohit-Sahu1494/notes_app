import mongoose from "mongoose";

async function connectDB() {
  try {
    
    const res = await mongoose.connect(process.env.DB_URL, {
      dbName: process.env.DB_NAME, 
    });
    
    console.log(`Database Connected Successfully ✅ | Host: ${res.connection.host}`);
    return res;
  } catch (error) {
    console.log("Mongoose connection error :-", error.message);
    process.exit(1);
  }
}

export default connectDB;
