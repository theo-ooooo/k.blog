import express from 'express';
import { body } from 'express-validator';
import postsController from '../../../controllers/post.controller';
import authorization from '../../../middlewares/authorization';
import { formValidationResult } from '../../../middlewares/common';
const router = express.Router();

router.post('/list', postsController.list);

router.get('/:slug', postsController.get);

router.post(
  '/create',
  authorization,
  body('title').notEmpty(),
  body('content').notEmpty(),
  formValidationResult,
  postsController.create
);

router.post(
  '/update',
  authorization,
  body('postId').isNumeric(),
  body('title').notEmpty(),
  body('content').notEmpty(),
  formValidationResult,
  postsController.update
);

export default router;
