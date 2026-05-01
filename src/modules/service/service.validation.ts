import joi from 'joi';

export const createService = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    features: joi.array().items(joi.string())
});

export const updateService = joi.object({
    title: joi.string(),
    description: joi.string(),
    features: joi.array().items(joi.string())
});