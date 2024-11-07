// import axios from 'axios';

// export async function analyzeEmailContent(content: string): Promise<string> {
//   try {
//     const prompt = `Classify the email intent as 'Interested,' 'Not Interested,' or 'More Information'. Email content: "${content}"`;
//     const response = await axios.post('https://ai.google.dev/api/rest', {
//       prompt,
//       model: 'your-model-name', // Update this with the actual model you are using
//       apiKey: process.env.GEMINI_API_KEY,
//     });

//     if (response.data && response.data.label) {
//       return response.data.label;
//     } else {
//       throw new Error('Invalid response from Gemini API');
//     }
//   } catch (error) {
//     console.error('Error analyzing email content:', error);
//     throw error;
//   }
// }
// // 

import axios from 'axios';
import { config } from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables from a .env file if not already loaded
config();
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in the environment variables');
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// Function to send email label to the Gemini API for intent classification
export const analyzeEmailIntent = async (emailContent: string): Promise<string> => {
  try {
    console.log('Analyzing email intent with Gemini AI...');
    const prompt = `Classify the email intent as 'Interested', 'Not Interested', or 'More Information' based on the following content: "${emailContent}". Output should be just either one of them.`;

    // Generate content using the model
    const airesponse = await model.generateContent(prompt);

    const result = airesponse.response.text();
    console.log('Gemini AI response:', result);
    // Extract the label (assuming Gemini response has a 'label' or 'prediction' field)
    return result;  // You may need to adjust based on the actual response structure
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error('Error while analyzing email intent with Gemini:', errorMessage);
    throw new Error('AI analysis failed');
  }
};

// Function to suggest an email response based on the content
export const suggestEmailResponse = async (emailContent: string): Promise<string> => {
    try {
      console.log('Suggesting email response with Gemini AI...');
      const prompt = `Based on the email content, generate an appropriate response. Here are the cases:
        1. If the sender is interested, suggest scheduling a demo call.
        2. If they are not interested, send a polite message acknowledging their response.
        3. If they need more information, offer additional details or documentation.
        
        Email content: "${emailContent}".`;
  
      const aiResponse = await model.generateContent(prompt);
      const responseSuggestion = aiResponse.response.text();
      console.log('Gemini AI response suggestion:', responseSuggestion);
      return responseSuggestion; // Return the generated response
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error('Error while suggesting email response with Gemini:', errorMessage);
      throw new Error('AI response suggestion failed');
    }
  };


