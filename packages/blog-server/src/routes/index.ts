import express from 'express';
import { authRoutes, postsRoutes, usersRoutes } from './api/v1';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/posts', postsRoutes);

export default router;
