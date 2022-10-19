import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { MIDDLEWARE_RESPONSE } from "../constant/response";
import * as Helpers from "../helpers";
import { GenericRequestPusher } from "../interfaces/responses.interface";

const setResponse = Helpers.ResponseHelper;
declare module "express" {
  interface Request {
    userInfo: GenericRequestPusher;
  }
}

function validateToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token =
    request.body.accessToken ||
    request.query.accessToken ||
    (request.headers["api-access-token"] as string);

  jwt.verify(
    token,
    process.env.JWTSECRET,
    async (err: jwt.VerifyErrors, decoded: { jwtData: string }) => {
      if (err) {
        console.log(`ERROR::`, err);

        return setResponse.error401(response, {
          error: {
            name: "Jwt error",
            message: MIDDLEWARE_RESPONSE.JWTERROR,
          },
          errorMessage: err.message,
        });
      } else {
        request.userInfo = decoded;
        next();
      }
    }
  );
}

export default validateToken;
