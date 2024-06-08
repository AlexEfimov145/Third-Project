import DTO from './dto';

export default interface Model {
    getAll(): Promise<DTO[]>
    getOne(userId:number): Promise<DTO>;
    add(follower: DTO): Promise<DTO>;
    delete(follower:DTO): Promise<boolean>
    getAllFollowed(id:number): Promise<DTO[]>
    getVacationsFollowsCount(id: number): Promise<number>;
    getAllVacationsFollowing(): Promise<DTO[]>
}