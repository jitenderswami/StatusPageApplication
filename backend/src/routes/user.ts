import { Router, Request, Response, NextFunction } from 'express';
import { UserService } from "../services/UserService";
import { checkJwt } from "../middleware/auth";

const router = Router();
const userService = new UserService();
router.use(checkJwt);

router.get('/profile', checkJwt, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.auth?.payload?.sub;
        const accessToken = req.auth?.token;

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

export default router;
