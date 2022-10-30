// 定义服务方法

import { connection } from '../app/database/mysql';
import { FileModel } from './file.model';

/**
 * 存储文件信息
 */
export const createFile = async (file: FileModel) => {
  const statement = `
        INSERT INTO file
        SET ?
    `;

  const [data] = await connection.promise().query(statement, file);
  return data;
};

/**
 * 按 ID 查找数据
 */

export const findFileById = async (fileId: number) => {
  const statement = `
        SELECT * FROM file
        where id = ?
    `;

  // 执行查询条件
  const [data] = await connection.promise().query(statement, fileId);

  return data[0];
};
