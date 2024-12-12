export interface UserProfile {
    sub: string;
    email?: string;
    name?: string;
}

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: UserProfile;
        }
    }
} 