/**
 * middleware 验证用户登录
 */
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as userService from '../user/user.service';
import bcript from 'bcrypt';
import { PUBLIC_KEY } from '../app/app.config';
import { TokenPayload } from './auth.interface';
import { possess } from './auth.service';

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

  // 请求主体添加用户
  request.body.user = user;

  // 下一步
  next();
};

/**
 * 验证用户身份
 */

export const authGuard = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('👮🏻 验证用户身份');
  try {
    const authorization = request.header('Authorization');

    if (!authorization) {
      throw new Error();
    }

    const token = authorization.replace('Bearer ', '');
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
    });

    // 在请求里面添加user
    request.user = decoded as TokenPayload;
    // 下一步
    next();
  } catch (error) {
    next(new Error('UNAUTHORIZED'));
  }
};

/**
 * 访问控制
 */

interface AccessControlOptions {
  possession?: boolean;
}

export const accessControl = (options: AccessControlOptions) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    console.log('访问控制');
    const { possession } = options;

    // 当前用户id
    const { id: userId } = request.user;
    console.log(
      '🚀 ~ file: auth.middleware.ts ~ line 94 ~ return ~ userId',
      userId,
    );
    if (userId === 1) {
      return next();
    }

    const resourceIdParam = Object.keys(request.params)[0];

    const resourceType = resourceIdParam.replace('Id', '');

    const resourceId = parseInt(request.params[resourceIdParam], 10);

    // 检查资源拥有权
    if (possession) {
      try {
        const ownResource = await possess({
          resourceId,
          resourceType,
          userId,
        });
        if (!ownResource) {
          return next(new Error('USER_DOSE_NOT_OWN_RESOURCE'));
        }
      } catch (error) {
        return next(error);
      }
    }

    next();
  };
};
