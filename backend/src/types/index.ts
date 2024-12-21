import { AuthResult } from "express-oauth2-jwt-bearer";

// interface Auth0JWTClaims {
//     iss?: string;
//     sub?: string;
//     aud?: string[];
//     iat?: number;
//     exp?: number;
//     azp?: string;
//     scope?: string;
//     permissions?: string[];
// }

declare global {
    namespace Express {
        interface Request {
            // user?: User;
            auth?: AuthResult
        }
    }
} 