import { Request, Response, NextFunction } from 'express';

import { createUserLikePost, deleteUserLikePost } from './like.service';

/**
 * 点赞内容
 */

export const storeLikeUserPost = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // 准备数据
  const { postId } = request.params;
  const { id: userId } = request.user;

  // 点赞内容
  try {
    const data = await createUserLikePost(userId, parseInt(postId, 10));

    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

/**
 * 取消点赞
 */

export const destroyUserLikePost = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // 准备数据
  const { postId } = request.params;
  const { id: userId } = request.user;

  try {
    const data = await deleteUserLikePost(userId, parseInt(postId, 10));
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};
