import { Router } from "express";
import { parseISO } from "date-fns";

import { getCustomRepository } from 'typeorm'

import AppointmentRepository from "../repositories/AppointmentRepository";
import CreateAppointmentService from "../service/CreateAppointmentService";
import ensureAuth from '../middlewares/ensureAuth'

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuth);

appointmentsRouter.get("/", async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);

  const appointments = await appointmentRepository.find();

  return res.json(appointments);
});

appointmentsRouter.post("/", async (req, res) => {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);

  const creteAppointment = new CreateAppointmentService();

  const appointment = await creteAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  return res.json(appointment);
});

export default appointmentsRouter;
