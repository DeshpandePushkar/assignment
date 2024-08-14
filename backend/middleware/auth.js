//authentication of JWT token
import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY } from "../constants.js";
import { handleResponse } from "../helper/responseHandler.js";
const { verify } = jwt;
export default function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return handleResponse(
      res,
      null,
      null,
      "Access denied. No token provided.",
      401
    );
  }

  try {
    const decoded = verify(token, JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    return handleResponse(res, null, null, "Login Expired", 401);
  }
}
