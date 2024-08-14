//error middleware sends every error to client
import { handleResponse } from "../helper/responseHandler.js";
export default function (err, req, res, next) {
  return handleResponse(res, null, null, err.message, err.errorCode || 500);
}
