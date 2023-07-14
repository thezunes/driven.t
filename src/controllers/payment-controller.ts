import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '../middlewares/authentication-middleware.js';
import * as paymentsService from '@/services/payments-service';

export async function getPaymentById(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId, cardData } = req.query;

  if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const payment = await paymentsService.paymentProcess(ticketId, cardData, userId);

    if (!payment) return res.sendStatus(httpStatus.UNAUTHORIZED);
    if (!payment) return res.sendStatus(httpStatus.NOT_FOUND);

    res.status(httpStatus.OK).send(payment);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
}

export async function paymentProcess(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId, cardData } = req.body;

  try {
    const payment = await paymentsService.paymentProcess(ticketId, cardData, userId);

    if (!payment) return res.sendStatus(httpStatus.NOT_FOUND);

    res.status(httpStatus.OK).send(payment);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
}
