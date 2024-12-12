import userService from '../service/userService.js';

const register = async (req, res, next) => {
  try {
    const { token, result } = await userService.register(req.body);
    res.status(201).json({
      data: result,
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
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
    res.status(err.status || 500).json({
      error: err.message,
    });
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
export { register, login, getAllUsers };
