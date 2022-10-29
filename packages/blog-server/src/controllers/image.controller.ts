import { Request, Response } from 'express';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import imageService from '../services/image.service';

const imageController = {
  thumbnailUpload: asyncWrapper(async (req: Request, res: Response) => {
    const uploadResult = await imageService.thumbnailUpload(req.file);
    res.status(200).json({ result: true, data: uploadResult });
  }),
};

export default imageController;
