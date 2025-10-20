import joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// User validation schemas
export const registerSchema = joi.object({
  email: joi.string().email().required(),
  username: joi.string().alphanum().min(3).max(30).required(),
  password: joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'string.min': 'Password must be at least 8 characters long',
    }),
  firstName: joi.string().min(1).max(50),
  lastName: joi.string().min(1).max(50),
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export const forgotPasswordSchema = joi.object({
  email: joi.string().email().required(),
});

export const resetPasswordSchema = joi.object({
  token: joi.string().required(),
  password: joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .required()
    .messages({
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      'string.min': 'Password must be at least 8 characters long',
    }),
});

export const verifyEmailSchema = joi.object({
  token: joi.string().required(),
});

// Validation middleware
export const validate = (schema: joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        success: false,
        error: error.details[0].message,
      });
      return;
    }
    next();
  };
};

// CommonJS compatibility for mixed module system
module.exports = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  validate,
};
