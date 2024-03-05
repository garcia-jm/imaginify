import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cachced: MongooseConnection = (global as any).mongoose;

if (!cachced) {
  cachced = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  if (cachced.conn) return cachced.conn;

  if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

  cachced.promise =
    cachced.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "imaginify",
      bufferCommands: false,
    });

  cachced.conn = await cachced.promise;
  return cachced.conn;
};
