import express from 'express';
import { authGuard } from '../auth/auth.middleware';
import * as fileController from './file.controller';
import { fileInterceptor, fileProcessor } from './file.middleware';

const router = express.Router();

console.log('files', router.post);

router.post(
  '/files',
  authGuard,
  fileInterceptor,
  fileProcessor,
  fileController.store,
);

router.get('/files/:fileId/serve', fileController.serve);

router.get('/files/:fileId/metadata', fileController.metadata);

/**
 * 导出路由
 */
export default router;
