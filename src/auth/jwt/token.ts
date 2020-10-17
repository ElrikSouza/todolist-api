import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../../env';

export const createToken = (id: string): string => {
    return sign({ id }, JWT_SECRET, { expiresIn: '2d' });
};
