const express = require('express');
const { body, validationResult } = require('express-validator');
const crypto = require('crypto');
const { executeQuery } = require('../config/database');
const router = express.Router();

// Helper function to hash password with MD5
const hashPassword = (password) => {
  return crypto.createHash('md5').update(password).digest('hex');
};

// Helper function to generate reset token
const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Middleware to check if user is authenticated
const requireAuth = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(401).json({ success: false, message: 'Authentication required' });
  }
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.session.userId && req.session.userRole === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Admin access required' });
  }
};

// Validation middleware
const validateSignup = [
  body('full_name').trim().isLength({ min: 2, max: 255 }).withMessage('Full name must be between 2 and 255 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  })
];

const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address'),
  body('password').notEmpty().withMessage('Password is required')
];

const validatePasswordReset = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email address')
];

const validateNewPassword = [
  body('token').notEmpty().withMessage('Reset token is required'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  })
];

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', validateSignup, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { full_name, email, password, mailing_address, village, island, birth_date, phone_number, whatsapp_number } = req.body;

    // Check if user already exists
    const existingUser = await executeQuery(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const password_hash = hashPassword(password);

    // Generate UUID for user ID
    const userId = crypto.randomUUID();

    // Insert new user
    const result = await executeQuery(
      `INSERT INTO users (
        id, email, password_hash, full_name, mailing_address, village, island, 
        birth_date, phone_number, whatsapp_number, role, is_verified, 
        advertising_credit, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        userId, email, password_hash, full_name, mailing_address || null, 
        village || null, island || null, birth_date || null, phone_number || null, 
        whatsapp_number || null, 'user', 0, 0
      ]
    );

    if (result.affectedRows > 0) {
      // Set session
      req.session.userId = userId;
      req.session.userEmail = email;
      req.session.userRole = 'user';
      req.session.userName = full_name;

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: {
          id: userId,
          email,
          full_name,
          role: 'user',
          is_verified: false,
          advertising_credit: 0
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to create user'
      });
    }
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate user & get session
// @access  Public
router.post('/login', validateLogin, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user by email
    const users = await executeQuery(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const user = users[0];

    // Verify password
    const hashedPassword = hashPassword(password);
    if (user.password_hash !== hashedPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Set session
    req.session.userId = user.id;
    req.session.userEmail = user.email;
    req.session.userRole = user.role;
    req.session.userName = user.full_name;

    // Update last login (you might want to add this field to your users table)
    // await executeQuery('UPDATE users SET last_login = NOW() WHERE id = ?', [user.id]);

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        is_verified: user.is_verified,
        advertising_credit: user.advertising_credit,
        mailing_address: user.mailing_address,
        village: user.village,
        island: user.island,
        birth_date: user.birth_date,
        phone_number: user.phone_number,
        whatsapp_number: user.whatsapp_number,
        profile_picture_path: user.profile_picture_path
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user / clear session
// @access  Private
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Error logging out'
      });
    }
    
    res.clearCookie('connect.sid');
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  });
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', requireAuth, async (req, res) => {
  try {
    const users = await executeQuery(
      'SELECT * FROM users WHERE id = ?',
      [req.session.userId]
    );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = users[0];
    
    // Remove sensitive information
    delete user.password_hash;

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email (simulated)
// @access  Public
router.post('/forgot-password', validatePasswordReset, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email } = req.body;

    // Check if user exists
    const users = await executeQuery(
      'SELECT id, full_name FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      // Don't reveal if user exists or not for security
      return res.json({
        success: true,
        message: 'If an account with that email exists, a password reset link has been sent'
      });
    }

    const user = users[0];
    const resetToken = generateResetToken();
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    // Store reset token in database (you might want to add these fields to your users table)
    // For now, we'll simulate the process
    // await executeQuery(
    //   'UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?',
    //   [resetToken, resetTokenExpiry, user.id]
    // );

    // In a real application, you would send an email here
    // For now, we'll just return the token (remove this in production)
    console.log(`Password reset token for ${email}: ${resetToken}`);

    res.json({
      success: true,
      message: 'If an account with that email exists, a password reset link has been sent',
      // Remove this in production:
      resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password with token
// @access  Public
router.post('/reset-password', validateNewPassword, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { token, password } = req.body;

    // In a real application, you would verify the token from the database
    // For now, we'll simulate the process
    // const users = await executeQuery(
    //   'SELECT id FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()',
    //   [token]
    // );

    // if (users.length === 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: 'Invalid or expired reset token'
    //   });
    // }

    // const userId = users[0].id;
    // const password_hash = hashPassword(password);

    // Update password and clear reset token
    // await executeQuery(
    //   'UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?',
    //   [password_hash, userId]
    // );

    // For now, we'll just return success (remove this in production)
    console.log(`Password reset completed for token: ${token}`);

    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// @route   GET /api/auth/check-auth
// @desc    Check if user is authenticated
// @access  Public
router.get('/check-auth', (req, res) => {
  if (req.session.userId) {
    res.json({
      success: true,
      isAuthenticated: true,
      user: {
        id: req.session.userId,
        email: req.session.userEmail,
        role: req.session.userRole,
        name: req.session.userName
      }
    });
  } else {
    res.json({
      success: true,
      isAuthenticated: false
    });
  }
});

module.exports = router;
