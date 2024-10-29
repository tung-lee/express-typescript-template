import mongoose from "mongoose";
import { config } from "@/config";

class Database {
  private static instance: Database;

  constructor() {
    this.connect();
  }

  connect() {
    mongoose.set("debug", true);
    mongoose.set("debug", {
      color: true,
    });

    mongoose
      .connect(`${config.nosqlDb.type}://${config.nosqlDb.user}:${config.nosqlDb.password}@${config.nosqlDb.host}:${config.nosqlDb.port}`, {
        dbName: `${config.nosqlDb.name}`,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
      });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const mongodbInstance = Database.getInstance();

export default mongodbInstance;
