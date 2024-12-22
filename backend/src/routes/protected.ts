import { Router, Request, Response, NextFunction } from 'express';
import { checkJwt } from '../middleware/auth';
import { UserService } from '../services/UserService';

const router = Router();
const userService = new UserService();


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