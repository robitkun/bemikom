import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(403).json({
      error: 'Access Denied. No token provided',
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        error: 'Invalid or expired token',
      });
    }
    console.log('Decoded JWT:', user);
    req.user = user;
    console.log('User data:', req.user);
    next();
  });
};

export default authenticateToken;
