import jwt from 'jsonwebtoken';
import { connection } from '../app/database/mysql';
import { PRIVATE_KEY } from '../app/app.config';

/**
 * 签发令牌
 */
interface SignTokenOptions {
  payload?: any;
}

export const signToken = (options: SignTokenOptions) => {
  // 准备选项
  const { payload } = options;
  // 签发JWT
  const token = jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256' });
  // 提供令牌
  return token;
};

/**
 * 检查用户是否拥有指定资源
 */

interface PossessOptions {
  resourceId: Number;
  resourceType: string;
  userId: number;
}

export const possess = async (options: PossessOptions) => {
  const { resourceId, resourceType, userId } = options;
  console.log('resourceId', resourceId);
  console.log('resourceType', resourceType);
  console.log('userId', userId);
  console.log(
    '🚀 ~ file: auth.service.ts ~ line 36 ~ possess ~ userId',
    userId,
  );
  const statement = `
    select count(${resourceType}.id) as count
    from ${resourceType}
    where ${resourceType}.id = ? and userId = ?
  `;

  const [data] = await connection
    .promise()
    .query(statement, [resourceId, userId]);

  console.log('data', data);

  return data[0].count ? true : false;
};
