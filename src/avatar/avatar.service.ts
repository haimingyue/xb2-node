import { connection } from '../app/database/mysql';
import { AvatarModel } from './avatar.model';

/**
 * 保存头像文件信息
 */

export const createAvatar = async (avatar: AvatarModel) => {
  const statement = `
        INSERT INTO avatar
        SET ?
    `;

  const [data] = await connection.promise().query(statement, avatar);

  return data;
};

/**
 * 按照用户Id查找头像
 */

export const findAvatarByUserId = async (userId: number) => {
  // 准备查询语句
  const statement = `
        SELECT *
        FROM avatar
        WHERE userId = ?
        ORDER BY avatar.id DESC
        LIMIT 1
    `;
  const [data] = await connection.promise().query(statement, userId);

  // 提供数据
  return data[0];
};
