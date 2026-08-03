import express, { type Request, type Response } from "express";
import { User, userValidationSchema } from "../models/user.model";
import { z } from "zod";

export const userRouter = express.Router();

// Create a User
userRouter.post(
  "/create-user",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = userValidationSchema.parse(req.body);
      // const savedUser = await User.create(validatedData);

      //** Instance mathod */
      const user = new  User(validatedData)
      await user.save()

      // Don't send password back in response
      const userResponse = user.toObject();
      delete (userResponse as any).password;

      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: userResponse,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: error.issues.map((err: any) => ({
            field: err.path[0],
            message: err.message,
          })),
        });
        return;
      }

      // Handle unique email constraint
      if (error.code === 11000) {
        res.status(400).json({
          success: false,
          message: "Email already exists",
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: "Failed to create user",
        error: error.message,
      });
    }
  },
);

// Get all users
userRouter.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    // Exclude password from the results
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});

// Get a single user by ID
userRouter.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message,
    });
  }
});

// Update a single user by ID
userRouter.patch(
  "/update-user/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Validate request body, allowing partial updates
      const validatedData = userValidationSchema.partial().parse(req.body);

      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        validatedData,
        { new: true, select: "-password" },
      );

      if (!updatedUser) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
      }

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation Error",
          errors: error.issues,
        });
        return;
      }

      if (error.code === 11000) {
        res.status(400).json({
          success: false,
          message: "Email already exists",
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: "Failed to update user",
        error: error.message,
      });
    }
  },
);

// Delete a single user by ID
userRouter.delete(
  "/delete-user/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id).select(
        "-password",
      );

      if (!deletedUser) {
        res.status(404).json({ success: false, message: "User not found" });
        return;
      }

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: deletedUser,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to delete user",
        error: error.message,
      });
    }
  },
);
