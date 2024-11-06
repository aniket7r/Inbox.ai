// Centralized configuration file

import dotenv from 'dotenv';
dotenv.config();

export const config = {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    redirectUri: process.env.GOOGLE_REDIRECT_URI || '',
  },
  outlook: {
    clientId: process.env.OUTLOOK_CLIENT_ID || '',
    clientSecret: process.env.OUTLOOK_CLIENT_SECRET || '',
    redirectUri: process.env.OUTLOOK_REDIRECT_URI || '',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
  }
};
