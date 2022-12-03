import { Request, Response } from 'express';
import { clearCookie, setTokenCookies } from '../libs/cookies';
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

    setTokenCookies(res, authResult.tokens);
    res.send({
      result: true,
      user: {
        nickname: authResult.user.nickname,
        avatorUrl: authResult.user.avatorUrl,
        userId: authResult.user.id,
      },
      tokens: authResult.tokens,
    });
  }),
  logout: (req: Request, res: Response) => {
    clearCookie(res);
    res.send({ result: true, message: '로그아웃 되었습니다.' });
  },
  refresh: asyncWrapper(async (req: Request, res: Response) => {
    const authResult = await authService.refesh(req.cookies.refreshToken);
    setTokenCookies(res, authResult.tokens);
    res.send({ result: true, ...authResult });
  }),
};

export default authController;
