import { Request, Response } from 'express';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import tagsService from '../services/tagsService';

const create = asyncWrapper(async (req: Request, res: Response) => {
  const tagsResult = await tagsService.createTag(req.body);

  res.status(200).json({ result: true, data: tagsResult });
});

const update = asyncWrapper(async (req: Request, res: Response) => {
  const tagsResult = await tagsService.updateTag(req.body);

  res.status(200).json({ result: true, data: tagsResult });
});

const list = asyncWrapper(async (req: Request, res: Response) => {
  const tagsResult = await tagsService.getTagList();
  res.status(200).json({ result: true, data: tagsResult });
});

export default { create, update, list };
