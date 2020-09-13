import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider'

import IHashProvider from '../providers/HashProvider/models/IHashProvider'


interface IRequestDTO {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) { }

    public async execute({ email }: IRequestDTO): Promise<void> {
        this.mailProvider.sendMail(email, 'Pedido de recuperação de senha recebido')
    }

} export default SendForgotPasswordEmailService;