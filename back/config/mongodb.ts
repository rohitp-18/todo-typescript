import mongoose from "mongoose";

const mongodb = async () => {
  let url: any = process.env.MONGO_URL;
  await mongoose.connect(url);
};

export default mongodb;
