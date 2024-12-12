import { PrismaClient } from '@prisma/client';
import validate from '../validation/validation.js';
import { createEventValidation } from '../validation/eventValidation.js';
const prisma = new PrismaClient();
const createEvent = async (req, imageUrl) => {
  const event = validate(createEventValidation, req);

  const result = await prisma.event.create({
    data: {
      title: event.title,
      description: event.description,
      location: event.location,
      event_date: event.event_date,
      image_url: imageUrl,
    },
  });
  return result;
};

export default { createEvent };
