import express, { Application, Request, Response } from "express";
import { model, Schema, Document } from "mongoose";
import { z } from "zod";
import { notesRouter } from "./app/controller/notes.controller";
import { userRouter } from "./app/controller/user.controller";

const app: Application = express();
app.use(express.json());

// Middleware to parse JSON bodies

app.use("/notes", notesRouter);
app.use("/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Note App API!");
});

export default app;
