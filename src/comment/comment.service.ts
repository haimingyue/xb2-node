import { connection } from '../app/database/mysql';
import { CommentModel } from './comment.model';

/**
 * 创建评论
 */

export const createComment = async (comment: CommentModel) => {
  console.log(
    '🚀 ~ file: comment.service.ts ~ line 9 ~ createComment ~ comment',
    comment,
  );
  // 准备sql
  const statement = `
        INSERT INTO comment
        SET ?
    `;

  // 执行查询

  const [data] = await connection.promise().query(statement, comment);

  // 返回结果
  return data;
};

/**
 * 检查评论是否为回复评论
 */

export const isReplyComment = async (commentId: number) => {
  // 准备查询

  const statement = `
        SELECT parentId FROM comment
        WHERE id = ?
    `;

  // 执行查询
  const [data] = await connection.promise().query(statement, commentId);

  return data[0].parentId ? true : false;
};

/**
 * 修改评论
 */

export const updateComment = async (comment: CommentModel) => {
  // 准备数据
  const { id, content } = comment;

  // 准备查询
  const statement = `
    update comment
    set content = ?
    where id = ?
  `;
  // 执行数据
  const [data] = await connection.promise().query(statement, [content, id]);

  // 返回数据
  return data;
};

/**
 * 删除评论
 */

export const deleteComment = async (commentId: number) => {
  // 准备查询
  const statement = `
    DELETE FROM comment
    WHERE id = ?
  `;

  // 执行查询
  const [data] = await connection.promise().query(statement, commentId);
  return data;
};
