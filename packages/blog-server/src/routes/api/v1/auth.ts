import express from 'express';
import { body } from 'express-validator';
import authController from '../../../controllers/auth.controller';
import authorization from '../../../middlewares/authorization';
import { formValidationResult } from '../../../middlewares/common';

const router = express.Router();

router.post(
  '/register',
  body('email').isEmail().withMessage('email'),
  body('password').isLength({ min: 5 }).withMessage('password length'),
  formValidationResult,
  authController.register
);

router.post(
  '/login',
  body('email').isEmail().withMessage('email'),
  body('password').isLength({ min: 5 }).withMessage('password length'),
  formValidationResult,
  authController.login
);

router.get('/logout', authorization, authController.logout);

export default router;
