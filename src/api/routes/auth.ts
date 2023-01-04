import { Router } from 'express';
import passport from 'passport';
import logout from '../controllers/auth/logout';

const auth = Router();

auth.get(
    '/github',
    passport.authenticate('github', { failureRedirect: '/error' }),
    function (req, res) {
        res.redirect(process.env.FRONTEND_URL);
    }
);
auth.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/error' }),

    function (req, res) {
        res.redirect(process.env.FRONTEND_URL);
    }
);
auth.post('/logout', logout);

export default auth;
