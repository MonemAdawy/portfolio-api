import { Router, Request, Response } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../../common/utils/errorHandling/asyncHandler.js";
import isAuthenticated from "../../common/middleware/authentication.js";
import * as authService from "./auth.service.js";
import * as authSchema from "./auth.validation.js";
import { validate } from "../../common/middleware/validation.js";

export interface AuthRequest extends Request {
    user?: {
        username: string;
    };
}

const router = Router();

router.post(
    "/login",
    validate(authSchema.loginSchema),
    asyncHandler(authService.login)
);

router.post(
    "/logout",
    asyncHandler(authService.logout)
);

router.get(
    "/me",
    isAuthenticated,
    asyncHandler(authService.getCurrentUser)
);

export default router;
