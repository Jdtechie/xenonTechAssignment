import { Responses } from "../../interfaces";
import { Response } from "express";
import {
  GenericSuccess,
  GenericError,
} from "../../interfaces/responses.interface";

class ResponseHelper {
  public success(response: Response, data: GenericSuccess) {
    const finalSuccess: Responses.Responses = {
      response: {
        status: 200,
        message: data.message,
        error: false,
        data: typeof data.data != "undefined" ? data.data : [],
        totalResults:
          typeof data.totalResults != "undefined" ? data.totalResults : 0,
      },
    };
    return response.status(200).send(finalSuccess);
  }
  public error400(response: Response, data: GenericError) {
    console.log(`ERROR MESSAGE::`, data);

    const errorResponse: Array<object> = [];
    if (typeof data.error === "object") {
      errorResponse.push(data.error);
    }
    const finalError: Responses.Responses = {
      response: {
        status: 400,
        message: data.error ? data.error : "Error",
        error: true,
        data: errorResponse,
      },
    };
    return response.status(400).send(finalError);
  }
  public error401(response: Response, data: GenericError) {
    const errorResponse: Array<object> = [];
    if (typeof data.error === "object") {
      errorResponse.push(data.error);
    }
    const finalError: Responses.Responses = {
      response: {
        status: 401,
        message: data.errorMessage ? data.errorMessage : "Error",
        error: true,
        data: errorResponse,
      },
    };
    return response.status(401).send(finalError);
  }
  public error500(response: Response, data: GenericError) {
    const errorResponse: Array<object> = [];
    if (typeof data.error === "object") {
      errorResponse.push(data.error);
    }
    const finalError: Responses.Responses = {
      response: {
        status: 500,
        message: "Error",
        error: true,
        data: errorResponse,
      },
    };
    return response.status(500).send(finalError);
  }
}
export default new ResponseHelper();
