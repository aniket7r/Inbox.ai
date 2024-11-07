import axios from 'axios';

// Function to fetch unread emails from Outlook inbox using Microsoft Graph API
export const fetchUnreadEmailsFromOutlook = async (accessToken: string) => {
  try {
    // Set the authorization header with the provided access token
    const response = await axios.get('https://graph.microsoft.com/v1.0/me/messages', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        $filter: "isRead eq false", // Filter for unread emails
        $select: "subject,from,bodyPreview,receivedDateTime", // Select relevant fields
        $top: 10, // Limit the number of emails fetched
      },
    });

    // If no messages found, return an empty array
    if (!response.data.value || response.data.value.length === 0) {
      return [];
    }

    // Map the response data to a simplified email format
    const emailDetails = response.data.value.map((email: any) => ({
      id: email.id,
      subject: email.subject,
      from: email.from.emailAddress.address,
      snippet: email.bodyPreview,
    }));

    return emailDetails;
  } catch (error) {
    console.error('Error fetching unread emails from Outlook:', error);
    throw new Error('Unable to fetch unread emails from Outlook.');
  }
};