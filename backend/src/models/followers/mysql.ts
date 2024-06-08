import { OkPacketParams, RowDataPacket } from "mysql2";
import query from "../../db/mysql";
import DTO from "./dto";
import Model from "./model";

class Follower implements Model {

    public async getAll(): Promise<DTO[]> {
        const followers = (await query(`
            SELECT  userId,
                    vacationId
            FROM    followers  
        `,));
        return followers;
    }
    public async getOne(userId:number): Promise<DTO> {
        const follower = (await query(`
            SELECT userId,
                   vacationId
            FROM   followers
            WHERE userId = ?
        `,[userId]));

        return follower
    }
    public async add(follower: DTO): Promise<DTO> {
        const {userId, vacationId} = follower;
         await query(`
            INSERT INTO followers(userId, vacationId) 
            VALUES(?,?) 
        `, [userId, vacationId]);
        return this.getOne(userId);
    }
    public async delete(follower: DTO): Promise<boolean> {
        const { userId, vacationId } = follower;
        const result: OkPacketParams = await query(`
            DELETE FROM followers
            WHERE       userId = ? AND  vacationId = ?
        `, [userId, vacationId]);
        return Boolean(result.affectedRows);
    }
    public async getAllFollowed(id: number): Promise<DTO[]> {
        const follows = (await query(`
            SELECT userId, vacationId
            FROM   followers
            WHERE  userId = ?
        `, [id]));
        return follows;
    }
    public async getVacationsFollowsCount(id: number): Promise<number> {
        const queryResult: RowDataPacket[] = await query(`
            SELECT COUNT(*) AS followerCount
            FROM               followers
            WHERE              vacationId = ?
        `, [id]);
        const followerCount: number = queryResult[0].followerCount;
        return followerCount;
    }
    public async getAllVacationsFollowing(): Promise<DTO[]> {
        const countedFollows = (await query(`
            SELECT v.destination as Destination,
                   count(f.userId) as Followers
            FROM   vacations AS V
            LEFT JOIN followers AS f on f.vacationId = v.vacationId
            GROUP BY v.vacationId 
        `,));
        return countedFollows;
    }
}

const follower = new Follower
export default follower; 