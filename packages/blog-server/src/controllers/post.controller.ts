import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import apiError from '../libs/apiError';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import postsService from '../services/post.service';

const postsController = {
  list: asyncWrapper(async (req: Request, res: Response) => {
    const postResult = await postsService.getPostList(req.body);

    res.status(200).json({ result: true, data: postResult });
  }),
  get: asyncWrapper(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const postResult = await postsService.getPost({ slug });

    res.status(200).json({ result: true, data: postResult });
  }),
  create: asyncWrapper(async (req: Request, res: Response) => {
    if (req.user && req.user.userId) {
      const { userId } = req.user;
      const postResult = await postsService.createPost(userId, req.body);
      res.status(200).json({ result: true, data: postResult });
    } else {
      throw new apiError(StatusCodes.FORBIDDEN, `auth`);
    }
  }),
  update: asyncWrapper(async (req: Request, res: Response) => {
    if (req.user && req.user.userId) {
      const { userId } = req.user;
      const postResult = await postsService.updatePost(userId, req.body);
      res.status(200).json({ result: true, data: postResult });
    } else {
      throw new apiError(StatusCodes.FORBIDDEN, `auth`);
    }
  }),
};

export default postsController;
