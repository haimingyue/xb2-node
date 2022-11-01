import { connection } from '../app/database/mysql';
import { TagModel } from './tag.model';

/**
 * 创建标签
 */

export const createTag = async (tag: TagModel) => {
  // 准备查询sql
  const statement = `
        INSERT INTO tag
        SET ?
    `;

  // 执行查询
  const [data] = connection.promise().query(statement, tag);
  // 返回数据
  return data as any;
};
