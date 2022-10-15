import express from 'express';
import authorization from '../../../middlewares/authorization';
import userController from '../../../controllers/userController';

const router = express.Router();

router.get('/me', authorization, userController.me);

export default router;
