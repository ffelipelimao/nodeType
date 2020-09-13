import 'reflect-metadata';

import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersRepositories from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/providers/MailProvider/fakes/FakeMailProvider';

import AppError from '@shared/errors/AppError'

describe('Send forgot password email', () => {

    it('should be able to recover the password using the email', async () => {
        const fakeUsersRepositories = new FakeUsersRepositories();
        const fakeMailProvider = new FakeMailProvider();

        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(fakeUsersRepositories, fakeMailProvider)

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

        await fakeUsersRepositories.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@example.com',
        })

        expect(sendMail).toHaveBeenCalled();

    });



})