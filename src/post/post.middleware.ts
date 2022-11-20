import { Request, Response, NextFunction } from 'express';

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
