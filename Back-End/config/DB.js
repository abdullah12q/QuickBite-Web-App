import mongoose from "mongoose";

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.connectionString = process.env.MONGODB_URI;

    this.connection = this.connect();

    Database.instance = this;
  }

  connect() {
    mongoose
      .connect(this.connectionString)
      .then(() => console.log("Database Connection Successful (Singleton)"))
      .catch((err) => console.error("Database Connection Error", err));

    return mongoose.connection;
  }

  static getInstance() {
    if (!Database.instance) {
      new Database();
    }
    return Database.instance;
  }
}

export default Database;
