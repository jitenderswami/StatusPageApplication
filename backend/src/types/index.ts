import { AuthResult } from "express-oauth2-jwt-bearer";

declare global {
    namespace Express {
        interface Request {
            // user?: User;
            auth?: AuthResult
        }
    }
} 