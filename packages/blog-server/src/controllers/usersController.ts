import { Request, Response } from 'express';

const me = (req: Request, res: Response) => {
  res.status(200).json({ result: true, user: req.user });
};

export default { me };
