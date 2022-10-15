import { Request, Response } from 'express';
import authService from '../services/authService';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const register = async (req: Request, res: Response) => {
  const { email, password, nickname } = req.body;
  try {
    const exists = await authService.getUserByEmail({ email });
    if (exists) {
      return res.json({ result: false, message: 'email exist' });
    }
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await authService.createUser({ email, password: hash, nickname });
    return res.json({ result: true, user });
  } catch (err) {
    return res.status(500).json({ result: false, massage: err });
  }
};

const login = (req: Request, res: Response) => {
  res.json({ result: true });
};

export default { register, login };
