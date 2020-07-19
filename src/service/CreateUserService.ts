import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';

import { hash } from 'bcryptjs';

interface RequestDTO {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {

    public async execute({ name, email, password }: RequestDTO): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUsersExists = await usersRepository.findOne({
            where: { email }
        })

        if (checkUsersExists) {
            throw new AppError('Email address already used')
        }

        const hashedPassword = await hash(password, 8)

        const user = usersRepository.create({
            name, email, password: hashedPassword,
        })

        await usersRepository.save(user);

        return user;

    }

} export default CreateUserService;