import express from 'express';
import { clerkMiddleware,requireAuth } from '@clerk/express';

import { cancelServiceAppointment, confirmPayment, createServiceAppointment, getServiceAppointmentById, getServiceAppointments, getServiceAppointmentsByPatient, getServiceAppointmentStats, updateServiceAppointment } from '../controllers/ServiceAppointmentContoller.js';

const serviceAppointmentRouter = express.Router();

serviceAppointmentRouter.get('/',getServiceAppointments);
serviceAppointmentRouter.get('/confirm',confirmPayment);
serviceAppointmentRouter.get('/stats/summary',getServiceAppointmentStats);

serviceAppointmentRouter.post('/',clerkMiddleware(),requireAuth(),createServiceAppointment);
serviceAppointmentRouter.get('/me',getServiceAppointmentsByPatient);
serviceAppointmentRouter.get('/:id',getServiceAppointmentById);

serviceAppointmentRouter.put('/:id',updateServiceAppointment);
serviceAppointmentRouter.post('/:id/cancel',cancelServiceAppointment);

export default serviceAppointmentRouter;