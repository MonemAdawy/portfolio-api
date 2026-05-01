import mongoose, { Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  techStack: string[];
  images: Array<{
    secure_url: string;
    public_id: string;
  }>;
  links: { github?: string; live?: string };
}

const projectSchema = new mongoose.Schema<IProject>({
  title: { type: String, required: true },
  description: String,
  techStack: [String],
  images: [{
    secure_url: String,
    public_id: String
  }],
  links: {
    github: String,
    live: String
  }
}, { timestamps: true });

export default mongoose.model<IProject>("Project", projectSchema);