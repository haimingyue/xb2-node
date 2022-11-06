import * as commentController from './comment.controller';
import express from 'express';
import { authGuard } from '../auth/auth.middleware';

const router = express.Router();

router.post('/comments', authGuard, commentController.store);

router.post('/comments/:commentId/reply', authGuard, commentController.reply);

export default router;
