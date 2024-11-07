// // Logic for label assignment

// OpenAI
// import { analyzeEmailContent } from '../openai/openaiHandler';

// // Function to assign a label to an email based on its content
// export async function assignLabelToEmail(emailContent: string): Promise<string> {
//   try {
//     const label = await analyzeEmailContent(emailContent);
//     return label;
//   } catch (error) {
//     console.error('Error assigning label:', error);
//     return 'Unknown'; // Default label if an error occurs
//   }
// }


// Gemini

import { analyzeEmailIntent } from '../gemini/geminiHandler'; // Import the function to analyze email content

interface Email {
  id: string;
  subject: string;
  from: string;
  snippet: string;
}

interface LabeledEmail {
  emailId: string;
  label: string;
  timestamp: Date;
}

// A placeholder function to simulate saving the label metadata
// In a real-world scenario, you can save this to a database or an external storage service
const saveLabelMetadata = async (labeledEmail: LabeledEmail) => {
  // You can implement the logic to save labeled emails here (e.g., to a database)
  console.log('Label saved for email:', labeledEmail);
};

// Function to process the email, analyze intent, and save label
export const processEmailForLabeling = async (email: Email) => {
  try {
    // Analyze the email content (e.g., subject and snippet) using Gemini
    const emailContent = `${email.subject} ${email.snippet}`; // Combine subject and snippet for analysis
    const label = await analyzeEmailIntent(emailContent);

    // Save the label along with the email id
    const labeledEmail: LabeledEmail = {
      emailId: email.id,
      label: label,
      timestamp: new Date(),
    };

    await saveLabelMetadata(labeledEmail);
    console.log(`Email labeled as: ${label}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error while processing email for labeling:', error.message);
    } else {
      console.error('Error while processing email for labeling:', error);
    }
  }
};
