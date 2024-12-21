export interface User {
    id: string;           // Auth0 user id (sub)
    email: string;
    email_verified?: boolean;
    name?: string;
    nickname?: string;
    picture?: string;
    updated_at: Date;
    created_at: Date;
}

export interface Auth0UserProfile {
    sub: string;
    email: string;
    email_verified: boolean;
    name: string;
    nickname: string;
    picture: string;
    updated_at: string;
    created_at: string;
} 