import express from 'express';
import { authGuard } from '../auth/auth.middleware';
import * as fileController from './file.controller';
import { fileInterceptor } from './file.middleware';

const router = express.Router();

console.log('files', router.post);

router.post('/files', authGuard, fileInterceptor, fileController.store);

router.get('/files/:fileId/serve', fileController.serve);

/**
 * 导出路由
 */
export default router;
