import { User } from './user';

export interface UserRepository {
    getUserByEmail(email: string): Promise<User | undefined>;
    isEmailAlreadyUsed(email: string): Promise<boolean>;
    add(user: User): Promise<void>;
}
