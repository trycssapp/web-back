import 'dotenv/config';

const config = {
    port: 4000,
    cookies: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
    },
    github: {
        redirect_uri: `${process.env.API_URL}/auth/github/callback`,
    },
};

export default config;
