import { Ticket } from '@prisma/client';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';

async function getTicketByUserData(userId: number): Promise<Ticket> {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket: Ticket = await ticketsRepository.findTicket(userId);
  if (!ticket) throw notFoundError();
  return ticket;
}

async function getTicketType() {
  const ticketType = await ticketsRepository.findTicketTypes();

  return ticketType.length === 0 ? ticketType : [];
}

async function createTicket(ticketTypeId: number, userId: number) {
  if (!ticketTypeId) throw notFoundError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.createTicket(ticketTypeId, enrollment.id);
  return ticket;
}

const ticketsService = {
  getTicketByUserData,
  getTicketType,
  createTicket,
};

export default ticketsService;
