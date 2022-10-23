/**
 * middleware 验证用户登录
 */
import { Response, Request, NextFunction } from 'express';
import * as userService from '../user/user.service';
import bcript from 'bcrypt';

export const validateLoginData = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('👮🏻 验证登录信息');

  // 准备数据

  const { name, password } = request.body;

  // 验证必填项
  if (!name) return next(new Error('NAME_IS_REQUIRED'));
  if (!password) return next(new Error('PASSWORD_IS_REQUIRED'));

  // 验证用户名
  const user = await userService.getUserByName(name, { password: true });
  if (!user) return next(new Error('USER_DOSE_NOT_EXIST'));

  // 验证密码
  const matched = await bcript.compare(password, user.password);

  if (!matched) {
    return next(new Error('PASSWORD_DOSE_NOT_EXIST'));
  }

  // 下一步
  next();
};
