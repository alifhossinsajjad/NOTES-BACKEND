import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import dns from "dns";
import dotenv from "dotenv";

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

let server: Server;

const PORT = process.env.PORT;

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("Database connected successfully");
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Database connection error: ", error);
  }
}

main();
