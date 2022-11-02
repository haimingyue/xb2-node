import { connection } from '../app/database/mysql';
import { TagModel } from './tag.model';

/**
 * 创建标签
 */

export const createTag = async (tag: TagModel) => {
  console.log('🚀 ~ file: tag.service.ts ~ line 9 ~ createTag ~ tag', tag);
  // 准备查询sql
  const statement = `
        INSERT INTO tag
        SET ?
    `;

  // 执行查询
  const [data] = await connection.promise().query(statement, tag);
  // 返回数据
  return data as any;
};

/**
 * 根据标签名字查找标签
 */

export const getTagByTagName = async (tagName: string) => {
  // 准备查询
  const statement = `
        SELECT id, name FROM tag
        WHERE name = ?
    `;
  // 执行查询
  const [data] = await connection.promise().query(statement, tagName);
  // 返回数据
  return data[0];
};
