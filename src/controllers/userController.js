import userService from '../service/userService.js';

const register = async (req, res) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export { register };
