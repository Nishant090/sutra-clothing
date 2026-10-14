import { Router } from "express";
import {
  register,
  login,
  verifyEmail,
  getMe,
  refresh,
  logout
} from "../controller/user.controller.js";
import { protect } from "../middleware/user.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verifyemail/:token", verifyEmail);
router.get("/getme",protect,authorize("admin"), getMe);
router.post("/refresh",  refresh);
router.post("/logout", logout);


export default router;
