import { ManagementClient } from 'auth0';
import { User, Auth0UserProfile } from '../models/User';
import axios from 'axios';

export class UserRepository {
    private management: ManagementClient;

    constructor() {
        this.management = new ManagementClient({
            domain: "status-sphere.us.auth0.com",
            clientId: "aXEISpA9PaoYtBSmy4OZXopXaN3HdXmE",
            clientSecret: "hVmDr8fJrLmA1A6SGbuFQMGx3vBWpjWf0IMM_Vc6hJnmrg6YwPFDk95f7OLSLb1A",
            audience: "https://api.statussphere.com"
        });
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

    async findById(id: string, token: string): Promise<User | null> {
        try {
            const user = await this.management.users.get({ id });

            return this.mapAuth0UserToUser(user as unknown as Auth0UserProfile);
        } catch (error) {
            console.error('Error fetching user from Auth0:', error);
            return null;
        }
    }

    // async findByEmail(email: string): Promise<User | null> {
    //     try {
    //         const users = await this.management.(email);
    //         if (users && users[0]) {
    //             return this.mapAuth0UserToUser(users[0] as Auth0UserProfile);
    //         }
    //         return null;
    //     } catch (error) {
    //         console.error('Error fetching user by email from Auth0:', error);
    //         return null;
    //     }
    // }
} 