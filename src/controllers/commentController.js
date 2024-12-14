import commentService from '../service/commentService.js';

const createComment = async (req, res, next) => {
  try {
    const { userId: author_id } = req.user;
    req.body.author_id = author_id;
    const response = await commentService.createComment(req.body);
    res.status(200).json({
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};
const getAllComment = async (req, res, next) => {
  try {
    const { forum_id } = req.params;
    const response = await commentService.getAllComment(forum_id);
    res.status(200).json({
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};

export { createComment, getAllComment };
