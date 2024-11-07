// // Handles OpenAI API integration

// import { Configuration, OpenAIApi } from 'openai';
// import dotenv from 'dotenv';

// dotenv.config();

// // Initialize OpenAI with API key from environment
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// // Define the function to analyze email content
// export async function analyzeEmailContent(content: string): Promise<string> {
//   try {
//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `Analyze the intent of the following email and classify it as one of the following: "Interested" (positive interest), "Not Interested" (dismissive), or "More Information" (request for additional details).\n\nEmail Content:\n${content}\n\nResponse:`,
//       max_tokens: 50,
//       temperature: 0.3,
//     });

//     // Return the text response from OpenAI
//     const label = response.data.choices[0].text?.trim();
//     return label || "Unknown";
//   } catch (error) {
//     console.error("Error analyzing email content:", error);
//     throw new Error("OpenAI API request failed");
//   }
// }


import { OpenAI } from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!, // Make sure your API key is loaded from .env
});

// Function to analyze email content and suggest a label
export async function analyzeEmailContent(emailContent: string): Promise<string> {
  const prompt = `
    Analyze the following email and classify the intent:
    - Options: "Interested", "Not Interested", or "More Information"
    - Email content: "${emailContent}"
    Respond with the classification only.
  `;

  try {
    // Using OpenAI v4's `chat.completions.create` for more accurate results
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Make sure to specify the correct model name
      messages: [{ role: 'user', content: prompt }],
    });

    // Extract and return the assistant's response
    console.log('OpenAI response:', response);
    const label = response.choices[0]?.message?.content?.trim() ?? 'Labeling Failed';
    return label || 'Labeling Failed';
  } catch (error) {
    console.error('Error analyzing email content:', error);
    throw new Error('Failed to analyze email content');
  }
}
