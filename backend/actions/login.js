import jwt from "jsonwebtoken";
import pool from "../dbConnection.js";
import { JWT_PRIVATE_KEY } from "../constants.js";
import asyncMiddelware from "../middleware/async.js"; //async middelware instead of try catch in every async func.
import { handleResponse } from "../helper/responseHandler.js";
const { sign } = jwt;
export const login = asyncMiddelware(async (req, res) => {
  const GET_USER = `Select * from user where username = ?`;
  const user = await pool.query(GET_USER, req.body.username);
  if (!user.length) {
    return handleResponse(res, null, null, "No user Found", 400);
  } else {
    const validPassword = req.body.password === user[0].password; // comparing password with bcrypt.Password are saved after encrypting while creating/updating user.
    // password does not match
    if (!validPassword) {
      return handleResponse(res, null, null, "Invalid password.", 400);
    }

    const token = sign(
      {
        id: user[0].id,
        username: req.body.username,
        role: user[0].role,
        //Anything extra about user that can be sent from here
      },
      JWT_PRIVATE_KEY,
      { expiresIn: "16h" }
    );
    const userDetils = {
      username: user[0].username,
      role: user[0].role,
      //Anything extra about user that can be sent from here
    };

    handleResponse(res, { authToken: token, user: userDetils });
  }
});
