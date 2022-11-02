// 提供路由需要的数据，返回给前端什么数据
import { Request, Response, NextFunction } from 'express';
import { getTagByTagName, createTag } from './tag.service';

/**
 * 创建标签
 */

export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  // 准备数据
  const { name } = request.body;
  console.log('name', name);

  try {
    console.log('getTagByTagName', getTagByTagName);
    const tag = await getTagByTagName(name);
    console.log('tag', tag);
    if (tag) {
      throw new Error('TAG_ALREADY_EXISTS');
    }

    const data = await createTag({ name });
    console.log('data', data);
    // 作出响应
    response.status(200).send(data);
  } catch (error) {
    next(error);
  }
};
