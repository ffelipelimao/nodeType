import { parseISO } from "date-fns";
import { container } from 'tsyringe';

import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";
import {Request, Response} from 'express';

export default class AppointmentController{
     async create (req: Request, res: Response): Promise<Response> {
        const { provider_id, date } = req.body;
        
        const parsedDate = parseISO(date);
      
        const creteAppointment = container.resolve(CreateAppointmentService);
      
        const appointment = await creteAppointment.execute({
          date: parsedDate,
          provider_id,
        });
      
        return res.json(appointment);
      };
}