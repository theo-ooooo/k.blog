import db from '../libs/db';
import bcrypt from 'bcrypt';
import apiError from '../libs/apiError';
import { StatusCodes } from 'http-status-codes';
import { generateToken, validationToken } from '../libs/tokens';
import { User } from '@prisma/client';

const SALT_ROUNDS = 10;

interface userParams {
  email: string;
  password: string;
  nickname?: string;
}

const authService = {
  async createUser({ email, password, nickname }: userParams) {
    return await db.user.create({ data: { email, password, nickname } });
  },

  async getUserByEmail({ email }: { email: string }) {
    return await db.user.findUnique({ where: { email } });
  },

  async getUserById(id: number) {
    return await db.user.findUnique({ where: { id } });
  },

  async register({ email, password, nickname }: userParams) {
    const exists = await authService.getUserByEmail({ email });

    if (exists) {
      throw new apiError(StatusCodes.UNAUTHORIZED, `user exists`);
    }
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await authService.createUser({ email, password: hash, nickname });
    return { user };
  },

  async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      generateToken({
        type: 'accessToken',
        userId: user.id,
        avatorUrl: user.avatorUrl,
        nickname: user.nickname,
      }),
      generateToken({
        type: 'refreshToken',
        userId: user.id,
        avatorUrl: user.avatorUrl,
        nickname: user.nickname,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  },

  async login({ email, password }: userParams) {
    const user = await authService.getUserByEmail({ email });

    if (!user) {
      throw new apiError(StatusCodes.NOT_FOUND, `not user exists`);
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw new apiError(StatusCodes.UNAUTHORIZED, `password`);
    }
    const { accessToken, refreshToken } = await this.generateTokens(user);
    return { user, tokens: { accessToken, refreshToken } };
  },
  async refesh({ refreshToken: paramsRefreshToken }: { refreshToken: string }) {
    if (!paramsRefreshToken) {
      throw new apiError(StatusCodes.BAD_REQUEST, `bad request`);
    }

    const vaild = validationToken(paramsRefreshToken);

    if (!vaild) {
      throw new apiError(StatusCodes.UNAUTHORIZED, 're login');
    }

    const user = await this.getUserById(vaild.userId);

    const { accessToken, refreshToken } = await this.generateTokens(user!);
    return { user, tokens: { accessToken, refreshToken } };
  },
};

export default authService;
