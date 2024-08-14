import { handleResponse } from "../helper/responseHandler.js";
import asyncMiddelware from "../middleware/async.js"; //async middelware instead of try catch in every async func.

export const permit = (...permittedRoles) => {
  return (request, response, next) => {
    const { user } = request;
    if (user && permittedRoles.includes(user.role)) {
      next(); // role is allowed, so continue on the next middleware
    } else {
      sendErrorMessage(request, response, next);
    }
  };
};

const sendErrorMessage = asyncMiddelware(async (req, res, next) => {
  return handleResponse(
    res,
    null,
    null,
    "Not permitted to access this resource.Contact Admin.",
    403
  );
});
