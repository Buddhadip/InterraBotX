// codeCompletion.js
import express from 'express';
import { validateCodeSnippet } from '../middleware/validationMiddleware.js';
import { generateCodeCompletion } from '../utils/openai.js';

const router = express.Router();

router.post('/', validateCodeSnippet, async (req, res) => {
  const codeSnippet = req.body.codeSnippet;
  console.log('Received codeSnippet:', codeSnippet);

  try {
    const completedCode = await generateCodeCompletion(codeSnippet);
    res.json({ completedCode });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
