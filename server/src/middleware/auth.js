const { verifyAccessToken, extractTokenFromHeader } = require('../utils/auth');
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

// Authentication middleware
const authenticate = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Access token required',
      });
    }

    const decoded = verifyAccessToken(token);

    // Get fresh user data
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        firstName: true,
        lastName: true,
        isActive: true,
        isVerified: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'User not found',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        error: 'Account is deactivated',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: error.message || 'Invalid token',
    });
  }
};

// Authorization middleware - check user role
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions',
      });
    }

    next();
  };
};

// Check if user email is verified
const requireVerifiedEmail = (req, res, next) => {
  if (!req.user.isVerified) {
    return res.status(403).json({
      success: false,
      error: 'Email verification required',
    });
  }
  next();
};

// Optional authentication - continues if no token, but adds user if valid token
const optionalAuth = async (req, res, next) => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);

    if (token) {
      const decoded = verifyAccessToken(token);

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          firstName: true,
          lastName: true,
          isActive: true,
          isVerified: true,
        },
      });

      if (user && user.isActive) {
        req.user = user;
      }
    }
  } catch (error) {
    // Silently fail - this is optional auth
  }

  next();
};

module.exports = {
  authenticate,
  authorize,
  requireVerifiedEmail,
  optionalAuth,
};