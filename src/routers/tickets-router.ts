import { Router } from 'express';
import { authenticateToken, validateBody } from '../middlewares';
import { schemaTicket } from '../schemas/ticket-schema';
import * as ticketsControllers from '@/controllers/tickets-controller';

const ticketRouter = Router();

ticketRouter.post('/', validateBody(schemaTicket), ticketsControllers.createTicket);

ticketRouter.get('/types', authenticateToken, ticketsControllers.getTicketType);

ticketRouter.get('/', authenticateToken, ticketsControllers.getTickets);

export { ticketRouter };
