import { NextFunction, Request, Response } from "express";

export default function addImageToBody(req: Request, res: Response, next: NextFunction) {
    console.log("addImageToBody req.body:", req.body);
    if (req.files?.image) {
        req.body.image = req.files?.image;
    }
    return next();
}