import { google } from 'googleapis';

// Function to fetch unread emails from Gmail inbox
export const fetchUnreadEmailsFromGmail = async (accessToken: string) => {
  try {
    // Create OAuth2 client and set credentials with the provided access token
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    // Initialize Gmail API client
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Fetch unread messages from the Gmail inbox
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: 'is:unread', // Search query for unread emails
    });

    // If there are no unread emails, return an empty array
    if (!response.data.messages) {
      return [];
    }

    // Fetch detailed message data for each unread email
    const emailDetailsPromises = response.data.messages.map(async (message) => {
      const email = await gmail.users.messages.get({
        userId: 'me',
        id: message.id!,
      });

      return {
        id: email.data.id,
        subject: email.data.payload?.headers?.find((header) => header.name === 'Subject')?.value,
        from: email.data.payload?.headers?.find((header) => header.name === 'From')?.value,
        snippet: email.data.snippet,
      };
    });

    // Wait for all email details to be fetched
    const emailDetails = await Promise.all(emailDetailsPromises);

    return emailDetails;
  } catch (error) {
    console.error('Error fetching unread emails from Gmail:', error);
    throw new Error('Unable to fetch unread emails from Gmail.');
  }
};