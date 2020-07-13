import { startOfHour } from "date-fns";

import Appointement from "../models/Appointment";
import AppointmentRepository from "../repositories/AppointmentRepository";

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor(appointmentsRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentsRepository;
  }

  public execute({ date, provider }: RequestDTO): Appointement {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw Error("Already booked");
    }

    const appointment = this.appointmentRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
