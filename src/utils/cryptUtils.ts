import bcrypt from 'bcrypt';
import Cryptr from 'cryptr';

export function createHash(text: string) {
  const salt = Number(process.env.SALT);
  const crypted = bcrypt.hashSync(text, salt) || null;

  return crypted;
}

export function crypt(text: string) {
  const cryptr = new Cryptr(process.env.SECRET_KEY);
  const encrypted = cryptr.encrypt(text);
  return encrypted;
}

export function decrypt(text: string) {
  const cryptr = new Cryptr(process.env.SECRET_KEY);
  const decrypted = cryptr.decrypt(text);
  return decrypted;
}
