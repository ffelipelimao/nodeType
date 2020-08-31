import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import Appointment from "../../infra/typeorm/entities/Appointment";
import ICreateAppoinment from '@modules/appointments/dtos/ICreateAppointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';



class AppointmentRepository implements IAppointmentsRepository {

    private appointments: Appointment[] = []

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date),
        )
        return findAppointment;
    }

    public async create({ date, provider_id }: ICreateAppoinment): Promise<Appointment> {
        const appointment = new Appointment();

        //Object.assign(appointment, { id: uuid(), date, provider_id })

        appointment.id = uuid();
        appointment.date = date;
        appointment.provider_id = provider_id;

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentRepository;
