import { Request, Response, NextFunction } from 'express';
import { UserModel } from './user.model';
import * as UserServices from './user.service';

/**
 * 创建用户
 */

export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // 准备数据
  const { name, password } = request.body;
  // 创建用户
  try {
    const data = await UserServices.createUser({ name, password });
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};
