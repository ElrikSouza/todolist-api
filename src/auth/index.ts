import { Router } from 'express';
import { db } from '../db';
import { SignUp } from './actions/create-user';
import { LogIn } from './actions/log-in';
import { AuthController } from './auth-controller';
import { UserDbService } from './user-db-service';

const userRepository = new UserDbService(db);
const createUserAction = new SignUp(userRepository);
const logInAction = new LogIn(userRepository);
const authController = new AuthController(createUserAction, logInAction);

export const authenticationModule = Router()
    .post('/signup', authController.signUp)
    .post('/login', authController.logIn);
