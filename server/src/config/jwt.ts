import 'dotenv/config';

interface TokenConfig {
  secret: string;
  expiresIn: string;
}

interface EmailTokenConfig {
  expiresIn: string;
}

interface JWTConfig {
  accessToken: TokenConfig;
  refreshToken: TokenConfig;
  emailVerificationToken: EmailTokenConfig;
  passwordResetToken: EmailTokenConfig;
}

const jwtConfig: JWTConfig = {
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

export default jwtConfig;
