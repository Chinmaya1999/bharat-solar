const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        error: 'Access token required',
        message: 'Please provide a valid JWT token in Authorization header'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(403).json({ 
        error: 'Invalid or expired token',
        message: 'User no longer exists'
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ 
        error: 'Invalid token',
        message: 'The provided token is invalid'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ 
        error: 'Token expired',
        message: 'Please login again'
      });
    }
    return res.status(403).json({ 
      error: 'Authentication failed',
      message: error.message 
    });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      error: 'Admin access required',
      message: 'Only administrators can access this resource'
    });
  }
  next();
};

module.exports = { authenticateToken, requireAdmin };