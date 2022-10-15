import { Request, Response } from 'express';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import authService from '../services/authService';

const register = asyncWrapper(async (req: Request, res: Response) => {
  const { email, password, nickname } = req.body;
  const user = await authService.register({ email, password, nickname });
  res.status(201).json({ result: true, user });
});

const login = asyncWrapper(async (req: Request, res: Response) => {
  const authResult = await authService.login(req.body);

  res
    .status(200)
    .cookie('accessToken', authResult.tokens.accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60),
      path: '/',
    })
    .cookie('refreshToken', authResult.tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      path: '/',
    })
    .json({ result: true, tokens: authResult.tokens });
});

export default { register, login };
