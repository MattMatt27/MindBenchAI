const { PrismaClient } = require('../../prisma/generated/prisma');
const {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  generateEmailToken,
  generateResetToken,
  verifyRefreshToken,
} = require('../utils/auth');

const prisma = new PrismaClient();

// Register new user
const register = async (req, res) => {
  try {
    const { email, username, password, firstName, lastName } = req.body;

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: existingUser.email === email
          ? 'Email already registered'
          : 'Username already taken',
      });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        username,
        passwordHash,
        firstName,
        lastName,
        role: 'USER',
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        firstName: true,
        lastName: true,
      },
    });

    // Generate verification token
    const verificationToken = generateEmailToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        token: verificationToken,
        expiresAt,
      },
    });

    // TODO: Send verification email
    console.log('Verification URL:', `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`);

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token
    await prisma.userSession.create({
      data: {
        userId: user.id,
        refreshTokenHash: await hashPassword(refreshToken), // Hash for security
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.status(201).json({
      success: true,
      data: {
        user,
        accessToken,
        refreshToken,
        message: 'Registration successful. Please check your email to verify your account.',
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed',
    });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    // Check password
    const isValidPassword = await comparePassword(password, user.passwordHash);

    if (!isValidPassword) {
      // Update failed attempts
      await prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginAttempts: user.failedLoginAttempts + 1,
          lockedUntil: user.failedLoginAttempts >= 4
            ? new Date(Date.now() + 15 * 60 * 1000) // Lock for 15 minutes after 5 attempts
            : null,
        },
      });

      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    // Check if account is locked
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      return res.status(423).json({
        success: false,
        error: 'Account temporarily locked. Please try again later.',
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        error: 'Account is deactivated',
      });
    }

    // Reset failed attempts and update last login
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
        lastLoginAt: new Date(),
      },
    });

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token
    await prisma.userSession.create({
      data: {
        userId: user.id,
        refreshTokenHash: await hashPassword(refreshToken),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          isVerified: user.isVerified,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Login failed',
    });
  }
};

// Refresh access token
const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        error: 'Refresh token required',
      });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Find user and active sessions
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Invalid refresh token',
      });
    }

    // Find and validate session
    const sessions = await prisma.userSession.findMany({
      where: {
        userId: user.id,
        isActive: true,
        expiresAt: { gt: new Date() },
      },
    });

    let validSession = false;
    for (const session of sessions) {
      if (await comparePassword(refreshToken, session.refreshTokenHash)) {
        validSession = true;

        // Rotate refresh token (invalidate old, create new)
        await prisma.userSession.update({
          where: { id: session.id },
          data: { isActive: false },
        });

        break;
      }
    }

    if (!validSession) {
      return res.status(401).json({
        success: false,
        error: 'Invalid refresh token',
      });
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Store new refresh token
    await prisma.userSession.create({
      data: {
        userId: user.id,
        refreshTokenHash: await hashPassword(newRefreshToken),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.json({
      success: true,
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(401).json({
      success: false,
      error: 'Token refresh failed',
    });
  }
};

// Logout user
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      // Find and invalidate the session
      const sessions = await prisma.userSession.findMany({
        where: {
          userId: req.user.id,
          isActive: true,
        },
      });

      for (const session of sessions) {
        if (await comparePassword(refreshToken, session.refreshTokenHash)) {
          await prisma.userSession.update({
            where: { id: session.id },
            data: { isActive: false },
          });
          break;
        }
      }
    }

    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      error: 'Logout failed',
    });
  }
};

// Logout all sessions
const logoutAll = async (req, res) => {
  try {
    await prisma.userSession.updateMany({
      where: {
        userId: req.user.id,
        isActive: true,
      },
      data: { isActive: false },
    });

    res.json({
      success: true,
      message: 'All sessions terminated',
    });
  } catch (error) {
    console.error('Logout all error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to logout all sessions',
    });
  }
};

// Get current user
const getCurrentUser = async (req, res) => {
  res.json({
    success: true,
    data: {
      user: req.user,
    },
  });
};

// Verify email address
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        error: 'Verification token required',
      });
    }

    // Find verification token
    const verificationToken = await prisma.emailVerificationToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!verificationToken) {
      return res.status(400).json({
        success: false,
        error: 'Invalid verification token',
      });
    }

    // Check if token is expired
    if (verificationToken.expiresAt < new Date()) {
      // Clean up expired token
      await prisma.emailVerificationToken.delete({
        where: { id: verificationToken.id },
      });

      return res.status(400).json({
        success: false,
        error: 'Verification token has expired',
      });
    }

    // Update user as verified and delete token
    await prisma.$transaction([
      prisma.user.update({
        where: { id: verificationToken.userId },
        data: { isVerified: true },
      }),
      prisma.emailVerificationToken.delete({
        where: { id: verificationToken.id },
      }),
    ]);

    res.json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Email verification failed',
    });
  }
};

// Resend verification email
const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required',
      });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        error: 'Email is already verified',
      });
    }

    // Delete any existing verification tokens for this user
    await prisma.emailVerificationToken.deleteMany({
      where: { userId: user.id },
    });

    // Generate new verification token
    const verificationToken = generateEmailToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.emailVerificationToken.create({
      data: {
        userId: user.id,
        token: verificationToken,
        expiresAt,
      },
    });

    // TODO: Send verification email
    console.log('Verification URL:', `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`);

    res.json({
      success: true,
      message: 'Verification email sent',
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to resend verification email',
    });
  }
};

// Request password reset
const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required',
      });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if email exists or not
      return res.json({
        success: true,
        message: 'If an account with that email exists, a password reset link will be sent',
      });
    }

    // Delete any existing reset tokens for this user
    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    // Generate reset token
    const resetToken = generateResetToken();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        userId: user.id,
        token: resetToken,
        expiresAt,
      },
    });

    // TODO: Send password reset email
    console.log('Password Reset URL:', `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`);

    res.json({
      success: true,
      message: 'If an account with that email exists, a password reset link will be sent',
    });
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process password reset request',
    });
  }
};

// Reset password
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        success: false,
        error: 'Reset token and new password are required',
      });
    }

    // Find reset token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken) {
      return res.status(400).json({
        success: false,
        error: 'Invalid reset token',
      });
    }

    // Check if token is expired
    if (resetToken.expiresAt < new Date()) {
      // Clean up expired token
      await prisma.passwordResetToken.delete({
        where: { id: resetToken.id },
      });

      return res.status(400).json({
        success: false,
        error: 'Reset token has expired',
      });
    }

    // Hash new password
    const passwordHash = await hashPassword(password);

    // Update password, reset failed attempts, and delete reset token
    await prisma.$transaction([
      prisma.user.update({
        where: { id: resetToken.userId },
        data: {
          passwordHash,
          failedLoginAttempts: 0,
          lockedUntil: null,
        },
      }),
      prisma.passwordResetToken.delete({
        where: { id: resetToken.id },
      }),
      // Invalidate all existing sessions for security
      prisma.userSession.updateMany({
        where: {
          userId: resetToken.userId,
          isActive: true,
        },
        data: { isActive: false },
      }),
    ]);

    res.json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      success: false,
      error: 'Password reset failed',
    });
  }
};

module.exports = {
  register,
  login,
  refreshAccessToken,
  logout,
  logoutAll,
  getCurrentUser,
  verifyEmail,
  resendVerification,
  requestPasswordReset,
  resetPassword,
};
