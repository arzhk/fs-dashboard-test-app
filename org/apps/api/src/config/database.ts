import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongod: MongoMemoryServer | null = null;

export const connectDatabase = async () => {
  try {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
    console.log("Connected to in-memory database");
  } catch (error) {
    console.error("Error connecting to in-memory database:", error);
    throw error;
  }
};

export const disconnectDatabase = async () => {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
    console.log("Disconnected from in-memory database");
  } catch (error) {
    console.error("Error disconnecting from in-memory database:", error);
    throw error;
  }
};
