import { startOfHour } from "date-fns";
import { getCustomRepository } from 'typeorm'

import Appointement from "../models/Appointment";
import AppointmentRepository from "../repositories/AppointmentRepository";
import AppError from '../errors/AppError';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {

  public async execute({ date, provider_id }: RequestDTO): Promise<Appointement> {
    const appointmentsRepository = getCustomRepository(AppointmentRepository)

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError("Already booked");
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment)

    return appointment;
  }
}

export default CreateAppointmentService;
