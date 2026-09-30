import { Router } from "express";
import {
  register,
  login,
  verifyEmail,
  getMe,
  refresh,
} from "../controller/user.controller.js";
import { protect } from "../middleware/user.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verifyemail/:token", verifyEmail);
router.get("/getme", protect, authorize("user"), getMe);
router.get("/refresh", protect, authorize("user"), refresh);

export default router;
