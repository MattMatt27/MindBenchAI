import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwtConfig from '../config/jwt';
import type { User } from '../../prisma/generated/prisma';

// JWT payload interfaces
interface AccessTokenPayload {
  id: string;
  email: string;
  role: string;
}

interface RefreshTokenPayload {
  id: string;
}

// Password hashing
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// Token generation
export const generateAccessToken = (user: Pick<User, 'id' | 'email' | 'role'>): string => {
  const payload: AccessTokenPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const options: jwt.SignOptions = {
    expiresIn: jwtConfig.accessToken.expiresIn as any,
  };

  return jwt.sign(payload, jwtConfig.accessToken.secret, options);
};

export const generateRefreshToken = (user: Pick<User, 'id'>): string => {
  const payload: RefreshTokenPayload = {
    id: user.id,
  };

  const options: jwt.SignOptions = {
    expiresIn: jwtConfig.refreshToken.expiresIn as any,
  };

  return jwt.sign(payload, jwtConfig.refreshToken.secret, options);
};

export const generateEmailToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

export const generateResetToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// Token verification
export const verifyAccessToken = (token: string): AccessTokenPayload => {
  try {
    return jwt.verify(token, jwtConfig.accessToken.secret) as AccessTokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  try {
    return jwt.verify(token, jwtConfig.refreshToken.secret) as RefreshTokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};

// Token extraction from headers
export const extractTokenFromHeader = (authHeader: string | undefined): string | null => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
};

// CommonJS compatibility for mixed module system
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
