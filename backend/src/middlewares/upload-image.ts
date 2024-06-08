
import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { UploadedFile } from "express-fileupload";
import fs from "fs";
import config from "config";

export default async function uploadImage(req: Request, res: Response, next: NextFunction) {
    if (!req.body.image) return next();

    const image = req.body.image as UploadedFile;
    const imageName = `${uuidv4()}${path.extname(image.name)}`;

    const imagePath = path.join(config.get<string>('app.images.path'), imageName);
    
    try {
        await image.mv(imagePath);
        req.body.picName = imageName;
        delete req.body.image; // Clean up the request body
        next();
    } catch (err) {
        next(err);
    }
}

