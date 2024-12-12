export const adminOnly = (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== 'ADMIN') {
      return res.status(403).json({
        error: 'Access denied. Admins only.',
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
