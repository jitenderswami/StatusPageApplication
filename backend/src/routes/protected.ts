import { Router, Request, Response, NextFunction } from 'express';
import { checkJwt } from '../middleware/auth';
import { UserService } from '../services/UserService';

const router = Router();
const userService = new UserService();

// Protected user profile endpoint
router.get('/profile', checkJwt, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.auth?.payload?.sub;
        const accessToken = req.auth?.token;
        // const user = req.auth?.payload?.user
        if (!userId || !accessToken) {
            res.status(401).json({
                message: 'Token is missing',
                error: 'unauthorized'
            });
            return;
        }


        const userProfile = await userService.getUserProfile(userId, accessToken);

        if (!userProfile) {
            res.status(404).json({
                message: 'User not found',
                error: 'not_found'
            });
            return;
        }

        res.json({
            status: 'success',
            data: userProfile
        });
    } catch (error) {
        next(error);
    }
});

// Sample protected API
router.get('/dashboard-data', checkJwt, (req, res) => {
    res.json({
        message: 'Protected dashboard data',
        data: {
            stats: {
                visitors: 100,
                orders: 50,
                revenue: 1000
            },
            recentActivity: [
                { id: 1, action: 'purchase', timestamp: new Date() },
                { id: 2, action: 'login', timestamp: new Date() }
            ]
        }
    });
});

export default router; 