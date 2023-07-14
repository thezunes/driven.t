import { Request, Response } from 'express';
import httpStatus from 'http-status';
import ticketsService from '../services/tickets-service';
import { AuthenticatedRequest } from '../middlewares/authentication-middleware.js';

export async function getTicketType(req: AuthenticatedRequest, res: Response) {
  try {
    const tickets = await ticketsService.getTicketType();
    return res.status(httpStatus.OK).send(tickets);
  } catch (err) {
    console.log(err);
    return res.status(httpStatus.NO_CONTENT);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const getAllTickets = await ticketsService.getTicketByUserData(userId);
    return getAllTickets ? res.status(httpStatus.OK).send(getAllTickets) : res.sendStatus(httpStatus.NOT_FOUND);
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).send(err.message);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const { userId } = req;

  try {
    await ticketsService.createTicket(ticketTypeId, userId);
    const searchTicketCreated = await ticketsService.getTicketByUserData(userId);
    res.status(httpStatus.CREATED).send(searchTicketCreated);
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).send(err.message);
  }
}
