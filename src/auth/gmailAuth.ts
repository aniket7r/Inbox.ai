// Handles Gmail OAuth

// import { google } from 'googleapis';
// import passport from 'passport';
// import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
// import { VerifyCallback } from 'passport-oauth2';
// import { config } from '../config';

// // Create a new OAuth2 client for Gmail API
// const oauth2Client = new google.auth.OAuth2(
//   config.google.clientId,
//   config.google.clientSecret,
//   config.google.redirectUri
// );

// // Passport Google OAuth Strategy

// passport.use(
//     new GoogleStrategy(
//       {
//         clientID: config.google.clientId,
//         clientSecret: config.google.clientSecret,
//         callbackURL: config.google.redirectUri,
//       },
//       function (
//         accessToken: string, // Type as string
//         refreshToken: string, // Type as string
//         profile: Profile, // Type as Profile
//         done: VerifyCallback // Type as VerifyCallback
//       ) {
//         // Your logic here
//         done(null, { accessToken, refreshToken, profile });
//       }
//     )
//   );

// // Serialize and Deserialize User (for session management)
// passport.serializeUser((user, done) => done(null, user));
// passport.deserializeUser((user: any, done) => done(null, user));

// // Export OAuth2 client for direct API calls
// export { oauth2Client };


import { google } from 'googleapis';
import { config } from '../config';

const oauth2Client = new google.auth.OAuth2(
  config.google.clientId,
  config.google.clientSecret,
  config.google.redirectUri
);

export const getGmailAuthUrl = () => {
  const scopes = ['https://www.googleapis.com/auth/gmail.readonly'];
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes
  });
};

export const getGmailToken = async (code: string) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};