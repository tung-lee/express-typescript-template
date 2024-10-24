import { Router } from "express";

const router: Router = Router();

router.get("/health", (req, res) => {
    res.json({ message: "OK" });
});

export default router;
