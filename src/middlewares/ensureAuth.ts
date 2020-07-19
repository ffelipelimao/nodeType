import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface tokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuth(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError('missing token', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decode = verify(token, authConfig.jwt.secret)

        const { sub } = decode as tokenPayload;

        req.user = {
            id: sub,
        }

        console.log(decode)
        return next();

    } catch (err) {
        throw new AppError('invalid token', 401);
    }
}