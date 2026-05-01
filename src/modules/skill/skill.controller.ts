import { Router } from "express";
import * as skillService from "./skill.service.js";
import * as skillSchema from "./skill.validation.js";
import { validate } from "../../common/middleware/validation.js";
import isAuthenticated from "../../common/middleware/authentication.js";

const router = Router();

router.post("/alot", isAuthenticated, validate(skillSchema.createAlotOfSkillsSchema), skillService.createAlotOfSkills);

router.post("/", isAuthenticated, validate(skillSchema.skillSchema), skillService.createSkill);

router.delete("/:id", isAuthenticated, skillService.deleteSkill);

router.get("/", skillService.getAllSkills);

export default router;
