// controller 是用来接受前端发过来的数据，然后提供返回给前端数据的作用

import { Request, Response, NextFunction } from 'express';
import { signToken } from './auth.service';
/**
 * 用户登录
 */

export const login = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // const { name, password } = request.body;
  const {
    user: { id, name },
  } = request.body;

  const payload = { id, name };

  try {
    const token = signToken({ payload });
    // 做出响应
    response.send({
      id,
      name,
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 验证登录
 */
export const validate = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log(request.user);
  response.sendStatus(200);
};
