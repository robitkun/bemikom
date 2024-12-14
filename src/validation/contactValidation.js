import Joi from 'joi';

const createContactValidation = Joi.object({
  name: Joi.string().required().max(255),
  email: Joi.string().email().required(),
  message: Joi.string().email().required(),
  is_read: Joi.boolean().required(),
  response: Joi.string().optional(),
  responded_at: Joi.date().optional(),
});
export { createContactValidation };
