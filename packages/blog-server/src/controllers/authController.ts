import { Request, Response } from 'express';
import authService from '../services/authService';

const register = async (req: Request, res: Response) => {
  const { email, password, nickname } = req.body;
  try {
    const user = await authService.register({ email, password, nickname });
    res.status(201).json({ result: true, user });
  } catch (error: any) {
    //TODO: 에러메세지 확인. 안나옴.
    res.status(500).json({ result: false, error });
  }
};

const login = (req: Request, res: Response) => {
  res.json({ result: true });
};

export default { register, login };
