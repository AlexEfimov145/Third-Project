import { NextFunction, Request, Response } from "express";
import getModel from "../../models/followers/factory"
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import createHttpError, { NotFound } from "http-errors";
import { json2csv } from "json-2-csv";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const followers = await getModel().getAll();
        res.json(followers);
    } catch (err) {
        next(err)
    }
}
export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).send("Invalid ID provided");
        }
        const follower = await getModel().getOne(id);
        if (!follower) {
            return next(createHttpError(404, "Follower not found"));
        }
        res.json(follower);
    } catch (err) {
        next(err);
    }
};
export const add = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, vacationId } = req.body;
    console.log("Attempting to add follower with data:", req.body);
    if (!userId || userId <= 0 || !vacationId || vacationId <= 0) {
        return res.status(400).json({ message: "Invalid userId or vacationId provided." });
    }
    try {
        const follower = await getModel().add(req.body);
        console.log("Follower added successfully:", follower);
        res.status(StatusCodes.CREATED).json(follower);
    } catch (err) {
        console.error("Error in adding follower:", err);
        next(err);
    }
}
export const remove = async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.userId, 10);
    const vacationId = parseInt(req.params.vacationId, 10);

    if (isNaN(userId) || isNaN(vacationId)) {
        return next(createHttpError(400, "Invalid userId or vacationId"));
    }

    try {
        const isDeleted = await getModel().delete({ userId, vacationId });
        if (!isDeleted) {
            return next(createHttpError(404, "Follower not found"));
        }
        res.sendStatus(StatusCodes.NO_CONTENT);
    } catch (err) {
        next(err);
    }
};
export const getAllFollowed = async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
        return next(createHttpError(400, "Invalid userId"));
    }

    try {
        const follows = await getModel().getAllFollowed(userId);
        if (follows.length === 0) {
            return next(createHttpError(404, "No follows found for the user"));
        }
        res.json(follows);
    } catch (err) {
        next(err);
    }
};
export const getVacationsFollowsCount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const followers = await getModel().getVacationsFollowsCount(+req.params.id);
        res.json(followers);
    } catch (err) {
        next(err)
    }
}

export const getAllVacationsFollowing = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const countedFollows = await getModel().getAllVacationsFollowing();
        res.json(countedFollows);
    } catch (err) {
        next(err)
    }
}
