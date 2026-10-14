
import { Router } from "express";

import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controller/category.controller.js";

import { protect } from "../middleware/user.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

// Public routes
router.get("/", getCategories);
router.get("/:id", getCategoryById);

// Admin-only route
router.post(
  "/",
  protect,
  authorize("admin"),
  createCategory,
);
router.patch(
  "/:id",
  protect,
  authorize("admin"),
  updateCategory,
);
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteCategory,
);

export default router;
