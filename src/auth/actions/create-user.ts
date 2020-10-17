import { v4 } from 'uuid';
import { Action } from '../../action';
import { InputNotAllowedError } from '../../error/input-not-allowed';
import { hashPassword } from '../hashing';
import { UserSignUpInfo } from '../user';
import { UserRepository } from '../user-repository';
import { validateUserSignUpInfo } from '../validate-user';

export interface CreateUserResult {
    msg: string;
}

export class CreateUser implements Action<CreateUserResult> {
    private userRepository: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepository = userRepo;
    }

    run = async (user: UserSignUpInfo): Promise<CreateUserResult> => {
        validateUserSignUpInfo(user);

        const emailAlreadyTaken = await this.userRepository.isEmailAlreadyUsed(user.email);
        if (emailAlreadyTaken) {
            throw new InputNotAllowedError('Email has already been taken');
        }

        const passwordHash = await hashPassword(user.password);

        await this.userRepository.add({ ...user, password: passwordHash, id: v4() });
        return { msg: 'User has been created' };
    };
}
