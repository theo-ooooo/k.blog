import express from 'express';
import { authRoutes, postsRoutes, tagsRoutes, usersRoutes } from './api/v1';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);
router.use('/tags', tagsRoutes);

export default router;
