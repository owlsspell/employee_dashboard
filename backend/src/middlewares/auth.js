
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer'
console.log(process.env.MODE);
console.log('111', process.env.MODE === "development" ? process.env.AUTH0_AUDIENSE_DEV : process.env.AUTH0_AUDIENSE_PROD);
export const checkJwt = auth({
    audience: (process.env.MODE === "development" ? process.env.AUTH0_AUDIENSE_DEV : process.env.AUTH0_AUDIENSE_PROD),
    issuerBaseURL: process.env.AUTH0_BASE_URL,
    tokenSigningAlg: 'RS256'
});

export const checkScopes = requiredScopes('read:messages');

