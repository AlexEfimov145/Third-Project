import Joi from "joi"
import DTO from "../../models/followers/dto"

export const addFollowerValidator = Joi.object<DTO>({
    userId: Joi.number().required(),
    vacationId: Joi.number().required(),
});