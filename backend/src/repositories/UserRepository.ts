import axios from 'axios';
import { User, Auth0UserProfile } from '../models/User';

export class UserRepository {
    private readonly auth0Domain = process.env.AUTH0_DOMAIN;
    private readonly clientId = process.env.AUTH0_CLIENT_ID;
    private readonly clientSecret = process.env.AUTH0_CLIENT_SECRET;
    private managementToken: string | null = null;

    private async getManagementToken(): Promise<string> {
        try {
            const response = await axios.post(
                `https://${this.auth0Domain}/oauth/token`,
                {
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    audience: `https://${this.auth0Domain}/api/v2/`,
                    grant_type: 'client_credentials',
                    scope: 'read:users read:user_idp_tokens'
                }
            );
            
            return response.data.access_token;
        } catch (error) {
            console.error('Error getting management token:', error);
            throw error;
        }
    }

    async findById(userId: string): Promise<User | null> {
        try {
            if (!this.managementToken) {
                this.managementToken = await this.getManagementToken();
            }

            const response = await axios.get(
                `https://${this.auth0Domain}/api/v2/users/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.managementToken}`
                    }
                }
            );

            const auth0User = response.data;
            return this.mapAuth0UserToUser(auth0User);
        } catch (error) {
            console.error('Error fetching user from Auth0:', error);
            return null;
        }
    }

    mapAuth0UserToUser(auth0User: Auth0UserProfile): User {
        return {
            id: auth0User.sub,
            email: auth0User.email,
            email_verified: auth0User.email_verified,
            name: auth0User.name,
            nickname: auth0User.nickname,
            picture: auth0User.picture,
            updated_at: new Date(auth0User.updated_at),
            created_at: new Date(auth0User.created_at)
        };
    }
} 