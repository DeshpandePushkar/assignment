import { Router } from "express";
import { login } from "../actions/login.js";

const router = Router();
router.post("/", (req, res, next) => {
  login(req, res, next);
});

export default router;
