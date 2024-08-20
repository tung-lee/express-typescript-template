import mongoose from "mongoose";
import config from "../configs";

const connectionString = `${config.db.connectionString}`;

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
      .connect(connectionString, {
        dbName: config.db.name,
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
