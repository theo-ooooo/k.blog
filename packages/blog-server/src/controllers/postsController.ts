import { Request, Response } from 'express';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import postsService from '../services/postsService';

const list = asyncWrapper(async (req: Request, res: Response) => {
  const postResult = await postsService.getPostList(req.body);

  res.status(200).json({ result: true, data: postResult });
});

export default { list };
