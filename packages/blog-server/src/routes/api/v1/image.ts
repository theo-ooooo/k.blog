import express from 'express';
import multer from 'multer';
import imageController from '../../../controllers/image.controller';
import authorization from '../../../middlewares/authorization';
const router = express.Router();

router.post(
  '/thumbnailUpload',
  authorization,
  multer().single('file'),
  imageController.thumbnailUpload
);

export default router;
