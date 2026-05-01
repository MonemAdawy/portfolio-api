import { Router } from "express";
import * as serviceService from "./service.service.js";
import * as serviceSchema from "./service.validation.js";
import { validate } from "../../common/middleware/validation.js";
import { asyncHandler } from "../../common/utils/errorHandling/asyncHandler.js";
import isAuthenticated from "../../common/middleware/authentication.js";

const router = Router();

router.post("/", isAuthenticated, validate(serviceSchema.createService), asyncHandler(serviceService.createService));

router.patch("/:id", isAuthenticated, validate(serviceSchema.updateService), asyncHandler(serviceService.updateService));

router.delete("/:id", isAuthenticated, asyncHandler(serviceService.deleteService));

router.get("/", asyncHandler(serviceService.getAllServices));


export default router;
