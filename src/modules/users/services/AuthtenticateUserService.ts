import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

import {inject, injectable} from 'tsyringe';

interface IRequestDTO {
    email: string;
    password: string;
}

@injectable()
class AuthenticateUserService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository) {
    }

    public async execute({ email, password }: IRequestDTO): Promise<{ user: User, token: string }> {

        const user = await this.usersRepository.findByEmail(email);
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