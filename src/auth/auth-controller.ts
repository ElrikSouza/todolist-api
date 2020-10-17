import { Action } from '../action';
import { wrapWithErrorHandling } from '../http-helpers/error-handler';
import { CreateUserResult } from './actions/create-user';
import { LogInResult } from './actions/log-in';

export class AuthController {
    private createUserAction: Action<CreateUserResult>;
    private logInAction: Action<LogInResult>;

    constructor(createUserAction: Action<CreateUserResult>, logInAction: Action<LogInResult>) {
        this.createUserAction = createUserAction;
        this.logInAction = logInAction;
    }

    public createUser = wrapWithErrorHandling(async (request, response) => {
        const result = await this.createUserAction.run(request.body);
        return response.status(201).json(result);
    });

    public logIn = wrapWithErrorHandling(async (request, response) => {
        const result = await this.logInAction.run(request.body);
        return response.status(200).json(result);
    });
}
