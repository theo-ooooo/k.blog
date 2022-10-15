import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import customError from '../libs/errors/customError';

const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error: { statusCode: number; result: boolean; message: string } = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    result: false,
    message: err.message || StatusCodes[StatusCodes.INTERNAL_SERVER_ERROR],
  };

  if (!(err instanceof customError)) {
    const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = error.message || StatusCodes[statusCode];
    error = new customError(statusCode, message);
  }

  res.status(error.statusCode).json({ result: error.result, error: { message: err.message } });
};

export default handleError;
