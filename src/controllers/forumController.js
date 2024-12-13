import forumService from '../service/forumService.js';

const createForum = async (req, res, next) => {
  try {
    const response = await forumService.createForum(req.body);
    res.status(200).json({
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};
const getAllForum = async (req, res, next) => {
  try {
    const response = await forumService.getAllForum();

    res.status(200).json({
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};
const getForumById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await forumService.getForumById(id);
    res.status(200).json({
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};
const deleteForum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await forumService.deleteForum(id);
    res.status(200).json({
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};
const updateForum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await forumService.updateForum(req.body, id);
    res.status(200).json({
      message: response.message,
      data: response.data,
    });
  } catch (err) {
    next(err);
  }
};
export { createForum, getAllForum, getForumById, deleteForum, updateForum };
