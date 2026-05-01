import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError.js";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Not Found - ${req.originalUrl}`, 404));
};

export default notFoundHandler;