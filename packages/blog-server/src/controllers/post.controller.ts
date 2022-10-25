import { Request, Response } from 'express';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import postsService from '../services/post.service';

const postsController = {
  list: asyncWrapper(async (req: Request, res: Response) => {
    const postResult = await postsService.getPostList(req.body);

    res.status(200).json({ result: true, data: postResult });
  }),
};

export default postsController;
