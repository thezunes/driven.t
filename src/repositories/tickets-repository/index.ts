import { TicketType } from '@prisma/client';
import { prisma } from '../../config';

async function findTicketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function findTicket(ticketId: number) {
  return prisma.ticket.findFirst({
    where: { id: ticketId },
    include: { Enrollment: true, TicketType: true },
  });
}

async function createTicket(ticketTypeId: number, enrollmentId: number) {
  return prisma.ticket.create({
    data: {
      ticketTypeId,
      enrollmentId,
      status: 'RESERVED',
    },
  });
}

export default {
  findTicketTypes,
  createTicket,
  findTicket,
};
