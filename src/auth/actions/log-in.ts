import { Action } from '../../action';
import { AuthenticationError } from '../../error/authentication-error';
import { ResourceNotFound } from '../../error/resource-not-found';
import { doPasswordsMatch } from '../hashing';
import { createToken } from '../jwt/token';
import { UserLogInInfo } from '../user';
import { UserRepository } from '../user-repository';
import { validateUserLogInInfo } from '../validate-user';

export interface LogInResult {
    token: string;
}

export class LogIn implements Action<LogInResult> {
    private userRepository: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepository = userRepo;
    }

    public run = async (user: UserLogInInfo): Promise<LogInResult> => {
        validateUserLogInInfo(user);
        const storedUser = await this.userRepository.getUserByEmail(user.email);

        if (storedUser == null) {
            throw new ResourceNotFound('Requested user does not exist');
        }

        const isPasswordCorrect = await doPasswordsMatch(user.password, storedUser.password);
        if (!isPasswordCorrect) {
            throw new AuthenticationError('Wrong password');
        }

        const token = createToken(storedUser.id);

        return { token };
    };
}
