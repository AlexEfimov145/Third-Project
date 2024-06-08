import { OkPacketParams } from "mysql2";
import query from "../../db/mysql";
import DTO from "./dto";
import Model from "./model";

class Vacation implements Model {
    public async getAll(): Promise<DTO[]> {
        const vacations = await query(`
            SELECT  id,
                    destination,
                    description,
                    startDate,
                    finishDate,
                    price,
                    picName
            FROM    vacations
            ORDER BY startDate ASC
        `)
        return vacations;
    }

    public async getOne(id: number): Promise<DTO> {
        const vacation = await query(`
            SELECT  id,
                    destination,
                    description,
                    startDate,
                    finishDate,
                    price,
                    picName
            FROM    vacations  
            WHERE   id = ?
        `, [id]);
        return vacation[0];
    }

    public async add(vacation: DTO): Promise<DTO> {
        const {destination, description, startDate,finishDate,price, picName} = vacation;
        const result: OkPacketParams = await query(`
            INSERT INTO vacations(destination,description,startDate,finishDate,price, picName) 
            VALUES(?,?,?,?,?,?) 
        `, [destination, description, startDate,finishDate,price, picName]);
        return this.getOne(result.insertId);
    }


    public async  update(vacation: DTO): Promise<DTO> {
        const { id, destination, description, startDate, finishDate, price, picName } = vacation;
        await query(`
            UPDATE vacations
            SET destination = ?, 
                description = ?,
                startDate = ?,
                finishDate = ?,
                price = ?,
                picName = ?
            WHERE id = ?
        `, [destination, description, startDate, finishDate, price, picName, id]);
        return this.getOne(id);
    }

    public async delete(id: number): Promise<boolean> {
        const result: OkPacketParams = await query(`
            DELETE FROM vacations
            WHERE       id = ?
        `, [id]);
        return Boolean(result.affectedRows) ;
    }
    public async getAllByStartDate(date: Date): Promise<DTO[]> {
        const vacations = await query(`
            SELECT  id,
                    destination,
                    description,
                    startDate,
                    finishDate,
                    price,
                    picName
            FROM    vacations  
            WHERE   startDate >= ?
        `, [date]);
        return vacations;
    }

    public async getAllByBetweenDates(): Promise<DTO[]> {
        const vacations = await query(`
            SELECT id,
                   destination,
                   description,
                   startDate,
                   finishDate,
                   price,
                   picName
            FROM vacations  
            WHERE CURRENT_DATE BETWEEN startDate AND finishDate;
        `)
        return vacations;
    }
}

const vacation = new Vacation();
export default vacation;