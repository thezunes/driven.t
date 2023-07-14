import { notFoundError, unauthorizedError } from '@/errors';
import { CardData, PaymentParams } from '@/protocols';
import * as paymentsRepository from '@/repositories/payment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

export async function getPaymentFromTicket(ticketId: number, userId: number) {
  const userTicket = await ticketsRepository.findTicket(ticketId);

  if (userId !== userTicket.Enrollment.userId) {
    throw unauthorizedError();
  }

  if (!userTicket) {
    throw notFoundError();
  }

  const payment = await paymentsRepository.findPaymentByTicketId(ticketId);

  if (!payment) throw notFoundError();

  return payment;
}

export async function paymentProcess(ticketId: number, userId: number, cardData: CardData) {
  const ticket = await ticketsRepository.findTicket(ticketId);

  if (!ticket) {
    throw notFoundError();
  }
  if (userId !== ticket.Enrollment.userId) {
    throw unauthorizedError();
  }

  const paymentObject: PaymentParams = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const payment = await paymentsRepository.createPayment(ticketId, paymentObject);

  return payment;
}
