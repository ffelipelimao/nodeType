import UserToken from "../../infra/typeorm/entities/UserToken";

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import { uuid } from "uuidv4";



class UserTokenRepository implements IUserTokenRepository {

    private usersToken: UserToken[]= [];
    
    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken
        
        Object.assign(userToken,{
            id:uuid(),
            token:uuid(),
            user_id,
        })
        
        this.usersToken.push(userToken)
        
        return userToken;
    }

}

export default UserTokenRepository;
