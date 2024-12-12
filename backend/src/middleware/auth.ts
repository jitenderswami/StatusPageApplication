import { auth } from 'express-oauth2-jwt-bearer';
import { Request, Response, NextFunction } from 'express';

// Auth0 JWT middleware
export const checkJwt = auth({
    audience: 'https://api.statussphere.com',
    issuerBaseURL: 'https://status-sphere.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

// Error handling middleware
export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Invalid token or no token provided' });
    }
    next(err);
}; 