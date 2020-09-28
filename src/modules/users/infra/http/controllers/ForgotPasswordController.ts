import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmail from '@modules/users/services/SendForgotPasswordEmailService'

export default class ForgotPasswordController {
    async create(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;

        const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmail);

        await sendForgotPasswordEmail.execute({
            email
        })

        return res.status(204).json();
    }
}