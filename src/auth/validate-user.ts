import Joi from 'joi';
import { createValidatorFromSchema } from '../validation/validation-wrapper';
import { UserLogInInfo, UserSignUpInfo } from './user';

const sharedKeys = {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
};

const userSignUpSchema = Joi.object({
    ...sharedKeys,
    username: Joi.string().min(2).max(35).required(),
});

const userLogInSchema = Joi.object({
    ...sharedKeys,
});

export const validateUserSignUpInfo = createValidatorFromSchema<UserSignUpInfo>(userSignUpSchema);
export const validateUserLogInInfo = createValidatorFromSchema<UserLogInInfo>(userLogInSchema);
