import { userController } from "@/controllers";
import { Router } from "express";

const router: Router = Router();

router.get("", userController.findMany);

router.get("/:id", userController.findById);

router.post("", userController.create);

router.put("/:id", userController.update);

router.delete("/:id", userController.deleteById);

export default router;
