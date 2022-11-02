import { connection } from '../app/database/mysql';
import { PostModel } from './post.model';
/**
 * 获取内容列表
 */
export const getPosts = async () => {
  const statement = `
    SELECT 
      post.id,
			post.title,
			post.content,
			JSON_OBJECT(
				'id', user.id,
				'name', user.name
			) as user
    FROM post
    LEFT JOIN user on user.id = post.userId
    `;
  const [data] = await connection.promise().query(statement);
  return data;
};

/**
 * 创建内容
 */
export const createPost = async (post: PostModel) => {
  // 准备一段查询
  const statement = `
		INSERT INTO post
		SET ? 
	`;
  const [data] = await connection.promise().query(statement, post);

  // 返回结果
  return data;
};

/**
 * 更新内容
 */

export const updatePost = async (postId: number, post: PostModel) => {
  // 准备一段查询
  const statement = `
		UPDATE post
		SET ?
		WHERE id=? 
	`;
  // 执行查询
  const [data] = await connection.promise().query(statement, [post, postId]);

  // 返回数据
  return data;
};

/**
 * 删除内容
 */

export const deletePost = async (postId: number) => {
  // 准备一段查询
  const statement = `
		DELETE FROM post
		WHERE id=? 
	`;
  // 执行查询
  const [data] = await connection.promise().query(statement, postId);

  // 返回数据
  return data;
};

/**
 * 保存标签内容
 */

export const createPostTag = async (postId: number, tagId: number) => {
  // 准备查询
  const statement = `
    INSERT INTO post_tag (postId, tagId)
    VALUES (?, ?)
  `;
  // 执行查询
  const [data] = await connection.promise().query(statement, [postId, tagId]);

  // 返回数据
  return data;
};

/**
 * 检查内容标签
 */

export const postHasTag = async (postId: number, tagId: number) => {
  // 准备查询
  const statement = `
    SELECT * FROM post_tag
    WHERE postId = ? AND tagId = ?
  `;
  const [data] = await connection.promise().query(statement, [postId, tagId]);
  return data[0] ? true : false;
};

/**
 * 移除内容标签
 */

export const deletePostTag = async (postId: number, tagId: number) => {
  // 准备查询
  const statement = `
    DELETE FROM post_tag
    WHERE postId = ? and tagId = ?
  `;
  // 执行
  const [data] = await connection.promise().query(statement, [postId, tagId]);

  // 提供数据
  return data;
};
