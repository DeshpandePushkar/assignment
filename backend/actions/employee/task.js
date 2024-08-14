import pool from "../../dbConnection.js";
import asyncMiddelware from "../../middleware/async.js";
import { handleResponse } from "../../helper/responseHandler.js";
export const addTask = asyncMiddelware(async (req, res) => {
  //Insert into task table
  let insertData = {
    emp_id: req.user.id,
    bike_id: req.body.bike_id,
    timestamp: new Date(),
  };

  const ADD_TASK = "INSERT INTO task SET ?";
  const result = await pool.query(ADD_TASK, insertData);

  handleResponse(res, "Successfully added bike work");
});
