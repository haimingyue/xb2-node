import express from 'express';
import * as postController from './post.controller';
import { authGuard, accessControl } from '../auth/auth.middleware';
import { sort, filter, paginate } from './post.middleware';

const router = express.Router();

/**
 * 内容列表
 */
router.get('/posts', sort, filter, paginate, postController.index);

/**
 * 创建内容
 */
router.post('/posts', authGuard, postController.store);

router.patch(
  '/posts/:postId/tag',
  authGuard,
  accessControl({ possession: true }),
  postController.storePostTag,
);

router.delete(
  '/posts/:postId/tag',
  authGuard,
  accessControl({ possession: true }),
  postController.destroyPostTag,
);

/**
 * 更新内容
 */
router.patch(
  '/posts/:postId',
  authGuard,
  accessControl({ possession: true }),
  postController.update,
);

/**
 * 删除内容
 */
router.delete(
  '/posts/:postId',
  authGuard,
  accessControl({ possession: true }),
  postController.destory,
);

/**
 * 导出路由
 */
export default router;
