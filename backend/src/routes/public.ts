import { Request, Response, Router } from "express";
import { DashboardService } from "../services/DashboardService";

const router = Router();
const dashboardService = new DashboardService();

// Public health check endpoint
router.get("/status/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const dashboardData = await dashboardService.getDashboardData(userId);
    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
