// controller 是用来接受前端发过来的数据，然后提供返回给前端数据的作用

import { Request, Response, NextFunction } from 'express';
/**
 * 用户登录
 */

export const login = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { name, password } = request.body;

  response.send({
    message: `欢迎回来，${name}`,
  });
};
