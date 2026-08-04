import { model, Schema } from "mongoose";
import { IUser, UserModel, IUserMethods } from "../interfaces/user.interface";
import { z } from "zod";
import bcrypt from "bcrypt";
import { Note } from "./notes.models";

export const userValidationSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Invalid email address"),
  password: z.string().trim().min(6, "Password must be at least 6 characters"),
  role: z.enum(["USER", "ADMIN", "SUPPER ADMIN"]).default("USER"),
  address: z.object({
    city: z.string().trim().min(1, "City is required"),
    street: z.string().trim().min(1, "Street is required"),
    zipcode: z.coerce.string().trim().regex(/^\d+$/, "Zipcode must contain only numbers")
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
      city: { type: String, required:true, trim: true },
      street: { type: String, required:true, trim: true },
      zipcode: { type: String, required:true, trim: true },
    },
    phoneNumber: { type: String, trim: true },
  },
  { 
    timestamps: true, 
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  },
);

// Virtual property for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Pre save hook to hash password
userSchema.pre("save", async function () {
  const user = this;
  if (!user.isModified("password")) return;
  user.password = await bcrypt.hash(user.password, Number(process.env.BCRYPT_SALT_ROUNDS ||12 ));
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

// Query Middleware for Cascading Delete
userSchema.pre("findOneAndDelete", async function () {
  const query = this.getQuery();
  const userId = query._id;

  if (userId) {
    await Note.deleteMany({ user: userId });
  }
});

export const User = model<IUser, UserModel>("User", userSchema);
