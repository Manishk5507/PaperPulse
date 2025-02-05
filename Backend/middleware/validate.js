import Joi from 'joi';
import ApiError from '../utils/ApiError.js';

// User registration validation
export const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// Paper upload validation
const paperSchema = Joi.object({
  year: Joi.number().min(2000).max(new Date().getFullYear()).required(),
  semester: Joi.number().valid(1, 2, 3, 4, 5, 6, 7, 8).required(),
  examType: Joi.string().valid('mid', 'end').required(),
  subject: Joi.string().min(3).required()
});

export const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) next(new ApiError(400, error.details[0].message));
  next();
};

export const validateFile = (req, res, next) => {
  if (!req.file) next(new ApiError(400, 'No file uploaded'));
  next();
};