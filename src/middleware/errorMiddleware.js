import ResponseError from '../error/responseError.js';
export const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }
  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        errors: err.message,
      })
      .end();
  } else {
    if (err.message && err.message.includes('Invalid file type')) {
      return res.status(400).json({
        error: 'Invalid file type. Only JPEG, PNG, and JPG are allowed.',
      });
    }
    res.status(500).json({
      errors: err.message,
    });
  }
};
