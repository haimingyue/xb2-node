// 定义一些中间件
import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
import Jimp from 'jimp';
import { imageResizer } from './file.service';

/**
 * 文件过滤器
 */
export const fileFilter = (fileTypes: Array<string>) => {
  return (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback,
  ) => {
    // 测试文件类型
    const allowed = fileTypes.some(type => type === file.mimetype);

    if (allowed) {
      callback(null, true);
    } else {
      callback(new Error('FILE_TYPE_NOT_ACCEPT'));
    }
  };
};

const fileUploadFilter = fileFilter(['image/png', 'image/jpg', 'image/jpeg']);

/**
 * 创建一个Multer
 */

const fileUpload = multer({
  dest: 'uploads/',
  fileFilter: fileUploadFilter,
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
