import { getRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface RequestDTO {
    email: string;
    password: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: RequestDTO): Promise<{ user: User, token: string }> {

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { email }
        })
        if (!user) {
            throw new AppError('Incorret email/password combination', 401)
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorret email/password combination', 401)
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn
        });

        return {
            user,
            token
        }
    }
}

export default AuthenticateUserService;