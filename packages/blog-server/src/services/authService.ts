import db from '../libs/db';
import bcrypt from 'bcrypt';
import apiError from '../libs/apiError';
import { StatusCodes } from 'http-status-codes';
import { generateToken } from '../libs/tokens';

const SALT_ROUNDS = 10;

interface userParams {
  email: string;
  password: string;
  nickname?: string;
}

const createUser = async ({ email, password, nickname }: userParams) => {
  return await db.user.create({ data: { email, password, nickname } });
};

const getUserByEmail = async ({ email }: { email: string }) => {
  return await db.user.findUnique({ where: { email } });
};

const register = async ({ email, password, nickname }: userParams) => {
  const exists = await getUserByEmail({ email });

  if (exists) {
    throw new apiError(StatusCodes.UNAUTHORIZED, `user exists`);
  }
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await createUser({ email, password: hash, nickname });
  return { user };
};

const login = async ({ email, password }: userParams) => {
  const user = await getUserByEmail({ email });

  if (!user) {
    throw new apiError(StatusCodes.NOT_FOUND, `not user exists`);
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw new apiError(StatusCodes.UNAUTHORIZED, `password`);
  }

  const accessToken = generateToken({
    type: 'accessToken',
    userId: user.id,
    email: user.email,
    nickname: user.nickname,
  });
  const refreshToken = generateToken({
    type: 'refreshToken',
    userId: user.id,
    email: user.email,
    nickname: user.nickname,
  });

  return { user, tokens: { accessToken, refreshToken } };
};

export default { register, login };
