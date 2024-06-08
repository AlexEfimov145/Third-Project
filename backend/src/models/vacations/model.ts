import DTO from "./dto";

export default interface Model {
    getAll(): Promise<DTO[]>;
    getOne(id: number): Promise<DTO>;
    add(vacation: DTO): Promise<DTO>;
    update(vacation: DTO): Promise<DTO>;
    delete(id: number): Promise<boolean>;
    getAllByStartDate(date: Date): Promise<DTO[]>;
    getAllByBetweenDates(): Promise<DTO[]>;
}