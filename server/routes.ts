import { Router } from "express";
import callbackRoute from "./callback";

const router = Router();

// Register POST /callback endpoint
router.use("/callback", callbackRoute);

export default router;
