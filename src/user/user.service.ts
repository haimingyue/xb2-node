import { connection } from '../app/database/mysql';
import { UserModel } from './user.model';

/**
 * 把用户数据存储在数据仓库中
 */

export const createUser = async (user: UserModel) => {
  // 准备查询
  const statement = `
    insert into user
    set ?
  `;
  // 执行查询
  const [data] = await connection.promise().query(statement, user);

  // 提供数据
  return data;
};

/**
 * 按用户名查找用户
 */
export const getUserByName = async (name: string) => {
  // 准备查询
  const statement = `
        select id, name
        from user
        where name = ?
    `;
  // 执行查询
  const [data] = await connection.promise().query(statement, name);
  // 提供数据
  return data[0];
};
