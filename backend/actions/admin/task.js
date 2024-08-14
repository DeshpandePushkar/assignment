import pool from "../../dbConnection.js";
import asyncMiddelware from "../../middleware/async.js";
import { handleResponse } from "../../helper/responseHandler.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js"; // Import UTC plugin
import timezone from "dayjs/plugin/timezone.js"; // Import UTC plugin
import { BIKES } from "../../constants.js";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Kolkata");

export const getEmployeeProduction = asyncMiddelware(async (req, res) => {
  let date = dayjs(req.body.date).tz("Asia/Kolkata").format("YYYY-MM-DD");

  let GET_EMPLOYEE_PROD =
    "select * from task where emp_id = ? and date(timestamp) = ?";

  const employee_prod = await pool.query(GET_EMPLOYEE_PROD, [
    req.body.employee_id,
    date,
  ]);

  let total_work = 0;

  for (let i = 0; i < employee_prod.length; i++) {
    let bike = BIKES.find((bike) => bike.id == employee_prod[i].bike_id);
    total_work = total_work + bike.time;
  }
  handleResponse(res, total_work);
});

export const getNumberOfBikesAssembled = asyncMiddelware(async (req, res) => {
  let GET_COUNT =
    "select count(id) as total from task where timestamp > ? and timestamp< ?";

  const bike_count = await pool.query(GET_COUNT, [
    req.body.startTime,
    req.body.endTime,
  ]);

  handleResponse(res, bike_count);
});
