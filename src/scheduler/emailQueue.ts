// BullMQ queue setup and management

// scheduler/emailQueue.ts
import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { redisConfig } from '../config';
import { fetchUnreadEmailsFromGmail } from '../controllers/gmailEmailFetcher'; // Ensure the path is correct
import { getAccessToken } from '../middleware/middleware';


// Initialize Redis connection
const connection = new IORedis(redisConfig);

// Create a BullMQ queue for email fetching tasks
export const emailQueue = new Queue('emailQueue', { connection });

// Define a recurring job to check emails every few minutes
emailQueue.add(
  'fetchGmailEmails', 
  {}, 
  { repeat: { every: 5000 } } // Run every 5 minutes (300,000 ms)
);

// Define a worker to process the queued job
const emailWorker = new Worker('emailQueue', async job => {
  if (job.name === 'fetchGmailEmails') {
    const accessToken = getAccessToken();
    if (accessToken) {
        const emails = await fetchUnreadEmailsFromGmail(accessToken);
        console.log('Fetched emails:', emails);
      } else {
        console.error('Access token not found or not valid.');
      }
    // You can process the emails here (e.g., save to a database or notify users)
  }
}, { connection });

// Event listeners for job progress and completion
emailWorker.on('completed', job => {
  console.log(`Job ${job.id} completed successfully`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} failed with error: ${err.message}`);
});
