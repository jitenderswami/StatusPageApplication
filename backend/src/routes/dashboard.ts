import { Request, Response, Router } from "express";
import { checkJwt } from "../middleware/auth";
import { DashboardService } from "../services/DashboardService";

const router = Router();
const dashboardService = new DashboardService();

router.use(checkJwt);

router.get("/", async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.payload.sub;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const dashboardData = await dashboardService.getDashboardData(userId);
    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
