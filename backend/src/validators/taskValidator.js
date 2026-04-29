import joi from "joi";

export const createTaskSchema = joi.object({
    title: joi.string().min(3).max(100).required(),
    description: joi.string().min(5).max(500).optional(),
    status: joi.string().valid("pending", "in progress", "completed").optional(),
    dueDate: joi.date().optional().allow(null),
    priority: joi.string().valid("low", "medium", "high").optional(),
    userId: joi.string().optional(),    
});

export const updateTaskSchema = joi.object({
    title: joi.string().min(3).max(100).optional(),
    description: joi.string().min(5).max(500).optional(),       
    status: joi.string().valid("pending", "in progress", "completed").optional(),
    dueDate: joi.date().optional().allow(null),
    priority: joi.string().valid("low", "medium", "high").optional(),
    userId: joi.string().optional(),
}).min(1);