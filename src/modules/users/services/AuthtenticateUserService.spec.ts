import 'reflect-metadata';

import AuthtenticateUserService from './AuthtenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRepositories from '../repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError'

describe('Authenticate User', () => {

    it('should be able to authenticate', async () => {
        const fakeUsersRepositories = new FakeUsersRepositories();
        const fakeHashProvider = new FakeHashProvider();

        const authtentictaeUser = new AuthtenticateUserService(fakeUsersRepositories, fakeHashProvider)
        const createUserService = new CreateUserService(fakeUsersRepositories, fakeHashProvider)

        await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '1234'
        })

        const response = await authtentictaeUser.execute({
            email: 'johndoe@example.com',
            password: '1234'
        })

        expect(response).toHaveProperty('token');

    });


    it('should not be able to authenticate with non existing user', async () => {
        const fakeUsersRepositories = new FakeUsersRepositories();
        const fakeHashProvider = new FakeHashProvider();

        const authtentictaeUser = new AuthtenticateUserService(fakeUsersRepositories, fakeHashProvider)

       await expect(authtentictaeUser.execute({
            email: 'johndoe@example.com',
            password: '1234'
        })).rejects.toBeInstanceOf(AppError);

    });


    it('should not be able to authenticate with wrong password', async () => {
        const fakeUsersRepositories = new FakeUsersRepositories();
        const fakeHashProvider = new FakeHashProvider();

        const authtentictaeUser = new AuthtenticateUserService(fakeUsersRepositories, fakeHashProvider)
        const createUserService = new CreateUserService(fakeUsersRepositories, fakeHashProvider)

        await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '1234'
        })

        await  expect(authtentictaeUser.execute({
            email: 'johndoe@example.com',
            password: 'wrong-password',
        })).rejects.toBeInstanceOf(AppError);

    });




})