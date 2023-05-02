import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { jwtKey } from '../config/jwt.config';

@Injectable()
export class CryptoService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly ivLength = 16;
  private readonly key = jwtKey.aes_secret;

  encrypt(text: string): string {
    console.log(text);
    console.log(this.key.length);
    const iv = randomBytes(this.ivLength);
    const cipher = createCipheriv(this.algorithm, this.key, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    console.log(iv.toString('hex') + ':' + encrypted.toString('hex'));
    return iv.toString('hex') + ':' + encrypted.toString('hex');
  }

  decrypt(text: string): string {
    const [ivString, encryptedString] = text.split(':');
    const iv = Buffer.from(ivString, 'hex');
    const encrypted = Buffer.from(encryptedString, 'hex');
    const decipher = createDecipheriv(this.algorithm, this.key, iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    console.log(decrypted.toString());
    return decrypted.toString();
  }
}
