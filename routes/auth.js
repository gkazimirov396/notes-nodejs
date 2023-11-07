import { Router } from 'express';
import passport from 'passport';

import authController from '../controllers/authController.js';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failWithError: true,
    successRedirect: '/dashboard',
    failureMessage: 'Authentication Failed!',
  })
);

router.get('/logout', authController.logoutHandler);

export default router;
