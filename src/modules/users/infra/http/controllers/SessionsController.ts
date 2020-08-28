import {Request, Response} from 'express';
import {container} from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthtenticateUserService'

export default class SessionsController{
    async create(req: Request,res: Response): Promise<Response>{
        const { email, password } = req.body;
    
        const authenticateUserService = container.resolve(AuthenticateUserService);
    
        const { user, token } = await authenticateUserService.execute({
            email, password
        })
    
        delete user.password;
    
        return res.json({ user, token });
    }
}