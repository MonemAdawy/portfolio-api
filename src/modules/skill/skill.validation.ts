import Joi from 'joi';

export const skillSchema = Joi.object({
  name: Joi.string().required(),
  subSkills: Joi.array().items(
    Joi.object({
      name: Joi.string().required()
    })
  ).optional()
});

export const createAlotOfSkillsSchema = Joi.array().items(skillSchema);