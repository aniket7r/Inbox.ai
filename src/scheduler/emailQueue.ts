// BullMQ queue setup and management

// scheduler/emailQueue.ts
import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { redisConfig } from '../config';
import { fetchUnreadEmailsFromGmail } from '../controllers/gmailEmailFetcher'; // Ensure the path is correct
import { getAccessToken } from '../middleware/middleware';
// import { assignLabelToEmail } from '../controllers/labelAssigner';
import { processEmailForLabeling } from '../controllers/labelAssigner'; // Import the labeling function
import { processEmailAndRespond } from '../responses/responseTemplates'; // Import the response template function


// Initialize Redis connection
const connection = new IORedis(redisConfig);

// Create a BullMQ queue for email fetching tasks
export const emailQueue = new Queue('emailQueue', { connection });

// Define a recurring job to check emails every few minutes
emailQueue.add(
  'fetchGmailEmails', 
  {}, 
  { repeat: { every: 300000 } } // Run every 5 minutes (300,000 ms)
);

// Define a worker to process the queued job
const emailWorker = new Worker('emailQueue', async job => {
  if (job.name === 'fetchGmailEmails') {
    const accessToken = getAccessToken();
    if (accessToken) {
      const emails = await fetchUnreadEmailsFromGmail(accessToken);

      // Loop through each email to process it for labeling and send a response
      for (const email of emails) {
        if (email.id && email.subject && email.from && email.snippet) {
          try {
            // Process the email for labeling
            await processEmailForLabeling({
              id: email.id,
              subject: email.subject,
              from: email.from,
              snippet: email.snippet
            });

            // After labeling, suggest and send a response
            await processEmailAndRespond({
              id: email.id,
              subject: email.subject,
              from: email.from,
              snippet: email.snippet
            });

            console.log(`Processed and responded to email ID: ${email.id}`);
          } catch (error) {
            console.error(`Error processing or responding to email ID: ${email.id}`, error);
          }
        } else {
          console.error('Email object is missing required properties:', email);
        }
      }
    } else {
      console.error('Access token not found or not valid.');
    }
  }
}, { connection });
// Event listeners for job progress and completion
emailWorker.on('completed', job => {
  console.log(`Job ${job.id} completed successfully`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed with error: ${err.message}`);
});
