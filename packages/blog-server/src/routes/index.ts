import express from 'express';
import { authRoutes } from './api/v1';

const router = express.Router();

router.use('/auth', authRoutes);

export default router;
