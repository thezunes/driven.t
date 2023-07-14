import { prisma } from '@/config';
import { PaymentParams } from '@/protocols';

export async function findPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

export async function ticketProcessPayment(ticketId: number, params: PaymentParams) {
  return prisma.payment.create({
    data: {
      ticketId,
      ...params,
    },
  });
}

export async function createPayment(ticketId: number, value: number, cardIssuer: string, cardLastDigits: string) {
  return prisma.ticket.update({
    where: { id: ticketId },
    data: { status: 'PAID', Payment: { create: { value, cardIssuer, cardLastDigits } } },
    include: { Payment: true },
  });
}

export async function getPaymentFromTicket(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}
