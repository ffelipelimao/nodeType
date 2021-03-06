import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import UsersTokenRepository from '@modules/users/infra/typeorm/repositories/UsersTokenRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IUserTokenRepository>('UsersTokenRepository', UsersTokenRepository);