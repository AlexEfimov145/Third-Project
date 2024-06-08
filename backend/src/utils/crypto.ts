import { createHmac } from 'crypto';
import userDTO from '../models/auth/user-dto';
import { sign } from 'jsonwebtoken';
import config from 'config';


export function hashPassword(plainTextPassword: string, salt: string): string {
        return createHmac('md5', salt)
            .update(`${plainTextPassword}`) 
            .digest('hex');
}

export function generateJWT(user: userDTO, secret: string, expiresIn: string): string {
    return sign( { user } , secret, { expiresIn })
}
