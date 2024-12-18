import userService from '../service/userService.js';

const register = async (req, res, next) => {
  try {
    const { token, result } = await userService.register(req.body);
    res.status(201).json({
      data: result,
      token,
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { user, token } = await userService.login(req.body);
    res.status(200).json({
      data: user,
      token,
    });
  } catch (err) {
    next(err);
  }
};
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({
      data: users,
      message: 'success',
    });
  } catch (err) {
    next(err);
  }
};
const getMe = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
export { register, login, getAllUsers, getMe };
