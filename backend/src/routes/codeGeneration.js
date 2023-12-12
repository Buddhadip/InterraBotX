// codeGeneration.js
import express from 'express';
import { validateUserInput } from '../middleware/validationMiddleware.js';
import { generateCode } from '../utils/openai.js'; // Correct import

const router = express.Router();

router.post('/', validateUserInput, async (req, res) => {
  const userInput = req.body.userInput;

  try {
    
    // Call the OpenAI API for code generation
    const generatedCode = await generateCode(userInput);

    // Send the generated code as the response
    res.json({ generatedCode });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
