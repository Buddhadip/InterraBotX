// unitTestCodeGeneration.js
import express from 'express';
import Joi from 'joi';
import { generateUnitTestCode } from '../utils/openai.js'; // Import the relevant function

const router = express.Router();

const validationSchema = Joi.object({
  testCodeSnippet: Joi.string().required(),
  selectedLanguage: Joi.string().required(), 
});  

router.post('/', async (req, res) => {
  const {testCodeSnippet, selectedLanguage}= req.body;
  console.log('Request Body:', req.body);
  try {

    // Validate request body using Joi
    const { error } = validationSchema.validate(req.body);
    console.log('Validation Error:', error);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Construct the prompt on the server side
    const prompt = `${testCodeSnippet} \ngenerate a code in ${selectedLanguage} language which can unit test 
                      this function after taking  
                      data from a csv file named testcases.csv,
                      just provide the code part, do not start with sentence or write any 
                      explanation or sentence, containg following columns with name {columns} code 
                      can use any external library or modules,
                      or can generate from scratch`;

    // Call the OpenAI API for generating unit test code with the constructed prompt
    const generatedUnitTestCode = await generateUnitTestCode(prompt);

    // Send the generated unit test code as the response
    res.json({ generatedUnitTestCode });
    
    
    // // Call the OpenAI API for generating unit test code with the provided function snippet
    // const generatedUnitTestCode = await generateUnitTestCode(testCodeSnippet);

    // // Send the generated unit test code as the response
    // res.json({ generatedUnitTestCode });
  } catch (error) {
    console.error('Error in routes:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
