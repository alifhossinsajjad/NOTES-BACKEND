import { model, Schema } from "mongoose";
import z from "zod";
import { INote } from "../interfaces/notes.interface";

export const noteValidationSchema = z.object({
  title: z
    .string({
      message: "Title is required and must be a string",
    
    })
    .trim()
    .max(100, "Title cannot exceed 100 characters"),
  content: z
    .string({
      message: "Content is required and must be a string",
    })
    .trim(),
});


const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true , trim : true},
    content: { type: String, required: true , trim : true},
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// 4. Model
export const Note = model<INote>("Note", noteSchema);