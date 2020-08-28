import User from "../entities/User";
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';


class UsersRepository implements IUsersRepository {

  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {

    const findUser = await this.ormRepository.findOne({
      where: { email }
    })

    return findUser;
  }


  public async findById(id: string): Promise<User | undefined> {

    const findUser = await this.ormRepository.findOne(id);

    return findUser;
  }

  public async create({email,name,password }: ICreateUserDTO): Promise<User> {
    const User = this.ormRepository.create({ email,name,password})

    await this.ormRepository.save(User)

    return User;
  }

  public async save(user: User): Promise<User>{
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
