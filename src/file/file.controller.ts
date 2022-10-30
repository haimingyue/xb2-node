// 定义file的处理器
import path from 'path';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import _, { create } from 'lodash';
import { createFile, findFileById } from './file.service';

/**
 * 上传文件
 */

export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log(request.file);
  const { id: userId } = request.user;

  const { post: postId } = request.query;

  const fileInfo = _.pick(request.file, [
    'originalname',
    'mimetype',
    'filename',
    'size',
  ]);
  try {
    const data = await createFile({
      ...fileInfo,
      userId,
      postId,
      ...request.fileMetaData,
    });

    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 文件服务
 */

export const serve = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { fileId } = request.params;
  try {
    const file = await findFileById(parseInt(fileId, 10));

    // 要提供的图像尺寸
    const { size } = request.query;

    // 文件名与目录
    let filename = file.filename;
    let root = 'uploads';
    let resized = 'resized';

    if (size) {
      // 可用尺寸
      const imageSizes = ['large', 'medium', 'thumbnail'];
      // 检查尺寸是否可用
      if (!imageSizes.some(item => item === size)) {
        throw new Error('FILE_NOT_FOUND');
      }
      // 检查文件是否存储
      const fileExist = fs.existsSync(
        path.join(root, resized, `${filename}-${size}`),
      );
      // 设备文件名 & 目录
      if (fileExist) {
        filename = `${filename}-${size}`;
        root = path.join(root, resized);
      }
    }

    response.sendFile(filename, {
      root,
      headers: {
        'Content-Type': file.mimetype,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 文件信息
 */

export const metadata = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { fileId } = request.params;
  try {
    const file = await findFileById(parseInt(fileId, 10));

    const data = _.pick(file, ['id', 'size', 'width', 'height', 'metadata']);

    response.send(data);
  } catch (error) {
    next(error);
  }
};
