import passport from 'passport';

export const twitterCallback = () => {
    return (
        passport.authenticate('github', { failureRedirect: '/' }),
        function (req: any, res: any) {
            res.redirect('/');
        }
    );
};
