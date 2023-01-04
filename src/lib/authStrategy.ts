import config from '../config';
import prisma from './prisma';
import { IUser } from './types/types';

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

export default function authStrategy() {
    passport.serializeUser((user: IUser.User, done: any) => {
        done(null, user);
    });
    passport.deserializeUser(async (profile: IUser.User, done: any) => {
        console.log('ss', profile);

        const user = await prisma.user.findUnique({
            where: {
                githubId: profile.id,
            },
        });

        if (user) done(null, profile);
        else {
            done(null, profile);
        }
    });

    passport.use(
        new GitHubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: config.github.redirect_uri,
            },
            async (
                accessToken: any,
                refreshToken: any,
                profile: any,
                done: any
            ) => {
                const data = profile;
                try {
                    const user = await prisma.user.findUnique({
                        where: { githubId: String(data.id) },
                    });

                    if (user) {
                        done(null, user);
                    } else {
                        const newUser = await prisma.user.create({
                            data: {
                                avatar: data.photos[0].value.replace(
                                    '_normal',
                                    ''
                                ),
                                displayName: data.displayName,
                                username: data.username,
                                githubId: String(data.id),
                                websiteUrl: data._json.blog,
                                bio: data._json.bio,
                                location: data._json.location,
                            },
                        });

                        return done(null, newUser);
                    }
                } catch (err: any) {
                    console.log('error', err.message);
                    return done(err, 'undefined');
                }
            }
        )
    );
}
