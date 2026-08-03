import { model, Schema } from "mongoose";
import { IUser, UserModel, IUserMethods } from "../interfaces/user.interface";
import { z } from "zod";
import bcrypt from "bcrypt";

export const userValidationSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Invalid email address"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
  role: z.enum(["USER", "ADMIN", "SUPPER ADMIN"]).default("USER"),
  address: z.object({
    city: z.string().trim().min(1, "City is required"),
    street: z.string().trim().min(1, "Street is required"),
    zipcode: z.string().trim().min(1, "Zipcode is required")
  }).optional(),
  phoneNumber: z.string().trim().optional(),
});

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: { type: String, required: true, trim: true },
    role: {
      type: String,
      enum: ["USER", "ADMIN","SUPPER ADMIN"],
      required: true,
      default: "USER",
    },
    address: {
      city: { type: String, trim: true },
      street: { type: String, trim: true },
      zipcode: { type: String, trim: true },
    },
    phoneNumber: { type: String, trim: true },
  },
  { timestamps: true, versionKey: false },
);

// Pre save hook to hash password
userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) return;
  user.password = await bcrypt.hash(user.password, Number(process.env.BCRYPT_SALT_ROUNDS) || 12);
});

// Post save hook to remove password from returned document
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// Instance method to compare password
userSchema.methods.isPasswordMatched = async function (plainTextPassword: string) {
  return await bcrypt.compare(plainTextPassword, this.password);
};

export const User = model<IUser, UserModel>("User", userSchema);
