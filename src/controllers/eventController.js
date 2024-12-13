import eventService from '../service/eventService.js';
import ResponseError from '../error/responseError.js';

const createEvent = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ResponseError(400, 'Image File Harus diisi');
    }
    const imageUrl = `/uploads_events/${req.file.filename}`;
    const result = await eventService.createEvent(req.body, imageUrl);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await eventService.getEventById(id);
    res.status(200).json({
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};
const getAllEvent = async (req, res, next) => {
  try {
    const result = await eventService.getAllEvent();
    res.status(200).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const updateEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!req.file) {
      throw new ResponseError(400, 'Image File Harus diisi');
    }
    const newImage = `/uploads_events/${req.file.filename}`;

    const result = await eventService.updateEvent(id, req.body, newImage);
    res.status(200).json({
      message: result.message,
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};
const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { message } = await eventService.deleteEvent(id);

    res.status(200).json({
      message,
    });
  } catch (err) {
    next(err);
  }
};
export { createEvent, getEventById, getAllEvent, updateEvent, deleteEvent };
