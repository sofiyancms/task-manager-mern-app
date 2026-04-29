import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";
import validator from "../middlewares/validator.js";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validators/taskValidator.js";
import { checkTaskOwnership } from "../middlewares/ownership.js";
import { requireAuth } from "../middlewares/auth.js";
import { authorizeRoles } from "../middlewares/role.js";

const router = express.Router();

router.get("/", requireAuth, getAllTasks);
router.get("/:id", requireAuth, checkTaskOwnership, getTaskById);
router.post("/", requireAuth, validator(createTaskSchema), createTask);
router.put(
  "/:id",
  requireAuth,
  checkTaskOwnership,
  validator(updateTaskSchema),
  updateTask,
);
router.delete("/:id", requireAuth, checkTaskOwnership, deleteTask);

export default router;
