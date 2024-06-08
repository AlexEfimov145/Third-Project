import Joi from "joi"
import DTO from "../../models/vacations/dto"

export const addVacationValidator = Joi.object<DTO>({
    id: Joi.number().optional(),
    destination: Joi.string().min(4).required(),
    description: Joi.string().min(4).required(),
    startDate: Joi.date().required(),
    finishDate: Joi.date().required(),
    price: Joi.number().min(1).max(10000).required(),
    image: Joi.object({
        mimetype: Joi.string().valid('image/jpg', 'image/jpeg', 'image/png'),
    }).unknown(true).optional()
});

export const putVacationValidator = addVacationValidator;

export const patchVacationValidator = Joi.object<DTO>({
    id: Joi.number().optional(),
    destination: Joi.string().min(4),
    description: Joi.string().min(4),
    startDate: Joi.date(),
    finishDate: Joi.date(),
    price: Joi.number().min(1).max(10000),
    image: Joi.object({
        mimetype: Joi.string().valid('image/jpg', 'image/jpeg', 'image/png'),
    }).unknown(true).optional()
}).error(errors => {
    console.log("Validation errors:", errors);
    return errors;
});