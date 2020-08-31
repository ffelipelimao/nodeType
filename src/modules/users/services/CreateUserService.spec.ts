import 'reflect-metadata';

import CreateUserService from './CreateUserService';
import FakeUsersRepositories from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError'

describe('Create User', () => {

    it('should be able to create a new user', async () => {
        const fakeUsersRepositories = new FakeUsersRepositories();
        const fakeHashProvider = new FakeHashProvider();

        const createUserService = new CreateUserService(fakeUsersRepositories, fakeHashProvider)

        const user = await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '1234'
        })

        expect(user).toHaveProperty('id');

    });


    it('should not be able to create a new user', async () => {
        const fakeUsersRepositories = new FakeUsersRepositories();
        const fakeHashProvider = new FakeHashProvider();

        const createUserService = new CreateUserService(fakeUsersRepositories, fakeHashProvider)

        await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '1234'
        })

        expect(createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '1234'
        })).rejects.toBeInstanceOf(AppError);

    });


})