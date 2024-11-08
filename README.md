Email Automation Tool
=====================

This project is an Email Automation Tool built to read, categorize, and respond to emails from Gmail and Outlook accounts using OAuth2 authentication, Gemini for natural language processing, and BullMQ for task scheduling. The tool parses and labels emails based on their content and automatically sends context-based replies.

Features
--------

-   OAuth2 Authentication for Gmail and Outlook
-   Email Fetching and Categorization (Interested, Not Interested, More Information)
-   Contextual Reply Generation using OpenAI
-   Scheduled tasks using BullMQ
-   Secure handling of access keys using custom encryption middleware
-   Built with TypeScript for type safety and maintainability

Getting Started
---------------

These instructions will guide you through setting up the project on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v14+)
-   [TypeScript](https://www.typescriptlang.org/) (v4+)
-   [Redis](https://redis.io/) (required for BullMQ)
-   Google Cloud Console account
-   [Microsoft Azure](https://portal.azure.com/) account

### Installation

1.  **Clone the Repository**

    bash

    `git clone https://github.com/your-username/email-automation-tool.git
    cd email-automation-tool`

2.  **Install Dependencies**

    Install all required packages with npm:

    bash

    `npm install`

3.  **Environment Configuration**

    Create a `.env` file in the root directory and configure your environment variables as follows:
```
    env
    
    `PORT=3000
    REDIS_URL=redis://localhost:6379

    ENCRYPTION_KEY=loveReachInbox

    # Google OAuth
    GOOGLE_CLIENT_ID=<your-google-client-id>
    GOOGLE_CLIENT_SECRET=<your-google-client-secret>
    GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

    # Outlook OAuth
    OUTLOOK_CLIENT_ID=<your-outlook-client-id>
    OUTLOOK_CLIENT_SECRET=<your-outlook-client-secret>
    OUTLOOK_REDIRECT_URI=http://localhost:3000/auth/outlook/callback

    # Gemini GenAI
    GEMINI_API_KEY=<your-gemini-api-key>
    GEMINI_API_URL=<your-gemini-api-url>
    SMTP_MAIL=<your-smtp-mail-id>
    SMTP_PASSWORD=<your-smtp-password>`

```

5.  **Build the Project**

    Compile the TypeScript code to JavaScript:

    bash

    `npm run build`

6.  **Run the Server**

    Start the server with:

    bash

    `npm start`

7.  **Redis Server**

    Ensure that Redis is running for BullMQ to work. Start Redis locally by running:

    bash

    `redis-server`

### Usage

1.  **Google and Outlook Authentication**

    -   Visit `http://localhost:3000/auth/google` to connect a Gmail account.
    -   Visit `http://localhost:3000/auth/outlook` to connect an Outlook account.
2.  **Testing Email Fetch and Reply**

    -   Send an email to the connected Gmail or Outlook account from another email account.
    -   The application will fetch unread emails, categorize them (Interested, Not Interested, More Information), and generate an automatic response based on the context.
3.  **Task Scheduling**

    BullMQ handles the scheduling of email checks and response tasks. You can adjust the frequency and behavior of these tasks within the codebase.


### Custom Middleware: Encryption of Access Keys

To secure sensitive information such as `access_key` and other authentication tokens, a custom middleware (`middleware/middleware.ts`) has been added. This middleware ensures that these keys are encrypted using crypto before they are stored or processed. The encryption helps protect confidential data from unauthorized access, maintaining a secure environment throughout the application.

-   The middleware is automatically applied to requests that involve storing or retrieving access keys, ensuring that sensitive information is never exposed or stored in plain text.


### Project Structure

bash

```email-automation-tool/
├── src/
│   ├── auth/
│   │   ├── gmailAuth.ts             # Gmail OAuth setup and token generation
│   │   └── outlookAuth.ts           # Outlook OAuth setup and token generation
│   │
│   ├── controllers/
│   │   ├── emailProcessor.ts        # Main controller for email parsing and response
│   │   ├── gmailEmailFetcher.ts     # Function to fetch unread emails from Gmail
│   │   ├── outlookEmailFetcher.ts   # Function to fetch unread emails from Outlook
│   │   └── labelAssigner.ts         # Assigns labels to emails based on specified criteria
│   │
│   ├── gemini/
│   │   └── geminiHandler.ts         # Handler for Gemini API interactions
│   │
│   ├── middleware/
│   │   └── middleware.ts            # Middleware for access control and encryption setup
│   │                                # (ensures `access_key` is secured with crypto encryption)
│   │
│   ├── openai/
│   │   └── openaiHandler.ts          # Handler for Gemini API interactions
│   │
│   ├── responses/
│   │   ├── emailSender.ts           # Sends email responses through SMTP
│   │   └── responseTemplates.ts     # Predefined templates for generating email responses
│   │
│   ├── scheduler/
│   │   └── emailQueue.ts            # Manages email scheduling and queue using BullMQ
│   │
│   ├── utils/
│   │   ├── app.ts                   # Main server and middleware setup
│   │   └── config.ts                # Central configuration settings for the app
│   │
│   └── testLabeling.ts              # Test file for validating email labeling logic
│
├── .env                             # Environment variables for configuration
├── .gitignore                       # Specifies files and folders to ignore in Git
├── package-lock.json                # Dependency tree lock file for npm
├── package.json                     # Project metadata and dependencies
├── README.md                        # Project documentation with setup instructions
└── tsconfig.json                    # TypeScript configuration settings

```

### Implementation Choices

-   **TypeScript**: Provides type safety and improves maintainability, making it easier to debug and refactor code.
-   **OAuth2 Authentication**: Secure access to Gmail and Outlook accounts, allowing the app to fetch emails without requiring user passwords.
-   **Gemini GenAI for NLP**: Enables intelligent, context-sensitive replies based on email content, improving user experience.
-   **BullMQ for Task Scheduling**: Automates email checking and responding at scheduled intervals, ensuring timely processing of emails.

### Troubleshooting

-   **Invalid Credentials**: Ensure OAuth credentials are correct and that OAuth consent screen and scopes are correctly set up.
-   **Redis Issues**: Make sure Redis is installed and running. Check the Redis URL in `.env`.
-   **Token Expiry**: Gmail and Outlook access tokens may expire; ensure token refresh logic is implemented.

