import { startOfHour } from "date-fns";
import {injectable, inject} from 'tsyringe';

import Appointement from "../infra/typeorm/entities/Appointment";
import AppointmentRepository from "../infra/typeorm/repositories/AppointmentRepository";
import AppError from '@shared/errors/AppError';
import IAppointemnsRepository from '../repositories/IAppointmentsRepository'

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointemnsRepository
    )
    {}

  public async execute({ date, provider_id }: IRequestDTO): Promise<Appointement> {

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError("Already booked");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
