import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the Token document
export interface IToken extends Document {
  name: string;
  purpose: string;
  tokenNo: number;
  tokenState: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema
const tokenSchema = new Schema<IToken>(
  {
    name: { type: String, required: true },
    purpose: { type: String, required: true },
    tokenNo: { type: Number, unique: true },
    tokenState: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);


// Create and export the model
export default mongoose.model<IToken>("Token", tokenSchema);
