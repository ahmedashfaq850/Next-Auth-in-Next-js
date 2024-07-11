import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}`
    );

    console.log("MongoDB is connected:", connectionInstance.connection.host);
  } catch (err) {
    console.log("MongoDB Connection is failed", err);
    process.exit(1);
  }
};

export default ConnectDB;
