// Main application entry point

import express from 'express';
import { emailQueue } from './scheduler/emailQueue';
import './auth/gmailAuth';
import './auth/outlookAuth';

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Email Queue
emailQueue.process(async (job) => {
  console.log('Processing email job:', job.id);
  // Placeholder for email processing logic
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
