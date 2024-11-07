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






import express from 'express';
import { getGmailAuthUrl, getGmailToken } from './auth/gmailAuth';
// import { getOutlookAuthUrl, getOutlookToken } from './auth/outlookAuth';

const app = express();

// Gmail OAuth Routes
app.get('/auth/google', (req, res) => {
  const url = getGmailAuthUrl();
  res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  if (code) {
    const tokens = await getGmailToken(code.toString());
    res.json(tokens);
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

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});