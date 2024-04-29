import mongoose from "mongoose";

export const ConnectDB = async () => {
  await mongoose.connect(process.env.MONGO);
  console.log("Db connected");
};
