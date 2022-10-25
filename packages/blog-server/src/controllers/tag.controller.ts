import { Request, Response } from 'express';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import tagsService from '../services/tag.service';

const tagsController = {
  create: asyncWrapper(async (req: Request, res: Response) => {
    const tagsResult = await tagsService.createTag(req.body);

    res.status(200).json({ result: true, data: tagsResult });
  }),
  update: asyncWrapper(async (req: Request, res: Response) => {
    const tagsResult = await tagsService.updateTag(req.body);

    res.status(200).json({ result: true, data: tagsResult });
  }),
  list: asyncWrapper(async (req: Request, res: Response) => {
    const tagsResult = await tagsService.getTagList();
    res.status(200).json({ result: true, data: tagsResult });
  }),
};

export default tagsController;
