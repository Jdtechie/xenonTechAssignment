import * as express from "express";
import { MIDDLEWARE_RESPONSE } from "../constant/response";
import * as Helpers from "../helpers";
const setResponse = Helpers.ResponseHelper;

export const confirmField = async (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) => {
  const payload = request.body;
  if (payload.newPassword === payload.confirmPassword) {
    next();
  } else {
    return setResponse.error401(response, {
      error: {
        name: "password missmatched",
        message: MIDDLEWARE_RESPONSE.MISSMATCHED_FIELDS,
      },
    });
  }
};
