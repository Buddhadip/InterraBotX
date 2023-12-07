// codeCompletion.js
import express from 'express';
import { generateCodeCompletion } from '../utils/openai.js';

const router = express.Router();

router.post('/', async (req, res) => {
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
