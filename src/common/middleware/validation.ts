import { Request, Response, NextFunction } from 'express';
import { ObjectSchema, Schema } from 'joi';

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // يجيب كل errors مش أول واحد بس
      stripUnknown: true // يشيل أي fields مش موجودة في schema
    });

    if (error) {
      return res.status(400).json({
        message: "Validation Error",
        errors: error.details.map(err => err.message)
      });
    }

    req.body = value; // sanitized data
    next();
  };
};
