// unitTestCodeGeneration.js
import express from 'express';
import { generateUnitTestCode } from '../utils/openai.js'; // Import the relevant function

const router = express.Router();

router.post('/', async (req, res) => {
  const {testCodeSnippet}= req.body;

  try {

    // Call the OpenAI API for generating unit test code with the provided function snippet
    const generatedUnitTestCode = await generateUnitTestCode(testCodeSnippet);

    // Send the generated unit test code as the response
    res.json({ generatedUnitTestCode });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
