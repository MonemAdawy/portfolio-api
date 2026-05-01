import joi from 'joi';

export const loginSchema = joi.object({
    id: joi.string(),
    username: joi.string().required(),
    password: joi.string().required()
}).or('id', 'username');

