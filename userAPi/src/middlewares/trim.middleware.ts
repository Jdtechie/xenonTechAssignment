import { NextFunction, Request, Response } from 'express';

const trimStringProperties = async (obj: any): Promise<object | string> => {
  let returnData;
  if (obj !== null && typeof obj === 'object') {
    for (const prop in obj) {
      // if the property is an object trim it too
      if (typeof obj[prop] === 'object') {
        returnData = trimStringProperties(obj[prop]);
      }

      // if it's a string remove begin and end whitespaces
      if (typeof obj[prop] === 'string') {
        returnData = obj[prop] = obj[prop].trim();
      }
    }
    return returnData;
  }
};
function trimAll(request: Request, response: Response, next: NextFunction) {
  if (request.body) {
    trimStringProperties(request.body);
  }
  if (request.params) {
    trimStringProperties(request.params);
  }
  if (request.query) {
    trimStringProperties(request.query);
  }
  next();
}
export default trimAll;
