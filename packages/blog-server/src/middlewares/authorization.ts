import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import apiError from '../libs/apiError';
import { validationToken } from '../libs/tokens';

const authorization = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken;
  if (!token) {
    throw new apiError(StatusCodes.FORBIDDEN, 'authorization');
  }

  const decoded = validationToken(token);
  req.user = {
    userId: decoded.userId,
    email: decoded.email,
  };
  next();
};

export default authorization;

declare module 'express' {
  interface Request {
    user?: {
      userId?: number;
      email?: string;
    } | null;
  }
}
