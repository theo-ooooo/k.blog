import { Request, Response } from 'express';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import authService from '../services/auth.service';

const authController = {
  register: asyncWrapper(async (req: Request, res: Response) => {
    const { email, password, nickname } = req.body;
    const user = await authService.register({ email, password, nickname });
    res.status(201).json({ result: true, user });
  }),
  login: asyncWrapper(async (req: Request, res: Response) => {
    const authResult = await authService.login(req.body);

    res.cookie('access_token', authResult.tokens.accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60),
      path: '/',
    });

    res.cookie('refresh_token', authResult.tokens.refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      path: '/',
    });

    res.send({
      result: true,
      user: {
        nickanme: authResult.user.nickname,
        avatorUrl: authResult.user.avatorUrl,
        userId: authResult.user.id,
      },
      tokens: authResult.tokens,
    });
  }),
  logout: (req: Request, res: Response) => {
    res
      .clearCookie('access_token')
      .clearCookie('refresh_token')
      .status(200)
      .json({ result: true, message: '로그아웃 되었습니다.' });
  },
};

export default authController;
