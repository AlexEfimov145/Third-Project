// import { NextFunction, Request, Response } from "express";
// import getModel from "../../models/vacations/factory"
// import { StatusCodes, ReasonPhrases } from 'http-status-codes';
// import createHttpError, { NotFound } from "http-errors";
// import config from 'config';
// import vacationDTO from "../../models/vacations/dto";

// function convertVacationTopicUrl(vacation: vacationDTO) {
//     const vacationWithpicUrl = {
//         ...vacation,
//         price: Number(vacation.price),
//         picUrl: `${config.get<string>('app.protocol')}://${config.get<string>('app.host')}:${config.get<number>('app.port')}/images/${vacation.picName}`
//     }
//     delete vacationWithpicUrl.picName;
//     return vacationWithpicUrl;
// }

// export const getAll = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const vacations = await getModel().getAll();
//         res.json(vacations.map(convertVacationTopicUrl));
//     } catch (err) {
//         next(err);
//     }
// }

// export const getOne = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const vacation = await getModel().getOne(+req.params.id);
//         if (!vacation) return next();
//         res.json(convertVacationTopicUrl(vacation));
//     } catch (err) {
//         next(err)
//     }
// }

// export const add = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const vacation = await getModel().add(req.body);
//         const vacationWithpicUrl = {
//             ...vacation,
//             picName: `${config.get<string>('app.protocol')}://${config.get<string>('app.host')}:${config.get<number>('app.port')}/images/${vacation.image}`
//         }
//         delete vacationWithpicUrl.image;
//         res.status(StatusCodes.CREATED).json(convertVacationTopicUrl);
//     } catch (err) {
//         next(err)
//     }
// }


// export const update = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const id = +req.params.id;
//         const updatedVacation = { id, ...req.body };
//         const vacation = await getModel().update(updatedVacation);
//         // res.json(convertVacationTopicUrl(vacation));
//         res.json(vacation);
//     } catch (err) {
//         next(createHttpError(500, "Failed to update vacation."));
//     }
// };


// export const patch = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const id = +req.params.id;
//         const existingVacation = await getModel().getOne(id);
//         const updatedVacation = {...existingVacation, ...req.body};
//         const vacation = await getModel().update(updatedVacation);
//         res.json(convertVacationTopicUrl(vacation));
//     } catch (err) {
//         next(err)
//     }
// }

// export const remove = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const isDeleted = await getModel().delete(+req.params.id)
//         if(!isDeleted) return next(createHttpError(NotFound(`tried to delete unexisting vacation with id ${req.params.id}`)));
//         res.sendStatus(StatusCodes.NO_CONTENT)
//     } catch (err) {
//         next(err)
//     }
// }
// export const getAllByStartDate = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         // Ensure the date string from the params is valid and convert it to a Date object
//         const dateString = req.params.date;
//         const date = new Date(dateString);

//         // Check if the date conversion results in a valid date
//         if (isNaN(date.getTime())) {
//             throw new Error("Invalid date format");
//         }

//         const vacationsByDate = await getModel().getAllByStartDate(date);
//         res.json(vacationsByDate.map(convertVacationTopicUrl));
//     } catch (err) {
//         next(err);
//     }
// };


// export const getAllByBetweenDates = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const vacationsByDate = await getModel().getAllByBetweenDates();
//         res.json(vacationsByDate.map(convertVacationTopicUrl));
//     } catch (err) {
//         next(err)
//     }
// }
import { NextFunction, Request, Response } from "express";
import getModel from "../../models/vacations/factory"
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import createHttpError, { NotFound } from "http-errors";
import config from 'config';
import vacationDTO from "../../models/vacations/dto";

function convertVacationTopicUrl(vacation: vacationDTO) {
    const vacationWithpicUrl = {
        ...vacation,
        price: Number(vacation.price),
        picUrl: `${config.get<string>('app.protocol')}://${config.get<string>('app.host')}:${config.get<number>('app.port')}/images/${vacation.picName}`
    }
    delete vacationWithpicUrl.picName;
    return vacationWithpicUrl;
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacations = await getModel().getAll();
        res.json(vacations.map(convertVacationTopicUrl));
    } catch (err) {
        next(err);
    }
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacation = await getModel().getOne(+req.params.id);
        if (!vacation) return next();
        res.json(convertVacationTopicUrl(vacation));
    } catch (err) {
        next(err)
    }
}

export const add = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacation = await getModel().add(req.body);
        const vacationWithpicUrl = convertVacationTopicUrl(vacation);
        res.status(StatusCodes.CREATED).json(vacationWithpicUrl);
    } catch (err) {
        next(err)
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id;
        const updatedVacation = { id, ...req.body };
        const vacation = await getModel().update(updatedVacation);
        res.json(vacation);
    } catch (err) {
        next(createHttpError(500, "Failed to update vacation."));
    }
};

export const patch = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id;
        const existingVacation = await getModel().getOne(id);
        const updatedVacation = {...existingVacation, ...req.body};
        const vacation = await getModel().update(updatedVacation);
        res.json(convertVacationTopicUrl(vacation));
    } catch (err) {
        next(err)
    }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isDeleted = await getModel().delete(+req.params.id)
        if(!isDeleted) return next(createHttpError(NotFound(`tried to delete unexisting vacation with id ${req.params.id}`)));
        res.sendStatus(StatusCodes.NO_CONTENT)
    } catch (err) {
        next(err)
    }
}
export const getAllByStartDate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dateString = req.params.date;
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            throw new Error("Invalid date format");
        }

        const vacationsByDate = await getModel().getAllByStartDate(date);
        res.json(vacationsByDate.map(convertVacationTopicUrl));
    } catch (err) {
        next(err);
    }
};

export const getAllByBetweenDates = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacationsByDate = await getModel().getAllByBetweenDates();
        res.json(vacationsByDate.map(convertVacationTopicUrl));
    } catch (err) {
        next(err)
    }
}
