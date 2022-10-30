// 定义一些中间件
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import Jimp from 'jimp';
import { imageResizer } from './file.service';

/**
 * 创建一个Multer
 */

const fileUpload = multer({
  dest: 'uploads/',
});

/**
 * 文件处理中间件
 */

export const fileProcessor = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log(request.file);
  request.file;
  const { path } = request.file;
  let image: Jimp;
  try {
    image = await Jimp.read(path);
  } catch (error) {
    return next(error);
  }

  const { imageSize, tags } = image['_exif'];

  request.fileMetaData = {
    width: imageSize.width,
    height: imageSize.height,
    metadata: JSON.stringify(tags),
  };
  console.log(123);
  // 调整图像尺寸
  imageResizer(image, request.file);

  next();
};

/**
 * 创建一个文件拦截器
 */
export const fileInterceptor = fileUpload.single('file');
