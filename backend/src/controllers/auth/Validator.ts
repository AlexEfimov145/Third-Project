import Joi from "joi"
import UserDTO from '../../models/auth/user-dto';
import CredentialsDTO from '../../models/auth/credentials-dto';


const emailValidation = Joi.string().email().required();

export const signupValidator = Joi.object<UserDTO>({
    email: emailValidation,
    password: Joi.string().min(4).required(),
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required()
});

export const loginValidator = Joi.object<CredentialsDTO>({
    email: emailValidation,
    password: Joi.string().min(4).required(),
});
