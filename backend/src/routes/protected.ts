import { Router } from 'express';
import { checkJwt } from '../middleware/auth';

const router = Router();

// Protected user profile endpoint
router.get('/profile', checkJwt, (req, res) => {
    res.json({
        message: 'Protected user profile data'
    });
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