import { Router } from "express";

import userRouter from "@/routes/v1/user";

const router: Router = Router();

router.use("/users", userRouter);

export default router;