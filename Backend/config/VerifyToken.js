import jwt from 'jsonwebtoken';

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'Token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// Endpoint to verify token
export const verifyToken = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, valid: false });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, valid: false });
    }
    
    res.json({ 
      success: true, 
      valid: true,
      user: { UserId: decoded.UserId, email: decoded.email }
    });
  });
};

export default authenticateToken;