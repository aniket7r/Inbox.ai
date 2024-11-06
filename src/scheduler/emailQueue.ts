// BullMQ queue setup and management

import { Queue } from 'bullmq';
import { config } from '../config';

export const emailQueue = new Queue('emailQueue', {
  connection: {
    host: config.redis.host,
    port: config.redis.port
  }
});
