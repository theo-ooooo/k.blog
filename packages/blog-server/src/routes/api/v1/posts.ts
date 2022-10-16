import express from 'express';
import postsController from '../../../controllers/postsController';
const router = express.Router();

router.post('/list', postsController.list);

export default router;
