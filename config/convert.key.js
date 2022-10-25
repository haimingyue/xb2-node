const fs =require('fs');
const path = require('path');

/**
 * 读取秘钥文件
 */

const privateKey = fs.readFileSync(path.join('config', 'private.key'))
const publicKey = fs.readFileSync(path.join('config', 'public.key'))

/**
 * 转换Base64
 */

const privateKeyBase64 = Buffer.from(privateKey).toString('base64')
const publicKeyBase64 = Buffer.from(publicKey).toString('base64')

/**
 * 输出结果
 */

console.log(privateKeyBase64)
console.log(publicKeyBase64)