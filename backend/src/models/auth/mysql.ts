import Model from "./model";
import CredentialsDTO from './credentials-dto';
import UserDTO, { userType } from './user-dto';
import { OkPacketParams } from "mysql2";
import query from "../../db/mysql";
import config from "config";
import { hashPassword } from "../../utils/crypto";
import mysql from 'mysql2';


class User implements Model {

    public async getOne(id: number): Promise<UserDTO> {
        const user = (await query(`
            SELECT  id,
                    firstName,
                    lastName,
                    email,
                    password,
                    userType
            FROM    users  
            WHERE   id = ?
        `, [id]))[0];
        return user;
    }

    public async login(credentials: CredentialsDTO): Promise<UserDTO> {
        const { email, password } = credentials;
        const user = (await query(`
            SELECT  id,
                    firstName,
                    lastName,
                    email,
                    password,
                    userType
            FROM    users  
            WHERE   email = ?
            AND     password = ?
        `,[ email, hashPassword(password, config.get<string>('app.secret'))]))[0];
        return user;
    }


    public async signup(user: UserDTO): Promise<UserDTO> {
        const { firstName, lastName, email, password } = user;

        const existingUser = await query(`
            SELECT email FROM users WHERE email = ?
        `, [email]);

        if (existingUser.length > 0) {
            throw new Error('Email already exists');
        }

        
        const hashedPassword = hashPassword(password, config.get<string>('app.secret'));
        const result = await query(`
            INSERT INTO users (firstName, lastName, email, password, userType)
            VALUES (?, ?, ?, ?, ?)
        `, [firstName, lastName, email, hashedPassword,userType.USER]);

        return this.getOne(result.insertId);
    }
  
    public async isAdmin(id: number): Promise<boolean> {
        try {
            console.log("ID passed to isAdmin:", id);
            const result = await query(`
                SELECT userType
                FROM users
                WHERE id = ?
            `, [id]);
            
            const user: UserDTO = result[0];
            return user?.userType === userType.ADMIN;
        } catch (error) {
            console.error("Error in isAdmin function:", error);
            throw new Error("Failed to check if user is admin.");
        }
    }
}

const user = new User();
export default user;