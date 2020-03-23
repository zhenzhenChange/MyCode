/* 对称加密：加密用的密钥与解密用的密钥相同 */

/* 非对称加密：加密用的密钥与解密用的密钥不相同
 * 1.私钥签名，公钥解密 ==> 数字签名
 * 2.公钥加密，私钥解密 ==> 加密数据
 */

/* Hash加密：
 * 1.不同的输入有不同的输出
 * 2.不能从输出反推出输入
 * 3.长度固定
 */

/**
 * 对称加密
 * @param {*} msg
 */
function encrypt(msg) {
  const buffer = Buffer.from(msg);
  const len = buffer.length;

  for (let i = 0; i < len; i++) {
    buffer[i] = buffer[i] + secret;
  }

  return buffer.toString();
}

/**
 * 对称解密
 * @param {*} msg
 */
function decrypt(msg) {
  const buffer = Buffer.from(msg);
  const len = buffer.length;

  for (let i = 0; i < len; i++) {
    buffer[i] = buffer[i] - secret;
  }

  return buffer.toString();
}

const msg = "abc";
const secret = 3;

const encryptedMsg = encrypt(msg);
const decryptedMsg = decrypt(encryptedMsg);

console.log(encryptedMsg);
console.log(decryptedMsg);
