import express from 'express';
import { body } from 'express-validator';
import tagsController from '../../../controllers/tagsController';
import authorization from '../../../middlewares/authorization';
import { formValidationResult } from '../../../middlewares/common';
const router = express.Router();

router.get('/list', tagsController.list);
router.post(
  '/create',
  authorization,
  body('name').isString().withMessage('name'),
  tagsController.create
);

router.post(
  '/update',
  authorization,
  body('id').isNumeric().withMessage('tagsId'),
  body('name').isString().withMessage('name'),
  formValidationResult,
  tagsController.update
);

export default router;
