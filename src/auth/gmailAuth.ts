// Handles Gmail OAuth

import { google } from 'googleapis';
import { config } from '../config';

const oauth2Client = new google.auth.OAuth2(
  config.google.clientId,
  config.google.clientSecret,
  config.google.redirectUri
);

export const getGmailAuthUrl = () => oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/gmail.readonly']
});
