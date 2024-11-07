// Main application entry point

// import express from 'express';
// import session from 'express-session';
// import passport from 'passport';
// import './auth/gmailAuth'; // Import the Gmail OAuth configuration

// const app = express();
// const PORT = process.env.PORT || 3000;



// // Session middleware
// app.use(
//   session({
//     secret: 'your-session-secret',
//     resave: false,
//     saveUninitialized: true,
//   })
// );

// // Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // Start Gmail OAuth2 Authentication
// app.get(
//     '/auth/google',
//     passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/gmail.readonly'] })
//   );
  

// // Gmail OAuth2 Callback
// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/' }),
//   (req, res) => {
//     // Redirect to home or dashboard after successful authentication
//     res.redirect('/dashboard');
//   }
// );

// app.get('/dashboard', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.send(`Welcome! You are authenticated`);
//   } else {
//     res.redirect('/auth/google');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });






import express, { Request, Response } from 'express';
import { getGmailAuthUrl, getGmailToken } from './auth/gmailAuth';
// import { getOutlookAuthUrl, getOutlookToken } from './auth/outlookAuth';
import { fetchUnreadEmailsFromGmail } from './controllers/gmailEmailFetcher';
import { fetchUnreadEmailsFromOutlook } from './controllers/outlookEmailFetcher';
import './scheduler/emailQueue';
import { storeAccessToken } from './middleware/middleware';


const app = express();

// Gmail OAuth Routes
app.get('/auth/google', (req, res) => {
  const url = getGmailAuthUrl();
  res.redirect(url);
  console.log('url', url);
});

app.get('/auth/google/callback', async (req, res) => {
  console.log('req', req);
    const { code } = req.query;
    if (code) {
      const tokens = await getGmailToken(code.toString());
      const accessToken = tokens.access_token;
  
      if (accessToken) {
        storeAccessToken(accessToken);
        console.log('accessToken checked at app.ts ', accessToken);
        // Redirect to the Gmail emails route with the access token
        res.redirect(`http://localhost:3000/emails/gmail?access_token=${accessToken}`);
        // res.json({ message: 'Access token stored securely.' });
      } else {
        res.status(400).send('Failed to retrieve access token.');
      }
    } else {
      res.status(400).send('No code found in request.');
    }
  });

// Outlook OAuth Routes
// app.get('/auth/outlook', (req, res) => {
//   const url = getOutlookAuthUrl();
//   res.redirect(url);
// });

// app.get('/auth/outlook/callback', async (req, res) => {
//   const { code } = req.query;
//   if (code) {
//     const token = await getOutlookToken(code.toString());
//     res.json({ accessToken: token });
//   } else {
//     res.status(400).send('No code found in request.');
//   }
// });



// Route to fetch unread emails from Gmail
app.get('/emails/gmail', async (req: Request, res: Response): Promise<void> => {
    const { access_token } = req.query;
    if (!access_token) {
      res.status(400).send('Access token is required');
      return;
    }
  
    try {
      const emails = await fetchUnreadEmailsFromGmail(access_token.toString());
      res.json(emails);
    } catch (error) {
      res.status(500).send('Error fetching emails from Gmail');
    }
  });


// // Route to fetch unread emails from Outlook
// app.get('/emails/outlook', async (req: Request, res: Response): Promise<void> => {
//     const { access_token } = req.query;
//     if (!access_token) {
//       res.status(400).send('Access token is required');
//       return;
//     }
  
//     try {
//       const emails = await fetchUnreadEmailsFromOutlook(access_token.toString());
//       res.json(emails);
//     } catch (error) {
//       res.status(500).send('Error fetching emails from Outlook');
//     }
//   });
  



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});