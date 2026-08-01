import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { z } from "zod";

export const userValidationSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Invalid email address"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "admin"]).default("user")
});

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  role: { type: String, enum: ["user", "admin"], required: true, default: "user" },
}, { timestamps: true, versionKey: false });

export const User = model<IUser>("User", userSchema);
