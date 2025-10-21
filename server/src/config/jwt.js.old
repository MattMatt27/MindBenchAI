require('dotenv').config();

module.exports = {
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET || 'dev-access-secret',
    expiresIn: '15m', // Short-lived access token
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret',
    expiresIn: '7d', // Longer-lived refresh token
  },
  emailVerificationToken: {
    expiresIn: '24h',
  },
  passwordResetToken: {
    expiresIn: '1h',
  },
};