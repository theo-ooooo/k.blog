import express from 'express';
import { authRoutes, usersRoutes } from './api/v1';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);

export default router;
