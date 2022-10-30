// 定义服务方法
import path from 'path';
import Jimp from 'jimp';
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

/**
 * 调整图像尺寸
 */

export const imageResizer = async (image: Jimp, file: Express.Multer.File) => {
  console.log('执行额');
  const { imageSize } = image['_exif'];

  const filePath = path.join(file.destination, 'resized', file.filename);

  if (imageSize.width > 1280) {
    image
      .resize(1280, Jimp.AUTO)
      .quality(85)
      .write(`${filePath}-large`);
  }

  if (imageSize.width > 640) {
    image
      .resize(640, Jimp.AUTO)
      .quality(85)
      .write(`${filePath}-medium`);
  }

  if (imageSize.width > 320) {
    image
      .resize(320, Jimp.AUTO)
      .quality(85)
      .write(`${filePath}-thumbnail`);
  }
};
