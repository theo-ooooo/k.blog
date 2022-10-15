import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import apiError from './apiError';

const JWT_SECRET = process.env.JWT_SECRET ?? 'test';

interface tokenPayload {
  type: string;
  userId: number;
  email: string;
}

export const generateToken = (payload: tokenPayload) => {
  try {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: payload.type === 'accessToken' ? '1h' : '30d',
    });
    return token;
  } catch (e: any) {
    throw new apiError(StatusCodes.FORBIDDEN, e.message as string);
  }
};

export const validationToken = <T>(token: string) => {
  try {
    let valid: any;
    valid = jwt.verify(token, JWT_SECRET);
    return valid;
  } catch (e: any) {
    throw new apiError(StatusCodes.FORBIDDEN, e.message as string);
  }
};
