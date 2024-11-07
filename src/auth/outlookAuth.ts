import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import axios from 'axios';

// Import environment variables for client credentials
const OUTLOOK_CLIENT_ID = process.env.OUTLOOK_CLIENT_ID as string;
const OUTLOOK_CLIENT_SECRET = process.env.OUTLOOK_CLIENT_SECRET as string;
const OUTLOOK_REDIRECT_URI = 'http://localhost:3000/auth/outlook/callback'; // Update if necessary

// Passport strategy for Outlook
passport.use(
  'outlook',
  new OAuth2Strategy(
    {
      authorizationURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      tokenURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      clientID: process.env.OUTLOOK_CLIENT_ID,
      clientSecret: OUTLOOK_CLIENT_SECRET,
      callbackURL: OUTLOOK_REDIRECT_URI,
      scope: ['openid', 'profile', 'offline_access', 'Mail.Read', 'Mail.Send'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const userInfo = await axios.get('https://graph.microsoft.com/v1.0/me', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const user = {
          profile: userInfo.data,
          accessToken,
          refreshToken,
        };

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize and deserialize user for session handling
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

export default passport;
