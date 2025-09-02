# CNMI Central Backend

This is the backend API for the CNMI Central Directory application, providing authentication and user management services.

## Features

- User registration and login
- Session-based authentication with cookies
- Password reset functionality
- User profile management
- MySQL database integration
- Input validation and sanitization
- Security middleware (Helmet, CORS, etc.)

## Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn package manager

## Installation

1. **Clone the repository and navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the backend folder with the following variables:**
   ```env
   # Server Configuration
   PORT=3001
   NODE_ENV=development

   # Database Configuration
   DB_HOST=localhost
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=your_database_name
   DB_PORT=3306

   # Session Configuration
   SESSION_SECRET=your_very_long_random_session_secret_key_here

   # CORS Configuration
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Set up your MySQL database:**
   - Create a database with the name specified in `DB_NAME`
   - Ensure your users table has the correct schema (see below)
   - Make sure the database user has proper permissions

## Database Schema

The application expects a `users` table with the following structure:

```sql
CREATE TABLE users (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  mailing_address VARCHAR(255),
  village VARCHAR(100),
  island VARCHAR(100),
  birth_date DATE,
  phone_number VARCHAR(20),
  whatsapp_number VARCHAR(20),
  is_verified TINYINT(1) DEFAULT 0,
  advertising_credit INT DEFAULT 0,
  profile_picture_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Running the Application

1. **Development mode:**
   ```bash
   npm run dev
   ```

2. **Production mode:**
   ```bash
   npm start
   ```

The server will start on the port specified in your `.env` file (default: 3001).

## API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /signup` - User registration
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /me` - Get current user profile
- `GET /check-auth` - Check authentication status
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password with token

### Health Check

- `GET /api/health` - Server health status

## Security Features

- **Password Hashing**: MD5 hashing (as requested)
- **Session Management**: Secure session handling with express-session
- **Input Validation**: Request validation using express-validator
- **CORS Protection**: Configurable CORS settings
- **Security Headers**: Helmet.js for security headers
- **SQL Injection Protection**: Parameterized queries with mysql2

## Development Notes

- **Password Reset**: Currently simulated (logs token to console in development)
- **Email Functionality**: Not implemented (would need SMTP configuration)
- **Social Login**: Placeholder for future implementation
- **Admin Routes**: Basic admin middleware included but not fully implemented

## Troubleshooting

1. **Database Connection Issues:**
   - Verify database credentials in `.env`
   - Ensure MySQL service is running
   - Check database user permissions

2. **Session Issues:**
   - Verify `SESSION_SECRET` is set and unique
   - Check CORS configuration matches frontend URL

3. **Port Conflicts:**
   - Change `PORT` in `.env` if 3001 is already in use

## Future Enhancements

- Email verification system
- Social login integration
- Admin panel functionality
- Rate limiting
- Enhanced password security (bcrypt instead of MD5)
- Email notifications
- User activity logging
