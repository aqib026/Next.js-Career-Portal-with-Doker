import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (errors) {
    Promise.reject(errors);
  }
};

export default connectMongo;
