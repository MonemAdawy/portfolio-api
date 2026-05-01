import joi from 'joi';

export const createContactSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    phone: joi.string().required(),
    message: joi.string().required()
});


export const updateContactSchema = joi.object({
    name: joi.string(),
    email: joi.string().email(),
    phone: joi.string(),
    message: joi.string()
});