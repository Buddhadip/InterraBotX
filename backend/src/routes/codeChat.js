// codeChat.js
import express from 'express';
import { validateUserInput } from '../middleware/validationMiddleware.js';
import { handleChatResponse } from '../utils/openai.js';

const router = express.Router();

router.post('/', validateUserInput, async (req, res) => {
  const userInput = req.body.userInput;

  try {
    const chatResponse = await handleChatResponse(userInput);
    res.json({ chatResponse });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
