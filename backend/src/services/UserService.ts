import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUserProfile(userId: string, accessToken: string): Promise<User | null> {
        try {
            // If we have an access token, we could use it to make additional API calls
            // to Auth0's /userinfo endpoint or other protected resources

            // Get user profile from our repository (which uses Auth0 Management API)
            const userProfile = await this.userRepository.findById(userId);

            if (!userProfile) {
                return null;
            }

            // You could enhance the profile with additional data from other sources
            return {
                ...userProfile,
                // Add any additional profile data here
            };
        } catch (error) {
            console.error('Error fetching user profile:', error);
            return null;
        }
    }

    // async getUserByEmail(email: string): Promise<User | null> {
    //     return this.userRepository.findByEmail(email);
    // }
} 