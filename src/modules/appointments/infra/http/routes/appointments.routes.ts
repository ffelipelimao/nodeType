import { Router } from "express";
import { parseISO } from "date-fns";

import { getCustomRepository } from 'typeorm'

import AppointmentRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentRepository";
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth'

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentsRouter.use(ensureAuth);

//appointmentsRouter.get("/", async (req, res) => {

// const appointments = await appointmentRepository.find();

//return res.json(appointments);
//});

appointmentsRouter.post("/", async (req, res) => {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);

  const creteAppointment = new CreateAppointmentService(appointmentRepository);

  const appointment = await creteAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return res.json(appointment);
});

export default appointmentsRouter;
