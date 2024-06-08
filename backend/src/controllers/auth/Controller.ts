
import { NextFunction, Request, Response } from "express";
import getModel from "../../models/auth/factory";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import { generateJWT } from "../../utils/crypto";
import config from 'config';
import createHttpError from "http-errors";


export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const user = await getModel().signup(req.body);
    const jwt = generateJWT(user, config.get<string>('app.jwt.secret'), config.get<string>('app.jwt.expires'));
    res.status(StatusCodes.CREATED).json({ jwt });
    } catch (err) {
        if (err.message === 'Email already exists') {
            return next(createHttpError(StatusCodes.CONFLICT, err.message));
        }
        console.error(err);
        next(createHttpError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to sign up."));
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getModel().login(req.body);
        if (!user) {
            return next(createHttpError(StatusCodes.UNAUTHORIZED, "Invalid email or password."));
        }
        const jwt = generateJWT(user, config.get<string>('app.jwt.secret'), config.get<string>('app.jwt.expires'));
        res.json({ jwt });
    } catch (err) {
        console.error(err);
        next(createHttpError(StatusCodes.INTERNAL_SERVER_ERROR, "An error occurred during login."));
    }
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Extracting id from URL parameters
        const id = parseInt(req.params.id);
        console.log(`Parsed ID: ${id}`);  // Log the parsed ID to check its validity

        if (isNaN(id)) {
            // If id is not a valid number, return an error response
            return res.status(400).send('Invalid ID provided');
        }

        const isAdminResult = await getModel().isAdmin(id);
        res.json({ isAdmin: isAdminResult });
    } catch (err) {
        next(err);
    }
};
