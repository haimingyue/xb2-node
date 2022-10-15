import { Request, Response, NextFunction } from 'express';

/**
 * 输出请求的地址
 */
export const requestUrl = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log(request.url);
  next();
};

/**
 * 异常处理器
 */

export const defaultErrorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error.message) {
    console.log('❎ error:', error);
  }
  let statusCode: number, message: string;
  // 处理异常
  switch (error.message) {
    case 'NAME_IS_REQUIRED':
      statusCode = 400;
      message = '请提供用户名';
      break;
    case 'PASSWORD_IS_REQUIRED':
      statusCode = 400;
      message = '请提供用户密码';
      break;
    case 'USER_ALREADY_EXIST':
      statusCode = 409;
      message = '用户名已经被占用';
      break;
    default:
      statusCode = 500;
      message = '服务暂时出了一点问题 ~~ 🌲';
      break;
  }

  response.status(statusCode).send({
    message,
  });
};
