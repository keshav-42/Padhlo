import mongoose from "mongoose";
require("dotenv").config();

//connect to db using ts

const uri: string = process.env.DB_URI || " ";

export const connectDB = async () => {
  try {
    await mongoose.connect(uri).then((data: any) => {
      console.log(`Connected to db ${data.connection.host}`);
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};
 