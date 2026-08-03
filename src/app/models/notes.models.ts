import { model, Schema, Types } from "mongoose";
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
  user: z.string().refine((val) => Types.ObjectId.isValid(val), { message: "Invalid user ID" }),
  tags: z.array(z.string().trim()).optional(),
  isArchived: z.boolean().optional(),
});


const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true , trim : true},
    content: { type: String, required: true , trim : true},
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String, trim: true }],
    isArchived: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// 4. Model
export const Note = model<INote>("Note", noteSchema);