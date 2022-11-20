import { Request, Response, NextFunction } from 'express';
import { POSTS_PER_PAGE } from '../app/app.config';

/**
 * 排序方式
 */

export const sort = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // 获取客户端的排序方式
  const { sort } = request.query;

  // 排序用的Sql
  let sqlSort: string;

  switch (sort) {
    case 'earliest':
      sqlSort = 'post.id ASC';
      break;
    case 'latest':
      sqlSort = 'post.id DESC';
      break;
    case 'most_comments':
      sqlSort = 'totalComments DESC, post.id DESC';
      break;
    default:
      sqlSort = 'post.id DESC';
      break;
  }

  request.sort = sqlSort;

  next();
};

/**
 * 过滤列表
 */

export const filter = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { tag, user, action } = request.query;

  request.filter = {
    name: 'default',
    sql: 'post.id IS NOT NULL',
  };

  if (tag && !user && !action) {
    request.filter = {
      name: 'tagName',
      sql: 'tag.name = ?',
      param: tag,
    };
  }

  if (user && action === 'published' && !tag) {
    request.filter = {
      name: 'userPublished',
      sql: 'user.id = ?',
      param: user,
    };
  }

  next();
};

/**
 * 内容分页
 */

export const paginate = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // 当前页码
  const { page = 1 } = request.query;

  // 每页内容数量
  const limit = parseInt(POSTS_PER_PAGE, 10);

  // 计算出偏移量
  const offset = limit * (page - 1);
  request.pagination = { limit, offset };
  next();
};
