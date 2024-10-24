import { Router } from "express";

import swaggerRouter from "@/routes/swagger";
import v1Router from "@/routes/v1";
import healthRouter from "@/routes/health";

const router: Router = Router();

// Swagger
router.use("", swaggerRouter);

// Health check
router.get("/health", healthRouter);

// API v1
router.use("/v1/api", v1Router);


export default router;
