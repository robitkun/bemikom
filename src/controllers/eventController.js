import eventService from '../service/eventService.js';
import ResponseError from '../error/responseError.js';
const createEvent = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ResponseError(400, 'Image File Harus diisi');
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    const result = await eventService.createEvent(req.body, imageUrl);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    if (error.message && error.message.includes('Invalid file type')) {
      return res.status(400).json({
        error: 'Maaf hanya untuk tipe jpg, jpeg, png ',
      });
    }
    next(error);
  }
};
export { createEvent };
