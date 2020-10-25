import { Action } from '../action';
import { wrapWithErrorHandling } from '../http-helpers/error-handler';
import { SignUpResult } from './actions/create-user';
import { LogInResult } from './actions/log-in';

export class AuthController {
    private signUpAction: Action<SignUpResult>;
    private logInAction: Action<LogInResult>;

    constructor(createUserAction: Action<SignUpResult>, logInAction: Action<LogInResult>) {
        this.signUpAction = createUserAction;
        this.logInAction = logInAction;
    }

    public signUp = wrapWithErrorHandling(async (request, response) => {
        const result = await this.signUpAction.run(request.body);
        return response.status(201).json(result);
    });

    public logIn = wrapWithErrorHandling(async (request, response) => {
        const result = await this.logInAction.run(request.body);
        return response.status(200).json(result);
    });
}
