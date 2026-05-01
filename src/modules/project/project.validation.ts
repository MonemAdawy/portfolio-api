import joi from 'joi';

// export const createProject = joi.object({
//     title: joi.string().required(),
//     description: joi.string().required(),
//     techStack: joi.array().items(joi.string()).required(),
//     links: joi.object({
//         github: joi.string().uri().required(),
//         live: joi.string().uri().allow('')
//     })
// });

// export const updateProject = joi.object({
//     title: joi.string(),
//     description: joi.string(),
//     techStack: joi.array().items(joi.string()),
//     links: joi.object({
//         github: joi.string().uri(),
//         live: joi.string().uri()
//     })
// });






// Update your validation schemas
export const createProject = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    techStack: joi.array().items(joi.string()).required(),
    links: joi.object({
        github: joi.string().uri().required(),
        live: joi.string().uri().allow('')
    }).required()
});

export const updateProject = joi.object({
    title: joi.string(),
    description: joi.string(),
    techStack: joi.array().items(joi.string()),
    links: joi.object({
        github: joi.string().uri(),
        live: joi.string().uri().allow('')
    })
});