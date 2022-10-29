import express from 'express';
import { authRoutes, imageRoutes, postsRoutes, tagsRoutes, usersRoutes } from './api/v1';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.use('/tags', tagsRoutes);
router.use('/image', imageRoutes);

export default router;
