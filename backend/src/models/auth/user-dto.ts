import CredentialsDTO from './credentials-dto';

export default interface DTO extends CredentialsDTO{
    id: number;
    firstName: string;
    lastName: string;
    userType: userType;
}

export enum userType {
    USER = 1,
    ADMIN = 2
}