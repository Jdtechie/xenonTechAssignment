import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthenticationTokenMissingException, WrongAuthenticationTokenException } from '../exceptions/';
import { DataStoredInToken } from '../interfaces/';

async function authMiddleware(request: express.Request, response: Response, next: express.NextFunction) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET;
    try {
      jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
      next();
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;
