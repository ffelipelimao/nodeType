import 'reflect-metadata';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepositories from '../repositories/fakes/FakeAppointmentRepository'
import AppError from '@shared/errors/AppError'

describe('Create Appointment', () => {

    it('should be able to create a new appointment', async () => {
        const fakeAppointmentsRepositories = new FakeAppointmentsRepositories();
        const createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepositories)

        const appointment = await createAppointmentService.execute({
            date: new Date,
            provider_id: '123123'
        })

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('123123');

    });

    it('should not be able to create a new appointment', async () => {

        const fakeAppointmentsRepositories = new FakeAppointmentsRepositories();
        const createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepositories)

        const appointmentDate = new Date(2020, 4, 10, 11);

        await createAppointmentService.execute({
            date: appointmentDate,
            provider_id: '123123'
        })

        expect(createAppointmentService.execute({
            date: appointmentDate,
            provider_id: '123123'
        }),
        ).rejects.toBeInstanceOf(AppError)

    })

})