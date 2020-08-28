import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import {inject, injectable} from 'tsyringe';

import { hash } from 'bcryptjs';

interface IRequestDTO {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository) {
    }

    public async execute({ name, email, password }: IRequestDTO): Promise<User> {

        const checkUsersExists = await this.usersRepository.findByEmail(email);

        if (checkUsersExists) {
            throw new AppError('Email address already used')
        }

        const hashedPassword = await hash(password, 8)

        const user = await this.usersRepository.create({
            name, email, password: hashedPassword,
        })

        return user;

    }

} export default CreateUserService;