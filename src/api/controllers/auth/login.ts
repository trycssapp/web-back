import passport from 'passport';

export const twitterLogin = () => {
    passport.authenticate('github', { failureRedirect: '/' }),
        function (req: any, res: any) {
            return res.redirect('/');
        };
};
