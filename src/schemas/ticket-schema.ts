import Joi from 'joi';

export const schemaTicket = Joi.object({
  ticketTypeId: Joi.number().required,
});
