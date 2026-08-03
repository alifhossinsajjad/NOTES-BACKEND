import { Document, Types } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
  user: Types.ObjectId;
  tags?: string[];
  isArchived?: boolean;
}
