import db from '../libs/db';
import bcrypt from 'bcrypt';
import customError from '../libs/errors/customError';
import { StatusCodes } from 'http-status-codes';

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
    throw new customError(StatusCodes.UNAUTHORIZED, `user exists`);
  }
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await createUser({ email, password: hash, nickname });
  return { user };
};

export default { register };
