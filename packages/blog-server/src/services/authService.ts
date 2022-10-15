import db from '../libs/db';

interface user {
  email: string;
  password: string;
  nickname?: string;
}

const createUser = async ({ email, password, nickname }: user) => {
  return await db.user.create({ data: { email, password, nickname } });
};

const getUserByEmail = async ({ email }: { email: string }) => {
  return await db.user.findUnique({ where: { email } });
};

export default { createUser, getUserByEmail };
