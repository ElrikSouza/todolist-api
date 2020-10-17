import { Router } from 'express';
import { db } from '../db';
import { CreateUser } from './actions/create-user';
import { LogIn } from './actions/log-in';
import { AuthController } from './auth-controller';
import { DbUserSerivce } from './db-user-service';

const userRepository = new DbUserSerivce(db);
const createUserAction = new CreateUser(userRepository);
const logInAction = new LogIn(userRepository);
const authController = new AuthController(createUserAction, logInAction);

export const authenticationModule = Router()
    .post('/signup', authController.createUser)
    .post('/login', authController.logIn);
