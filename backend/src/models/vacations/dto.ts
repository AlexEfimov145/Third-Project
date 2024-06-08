import { UploadedFile } from "express-fileupload";

export default interface DTO {
    id: number,
    destination: string,
    description: string,
    startDate: Date,
    finishDate: Date,
    price: number,
    image: UploadedFile,
    picName: string,
}