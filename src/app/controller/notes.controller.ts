import express, { type Request, type Response } from "express";
import { Note, noteValidationSchema } from "../models/notes.models";
import z from "zod";

export const notesRouter = express.Router();

// 5. Route with Scalable Validation
notesRouter.post(
  "/create-note",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = noteValidationSchema.parse(req.body);
      const savedNote = await Note.create(validatedData);

      res.status(201).json({
        success: true,
        message: "Note created successfully",
        data: savedNote,
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

      res.status(500).json({
        success: false,
        message: "Failed to create note",
        error: error.message,
      });
    }
  },
);
notesRouter.get(
  "/",
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Note.find() returns all documents in the Note collection
      const notes = await Note.find();

      res.status(200).json({
        success: true,
        message: "Notes fetched successfully",
        data: notes,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch notes",
        error: error.message,
      });
    }
  },
);

// Get a single note by ID
notesRouter.get(
  "/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const note = await Note.findById(req.params.id);
      if (!note) {
        res.status(404).json({ success: false, message: "Note not found" });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Note fetched successfully",
        data: note,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch note",
        error: error.message,
      });
    }
  },
);

// Update a single note by ID
notesRouter.patch(
  "/update-note/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      // Validate request body, allowing partial updates
      const validatedData = noteValidationSchema.partial().parse(req.body);

      // new: true returns the updated document
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        validatedData,
        { new: true },
      );

      if (!updatedNote) {
        res.status(404).json({ success: false, message: "Note not found" });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Note updated successfully",
        data: updatedNote,
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
      res.status(500).json({
        success: false,
        message: "Failed to update note",
        error: error.message,
      });
    }
  },
);

// Delete a single note by ID
notesRouter.delete(
  "/delete-note/:id",
  async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedNote = await Note.findByIdAndDelete(req.params.id);

      if (!deletedNote) {
        res.status(404).json({ success: false, message: "Note not found" });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Note deleted successfully",
        data: deletedNote,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: "Failed to delete note",
        error: error.message,
      });
    }
  },
);
