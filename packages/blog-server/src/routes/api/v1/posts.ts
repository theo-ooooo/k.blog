import express from 'express';
import postController from '../../../controllers/postController';
const router = express.Router();

router.post('/list', postController.list);

export default router;
