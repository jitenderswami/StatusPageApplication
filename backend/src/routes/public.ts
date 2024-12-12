import { Router } from 'express';

const router = Router();

// Public health check endpoint
router.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Sample public API
router.get('/public-data', (req, res) => {
    res.json({
        message: 'This is public data',
        data: {
            items: ['item1', 'item2', 'item3']
        }
    });
});

export default router; 