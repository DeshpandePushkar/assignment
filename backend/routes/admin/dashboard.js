import { Router } from "express";
import {
  getEmployeeProduction,
  getEmployees,
  getNumberOfBikesAssembled,
} from "../../actions/admin/dashboard.js";
import { permit } from "../../middleware/authorization.js";

const router = Router();
router.get("/employees", permit("admin"), (req, res, next) => {
  getEmployees(req, res, next);
});
router.get("/employee-prod", permit("admin"), (req, res, next) => {
  getEmployeeProduction(req, res, next);
});
router.get("/number-of-bikes", permit("admin"), (req, res, next) => {
  getNumberOfBikesAssembled(req, res, next);
});

export default router;
