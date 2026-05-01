import mongoose, { Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const contactSchema = new mongoose.Schema<IContact>({
  name: String,
  email: String,
  phone: String,
  message: String
}, { timestamps: true });

export default mongoose.model<IContact>("Contact", contactSchema);
