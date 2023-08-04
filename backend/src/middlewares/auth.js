
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer'

export const checkJwt = auth({
    audience: process.env.AUTH0_AUDIENSE,
    issuerBaseURL: process.env.AUTH0_BASE_URL,
    tokenSigningAlg: 'RS256'
});

export const checkScopes = requiredScopes('read:messages');

