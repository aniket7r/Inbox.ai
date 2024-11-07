// Test for OpenAI API and Gmail API integration for email labeling

// import { assignLabelToEmail } from './controllers/labelAssigner';
// const testEmail = {
//   id: '19304c802c4bf2dd',
//   subject: 'Nominate for the ITS Australia NextGens Committee',
//   snippet: 'NextGens support and promote young and early-career transport professionals ITS Australia NextGens 2025 Committee Nominations are Now Open! Are you an early career transport professional eager to push'
// };

// const emailContent = `${testEmail.subject}\n${testEmail.snippet}`;

// async function testEmailLabeling() {
//   try {
//     const label = await assignLabelToEmail(emailContent);
//     console.log(`Email ID: ${testEmail.id}`);
//     console.log(`Subject: ${testEmail.subject}`);
//     console.log(`Assigned Label: ${label}`);
//   } catch (error) {
//     console.error('Error labeling the email:', error);
//   }
// }

// testEmailLabeling();



// Test for Gemini API and Gmail API integration for email labeling
// import { analyzeEmailContent } from '../src/gemini/geminiHandler';

// async function testAnalyzeEmail() {
//   const sampleEmailContent = "Nominate for the ITS Australia NextGens Committee. NextGens support and promote young and early-career transport professionals.";
  
//   try {
//     const embedding = await analyzeEmailContent(sampleEmailContent);
//     console.log('Generated embedding:', embedding);
//   } catch (error) {
//     console.error('Test failed:', error);
//   }
// }

// testAnalyzeEmail();
