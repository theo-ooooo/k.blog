import express from 'express';
import { body } from 'express-validator';
import authController from '../../../controllers/authController';
import { formValidationResult } from '../../../middlewares/common';

const router = express.Router();

router.post(
  '/register',
  body('email').isEmail().withMessage('email'),
  body('password').isLength({ min: 5 }).withMessage('password length'),
  formValidationResult,
  authController.register
);

router.post('/login', (req, res) => {
  res.json({ result: true });
});

router.get('/test', (req, res) => {
  res.json({ result: true });
});

export default router;
