Email Automation Tool
=====================

This project is an Email Automation Tool built to read, categorize, and respond to emails from Gmail and Outlook accounts using OAuth2 authentication, Gemini for natural language processing, and BullMQ for task scheduling. The tool parses and labels emails based on their content and automatically sends context-based replies.

Features
--------

-   OAuth2 Authentication for Gmail and Outlook
-   Email Fetching and Categorization (Interested, Not Interested, More Information)
-   Contextual Reply Generation using Gemini GenAI
-   Scheduled tasks using BullMQ
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

    # Google OAuth
    GOOGLE_CLIENT_ID=<your-google-client-id>
    GOOGLE_CLIENT_SECRET=<your-google-client-secret>
    GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback

    # Outlook OAuth
    OUTLOOK_CLIENT_ID=<your-outlook-client-id>
    OUTLOOK_CLIENT_SECRET=<your-outlook-client-secret>
    OUTLOOK_REDIRECT_URI=http://localhost:3000/auth/outlook/callback

    # OpenAI
    OPENAI_API_KEY=<your-openai-api-key>`

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

### Project Structure

bash

```email-automation-tool/
├── src/
│   ├── auth/
│   │   ├── gmailAuth.ts          # Gmail OAuth setup and token generation
│   │   └── outlookAuth.ts        # Outlook OAuth setup and token generation
│   ├── controllers/
│   │   └── emailProcessor.ts     # Main controller for email parsing and response
│   ├── config/
│   │   └── config.ts             # Configuration settings
│   ├── tasks/
│   │   └── scheduler.ts          # BullMQ task scheduler setup
│   ├── utils/
│   │   └── openaiClient.ts       # OpenAI integration for contextual replies
│   └── app.ts                    # Main server and middleware setup
├── .env                          # Environment variables
├── .gitignore                    # Git ignore file
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
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

### Contributing

Feel free to fork this repository and make changes. Pull requests are welcome.
