import { Router } from "express";
import * as projectService from "./project.service.js";
import * as projectSchema from "./project.validation.js";
import { uploadCloud } from "../../common/file uploading/multerCloud.js";
import { validate } from "../../common/middleware/validation.js";
import { asyncHandler } from "../../common/utils/errorHandling/asyncHandler.js";
import { parseFormData } from "../../common/middleware/parseFormData.js";
import isAuthenticated from "../../common/middleware/authentication.js";

const router = Router();


router.post("/", isAuthenticated, uploadCloud().array("images"), parseFormData, validate(projectSchema.createProject), asyncHandler(projectService.createProject));

router.patch("/:id", isAuthenticated, uploadCloud().array("images"), parseFormData, validate(projectSchema.updateProject), asyncHandler(projectService.updateProject));

router.delete("/delete-image", isAuthenticated, asyncHandler(projectService.deleteProjectImage));

router.delete("/delete-project/:id", isAuthenticated, asyncHandler(projectService.deleteProject));

router.get("/", asyncHandler(projectService.getProjects));

export default router;
