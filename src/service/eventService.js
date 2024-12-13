import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import validate from '../validation/validation.js';
import {
  createEventValidation,
  updateEventValidation,
} from '../validation/eventValidation.js';
import ResponseError from '../error/responseError.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
const getEventById = async (idEvent) => {
  const event = await prisma.event.findUnique({
    where: {
      id: idEvent,
    },
  });
  if (!event) {
    throw new ResponseError(404, 'Event Tidak Ada!');
  }
  return event;
};
const getAllEvent = async () => {
  const result = prisma.event.findMany({
    select: {
      id: true,
      location: true,
      description: true,
      title: true,
      event_date: true,
      image_url: true,
      created_at: true,
    },
  });
  if (result.length === 0) {
    throw new ResponseError(404, 'Users Not Found');
  }
  return result;
};
const updateEvent = async (id, req, newImage) => {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {
      throw new ResponseError(404, 'Event tidak ditemukan!');
    }
    if (event.image_url) {
      const oldImagePath = path.join(
        __dirname,
        '../../uploads_events',
        event.image_url.split('/').pop()
      );
      console.log('OLD IMAGE PATH', oldImagePath);
      console.log('newIMAGE: ', newImage);
      try {
        await fs.access(oldImagePath);
        await fs.unlink(oldImagePath);
      } catch (fileError) {
        console.error('Error saat memperbarui event:');
        console.error('Error menghapus gambar lama:', fileError);
      }
    }
    const updatedData = validate(updateEventValidation, req);
    const { location, event_date, description, title } = updatedData;
    console.log(updatedData);
    const newEvent = await prisma.event.update({
      where: {
        id,
      },
      data: {
        location,
        event_date,
        description,
        image_url: newImage,
        title,
      },
    });
    return {
      message: 'Event berhasil diupdate',
      data: newEvent,
    };
  } catch (err) {
    console.error('Error in updateEvent Service:', err.message);
    throw new Error('Gagal memperbarui event!');
  }
};
const deleteEvent = async (id) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new ResponseError(404, 'Event tidak ditemukan!');
    }

    if (event.image_url) {
      const oldImagePath = path.resolve(
        __dirname,
        '../../uploads_events',
        event.image_url.split('/').pop()
      );

      try {
        await fs.access(oldImagePath);
        await fs.unlink(oldImagePath);
        console.log('File gambar lama berhasil dihapus:', oldImagePath);
      } catch (fileError) {
        console.error('Error menghapus gambar lama:', fileError.message);
      }
    }

    await prisma.event.delete({
      where: { id },
    });

    return {
      message: 'Event berhasil dihapus',
    };
  } catch (err) {
    console.error('Gagal menghapus event:', err.message);
    throw new Error('Gagal menghapus event!');
  }
};
export default {
  createEvent,
  getEventById,
  getAllEvent,
  updateEvent,
  deleteEvent,
};
