// validationMiddleware.js
import { validationResult, body } from 'express-validator';

// Define validation middleware for the code snippet
export const validateCodeSnippet = [
  body('codeSnippet').isString().trim().notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation middleware for Code Generation
export const validateUserInput = [
    body('userInput').isString().trim().notEmpty(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];

//Validation middleware for Test Case Generation
export const validateFunctionSnippet = [
    body('functionSnippet').isString().trim().notEmpty(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];