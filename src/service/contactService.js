import validate from '../validation/validation.js';
import { PrismaClient } from '@prisma/client';
import ResponseError from '../error/responseError.js';
import { createContactValidation } from '../validation/contactValidation.js';
const prisma = new PrismaClient();
const addContact = async (req) => {
  const contact = validate(createContactValidation, req);
  const result = await prisma.contact.create({
    data: contact,
  });

  return {
    message: 'success',
    data: result,
  };
};

export default { addContact };
