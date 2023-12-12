// testCaseGeneration.js
import express from 'express';
import { validateFunctionSnippet } from '../middleware/validationMiddleware.js'
import { generateTestCases } from '../utils/openai.js';

const router = express.Router();

router.post('/', validateFunctionSnippet, async (req, res) => {
  const functionSnippet = req.body.functionSnippet;

  try {
    // Call the OpenAI API for generating test cases with the provided prompt
    const processedTestCases = await generateTestCases(functionSnippet);

    // Send the processed test cases as the response
    res.json({ processedTestCases });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
