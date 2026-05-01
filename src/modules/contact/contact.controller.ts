import { Router } from "express";
import * as contactService from "./contact.service.js";
import * as contactSchema from "./contact.validation.js";
import { validate } from "../../common/middleware/validation.js";
import { asyncHandler } from "../../common/utils/errorHandling/asyncHandler.js";
import isAuthenticated from "../../common/middleware/authentication.js";

const router = Router();

router.get("/", isAuthenticated, asyncHandler(contactService.getAllContacts));

router.delete("/:id", isAuthenticated, asyncHandler(contactService.deleteContact));

router.delete("/", isAuthenticated, asyncHandler(contactService.deleteAllContacts));

router.post("/", validate(contactSchema.createContactSchema), asyncHandler(contactService.createContact));

router.patch("/:id", isAuthenticated, validate(contactSchema.updateContactSchema), asyncHandler(contactService.updateContact));

export default router;
