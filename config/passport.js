import passport from 'passport';
import { Strategy as GoogleOAuthStrategy } from 'passport-google-oauth20';

import { User } from '../models/User.js';

export const configPassport = () => {
  passport.use(
    new GoogleOAuthStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findOne({ googleId: profile.id });
          if (!user) {
            const newUser = await User.create({
              googleId: profile.id,
              displayName: profile.displayName,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              profileImage: profile.photos[0].value,
            });

            return done(null, newUser);
          }

          done(null, user);
        } catch (error) {
          done(error, false);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        const error = new Error('User not found.');
        error.status = 404;
        throw error;
      }

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
};
