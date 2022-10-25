import { Request, Response } from 'express';

const usersController = {
  me: (req: Request, res: Response) => {
    res.status(200).json({ result: true, user: req.user });
  },
};

export default usersController;
