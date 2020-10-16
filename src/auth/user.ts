export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
}

export type UserLogInInfo = Pick<User, 'email' | 'password'>;
export type UserSignUpInfo = Pick<User, 'email' | 'username' | 'password'>;
