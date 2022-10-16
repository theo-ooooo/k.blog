import { Request, Response } from 'express';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import postService from '../services/postService';

const list = asyncWrapper(async (req: Request, res: Response) => {
  const postResult = await postService.getPostList(req.body);

  res.status(200).json({ result: true, data: postResult });
});

export default { list };
