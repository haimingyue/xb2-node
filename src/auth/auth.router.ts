/**
 * router文件用来提供接口，调用controller里面的所有的方法
 */
import express from 'express';
import * as authController from './auth.controller';
import { authGuard, validateLoginData } from './auth.middleware';

const router = express.Router();

/**
 * 用户登录
 */
router.post('/login', validateLoginData, authController.login);

router.post('/auth/validate', authGuard, authController.validate);

/**
 * 导出路由
 */
export default router;
