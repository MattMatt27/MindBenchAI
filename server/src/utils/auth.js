const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwtConfig = require('../config/jwt');

// Password hashing
const hashPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// Token generation
const generateAccessToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, jwtConfig.accessToken.secret, {
    expiresIn: jwtConfig.accessToken.expiresIn,
  });
};

const generateRefreshToken = (user) => {
  const payload = {
    id: user.id,
    tokenVersion: user.tokenVersion || 0, // For token rotation/revocation
  };

  return jwt.sign(payload, jwtConfig.refreshToken.secret, {
    expiresIn: jwtConfig.refreshToken.expiresIn,
  });
};

const generateEmailToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Token verification
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.accessToken.secret);
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, jwtConfig.refreshToken.secret);
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};

// Token extraction from headers
const extractTokenFromHeader = (authHeader) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
};

module.exports = {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  generateEmailToken,
  generateResetToken,
  verifyAccessToken,
  verifyRefreshToken,
  extractTokenFromHeader,
};