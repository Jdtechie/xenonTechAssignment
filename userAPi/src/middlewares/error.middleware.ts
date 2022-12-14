import { Request, Response } from "express";
import { HttpException } from "../exceptions";

function errorMiddleware(
  error: HttpException,
  req: Request,
  response: Response
) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  return response.status(status).send({
    message,
    status,
  });
}

export default errorMiddleware;
