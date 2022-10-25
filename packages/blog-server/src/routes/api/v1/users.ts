import express from 'express';
import authorization from '../../../middlewares/authorization';
import usersController from '../../../controllers/user.controller';

const router = express.Router();

router.get('/me', authorization, usersController.me);

export default router;
