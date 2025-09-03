const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const { testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📥 ${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log(`🌐 Origin: ${req.get('Origin') || 'No origin'}`);
  console.log(`🏠 Host: ${req.get('Host') || 'No host'}`);
  console.log(`🔗 Referer: ${req.get('Referer') || 'No referer'}`);
  next();
});

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: 'lax'
  }
}));

// Database connection test
testConnection().then(success => {
  if (success) {
    console.log('✅ Database connected successfully');
  } else {
    console.log('❌ Database connection failed');
  }
});

// Add this temporarily after your routes
app.get('/api/test-db', async (req, res) => {
  console.log('🔍 /api/test-db route accessed');
  console.log('📅 Timestamp:', new Date().toISOString());
  console.log('🌐 Request URL:', req.url);
  console.log('🏠 Request hostname:', req.hostname);
  
  try {
    const { executeQuery } = require('./config/database');
    
    // Test basic connection
    const testResult = await executeQuery('SELECT 1 as test');
    console.log('✅ Basic query test:', testResult);
    
    // Check if users table exists
    const tableCheck = await executeQuery(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users'
    `, [process.env.DB_NAME]);
    
    console.log('📋 Table check result:', tableCheck);
    
    // Check table structure
    let tableStructure = [];
    if (tableCheck.length > 0) {
      tableStructure = await executeQuery(`
        DESCRIBE users
      `);
      console.log('🏗️ Table structure:', tableStructure);
    }
    
    const response = {
      success: true,
      connection: 'Working',
      database: process.env.DB_NAME,
      usersTableExists: tableCheck.length > 0,
      tableStructure: tableStructure,
      timestamp: new Date().toISOString(),
      serverInfo: {
        nodeVersion: process.version,
        environment: process.env.NODE_ENV,
        port: PORT
      }
    };
    
    console.log('📤 Sending response:', response);
    res.json(response);
  } catch (error) {
    console.error('❌ Database test error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Add a simple test route to verify the server is working
app.get('/api/test', (req, res) => {
  console.log('🧪 /api/test route accessed');
  res.json({ 
    message: 'API is working!', 
    timestamp: new Date().toISOString(),
    server: 'CNMI Central Backend'
  });
});


// Temporary debug endpoint - REMOVE THIS AFTER TESTING
app.get('/api/debug-user/:email', async (req, res) => {
  try {
    const { executeQuery } = require('./config/database');
    const { email } = req.params;
    
    const users = await executeQuery(
      'SELECT id, email, password_hash, full_name, role FROM users WHERE email = ?',
      [email]
    );
    
    if (users.length > 0) {
      const user = users[0];
      res.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          password_hash: user.password_hash,
          full_name: user.full_name,
          role: user.role
        }
      });
    } else {
      res.json({
        success: false,
        message: 'User not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'CNMI Central API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 CORS Origin: ${process.env.CORS_ORIGIN}`);
});
