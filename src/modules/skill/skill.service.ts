import { Request, Response } from "express";
import Skill from "../../DB/models/skill.js";

export const createAlotOfSkills = async (req: Request, res: Response) => {

    console.log(req.body); // 🔥 شوف اللي جاي

    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: 'Send array directly' });
    }

    await Skill.deleteMany();

    const result = await Skill.insertMany(req.body);

    res.json({
      message: 'Seeded successfully',
      count: result.length
    });

};

export const createSkill = async (req: Request, res: Response) => {
  const { name, subSkills } = req.body;

  const existingSkill = await Skill.findOne({ name });
  if (existingSkill) {
    return res.status(400).json({ message: 'Skill already exists' });
  }

  const skill = new Skill({
    name,
    subSkills
  });

  await skill.save();

  res.json({
    success: true,
    message: 'Skill created',
    skill
  });
};


export const createSubSkill = async (req: Request, res: Response) => {
  const { subSkills } = req.body;

  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return res.status(404).json({ message: 'Skill not found' });
  }
  skill.subSkills.push(subSkills);

  await skill.save();

  res.json({
    success: true,
    message: 'Skill created',
    skill
  });
};

export const deleteSkill = async (req: Request, res: Response) => {
  const skill = await Skill.findById(req.params.id);

  if (!skill) {
    return res.status(404).json({ message: 'Skill not found' });
  }
  await Skill.findByIdAndDelete(req.params.id);
  res.json({
    success: true,
    message: 'Skill deleted',
  });
};


export const getAllSkills = async (req: Request, res: Response) => {
  const skills = await Skill.find();
  res.json(skills);
};