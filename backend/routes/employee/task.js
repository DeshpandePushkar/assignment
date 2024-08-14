import { Router } from "express";
import { addTask } from "../../actions/employee/task.js";
import { permit } from "../../middleware/authorization.js";

const router = Router();
router.post("/", permit("employee"), (req, res, next) => {
  addTask(req, res, next);
});

export default router;
