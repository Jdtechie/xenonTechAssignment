import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as Helpers from "../helpers";
import { GenericRequestPusher } from "../interfaces/responses.interface";

const setResponse = Helpers.ResponseHelper;
declare module "express" {
  interface Request {
    userInfo: GenericRequestPusher;
  }
}

function authToken(token: string) {
  let userId: number;
  if (token.length > 20) {
    jwt.verify(
      token,
      process.env.JWTSECRET,
      async (err: jwt.VerifyErrors, decoded: { jwtData: string }) => {
        if (err) {
          console.log(`ERROR::`, err);
        } else {
          const userID = decoded.jwtData;
          userId = Number(userID);
        }
      }
    );
  }
  return userId;
}

export default authToken;
