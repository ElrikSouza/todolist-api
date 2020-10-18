import { sign, verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../../env';
import { AuthenticationError } from '../../error/authentication-error';

interface TokenPayload {
    id: string;
}

export const createToken = (id: string): string => {
    return sign({ id }, JWT_SECRET, { expiresIn: '2d' });
};

export const getIdFromToken = (token: string): string => {
    try {
        const { id } = verify(token, JWT_SECRET) as TokenPayload;

        return id;
    } catch (error) {
        throw new AuthenticationError('Invalid jwt');
    }
};
