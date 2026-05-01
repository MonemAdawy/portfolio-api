import mongoose, { Schema, Document } from "mongoose";

interface ISubSkill {
  name: string;
}

export interface ISkill extends Document {
  name: string;
  subSkills: ISubSkill[];
}

const subSkillSchema = new Schema<ISubSkill>({
  name: { type: String, required: true }
});

const skillSchema = new Schema<ISkill>({
  name: { type: String, required: true },
  subSkills: [subSkillSchema]
});

export default mongoose.model<ISkill>("Skill", skillSchema);