import Appointment from "../entities/Appointment";
import ICreateAppoinment from '@modules/appointments/dtos/ICreateAppointment'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getRepository, Repository } from 'typeorm';


class AppointmentRepository implements IAppointmentsRepository {

  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {

    const findAppointment = await this.ormRepository.findOne({
      where: { date }
    })

    return findAppointment;
  }

  public async create({ date, provider_id }: ICreateAppoinment): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date })

    await this.ormRepository.save(appointment)

    return appointment;
  }
}

export default AppointmentRepository;
