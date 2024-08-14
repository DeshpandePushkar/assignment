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

export const getEmployees = asyncMiddelware(async (req, res) => {
  const GET_EMPLOYEES = "select id,username from user where role='employee'";
  const result = await pool.query(GET_EMPLOYEES);
  handleResponse(res, result);
});

export const getEmployeeProduction = asyncMiddelware(async (req, res) => {
  let GET_EMPLOYEE_PROD =
    "select task.bike_id,task.emp_id,user.username from task join user on task.emp_id = user.id where date(timestamp) = ?";

  const employee_prod = await pool.query(GET_EMPLOYEE_PROD, req.query.date);

  let result = [];

  for (let i = 0; i < employee_prod.length; i++) {
    let bike = BIKES.find((bike) => bike.id == employee_prod[i].bike_id);
    const index = result.findIndex(
      (element) => element.emp_id == employee_prod[i].emp_id
    );
    if (index == -1) {
      result.push({
        employee: employee_prod[i].username,
        emp_id: employee_prod[i].emp_id,
        total_work: bike.time,
      });
    } else {
      let total_work = result[index].total_work;
      total_work = total_work + bike.time;
      result[index].total_work = total_work;
    }
  }
  handleResponse(res, result);
});

export const getNumberOfBikesAssembled = asyncMiddelware(async (req, res) => {
  let GET_COUNT = `select date(timestamp) AS day, count(id) as number_of_bikes
from task WHERE timestamp BETWEEN ? AND ? group by day`;

  const bike_count = await pool.query(GET_COUNT, [
    new Date(req.query.from),
    new Date(req.query.to),
  ]);
  handleResponse(res, bike_count);
});
