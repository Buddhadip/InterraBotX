import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import codeCompletionRoutes from './src/routes/codeCompletion.js';
import codeGenerationRoutes from './src/routes/codeGeneration.js';
import testCaseGenerationRoutes from './src/routes/testCaseGeneration.js';
import './src/utils/openai.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/code-completion', codeCompletionRoutes);
app.use('/api/code-generation', codeGenerationRoutes);
app.use('/api/test-case-generation', testCaseGenerationRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export {app};