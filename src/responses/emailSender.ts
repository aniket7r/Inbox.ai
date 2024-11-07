import nodemailer from 'nodemailer';

// Configure the SMTP transporter for Gmail or Outlook
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use 'gmail' for Gmail and 'outlook' for Outlook
  auth: {
    user: process.env.SMTP_EMAIL, // Your email address for SMTP (e.g., Gmail or Outlook)
    pass: process.env.SMTP_PASSWORD // Your email password or app-specific password
  }
});

// Function to send an email reply
export const sendEmailReply = async (toEmail: string, subject: string, response: string) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_EMAIL, // Sender's email address (your SMTP email)
      to: toEmail, // Receiver's email address (from emailQueue's email.from)
      subject: `Re: ${subject}`, // Reuse the original subject for continuity
      text: response // The generated response content
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email reply:', error);
    throw new Error('Failed to send email reply');
  }
};
