import { Request, Response } from 'express';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import authService from '../services/authService';

const register = asyncWrapper(async (req: Request, res: Response) => {
  const { email, password, nickname } = req.body;
  const user = await authService.register({ email, password, nickname });
  res.status(201).json({ result: true, user });
});

const login = (req: Request, res: Response) => {
  res.json({ result: true });
};

export default { register, login };
