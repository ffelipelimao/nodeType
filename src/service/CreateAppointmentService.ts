import { startOfHour } from "date-fns";
import { getCustomRepository } from 'typeorm'

import Appointement from "../models/Appointment";
import AppointmentRepository from "../repositories/AppointmentRepository";

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {

  public async execute({ date, provider }: RequestDTO): Promise<Appointement> {
    const appointmentsRepository = getCustomRepository(AppointmentRepository)

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error("Already booked");
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment)

    return appointment;
  }
}

export default CreateAppointmentService;
