// 定义一些中间件
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

/**
 * 创建一个Multer
 */

const fileUpload = multer({
  dest: 'uploads/',
});

/**
 * 创建一个文件拦截器
 */
export const fileInterceptor = fileUpload.single('file');
