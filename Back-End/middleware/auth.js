import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  //Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR...
  //["Bearer","myToken"]
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_HASH);
    req.user = { id: decoded.id };
    next();

  } catch (error) {
    console.log('Error during token verification:', error);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
