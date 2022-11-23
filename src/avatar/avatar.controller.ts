import { Response, Request, NextFunction } from 'express';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import { createAvatar, findAvatarByUserId } from './avatar.service';

/**
 * 上传文件
 */

export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // response.sendStatus(200);
  const { id: userId } = request.user;
  const fileInfo = _.pick(request.file, ['mimetype', 'filename', 'size']);

  const avatar = {
    ...fileInfo,
    userId,
  };

  const data = await createAvatar(avatar);

  try {
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 头像服务
 */

export const serve = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { userId } = request.params;
  try {
    const avatar = await findAvatarByUserId(parseInt(userId, 10));
    if (!avatar) {
      throw new Error('FILE_NOT_FOUND');
    }

    const { size } = request.query;

    let filename = avatar.filename;

    let root = path.join('uploads', 'avatar');
    console.log('root', root);
    let resize = 'resized';

    if (size) {
      const imageSize = ['large', 'medium', 'small'];
      if (!imageSize.some(item => item === size)) {
        throw new Error('FILE_NOT_FOUND');
      }

      const fileExist = fs.existsSync(
        path.join(root, resize, `${filename}-${size}`),
      );
      if (!fileExist) {
        throw new Error('FILE_NOT_FOUND');
      }
      if (fileExist) {
        filename = `${filename}-${size}`;
        root = path.join(root, resize);
      }
    }

    // 做出响应
    response.sendFile(filename, {
      root,
      headers: {
        'Content-Type': avatar.mimetype,
      },
    });
  } catch (error) {
    next(error);
  }
};
