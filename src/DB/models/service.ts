import mongoose, { Document } from "mongoose";

export interface IService extends Document {
  title: string;
  description: string;
  features: string[];
}

const serviceSchema = new mongoose.Schema<IService>(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    features: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IService>("Service", serviceSchema);