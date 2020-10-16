import { compare, genSalt, hash } from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
    return genSalt().then((salt) => hash(password, salt));
};

export const doPasswordsMatch = async (passwordString: string, hashedPassword: string): Promise<boolean> => {
    return compare(passwordString, hashedPassword);
};
