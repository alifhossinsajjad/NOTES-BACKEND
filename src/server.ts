import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

let server: Server;

const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://alifhossinsajjad123456_db_user:7voXvkT1ZM91oUuA@note.lmvwp8k.mongodb.net/?appName=note",
    );
    console.log("Database connected successfully");
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Database connection error: ", error);
  }
}

main();
