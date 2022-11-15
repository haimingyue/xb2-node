import * as commentController from './comment.controller';
import express from 'express';
import { authGuard, accessControl } from '../auth/auth.middleware';

const router = express.Router();

router.post('/comments', authGuard, commentController.store);

router.post('/comments/:commentId/reply', authGuard, commentController.reply);

router.patch(
  '/comments/:commentId',
  authGuard,
  accessControl({ possession: true }),
  commentController.update,
);

router.delete(
  '/comments/:commentId',
  authGuard,
  accessControl({ possession: true }),
  commentController.destroy,
);

export default router;
