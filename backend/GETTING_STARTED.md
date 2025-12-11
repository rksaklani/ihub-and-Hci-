# Getting Started with CHCi iHub Backend

Quick start guide to set up and run the backend API server.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager (comes with Node.js)
- **Git** (optional) - [Download](https://git-scm.com/)

## Installation Steps

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- express (web framework)
- mongoose (MongoDB ODM)
- jsonwebtoken (authentication)
- bcryptjs (password hashing)
- express-validator (input validation)
- cors (cross-origin resource sharing)
- dotenv (environment variables)
- morgan (request logging)

### 3. Set Up Environment Variables

Create a `.env` file in the backend directory:

```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

Edit the `.env` file with your configuration:

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/chci-ihub

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_key_change_this
JWT_EXPIRE=30d
```

**Important:** Change the `JWT_SECRET` to a strong random string in production!

### 4. Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
# If MongoDB is installed as a service, it should start automatically
# Otherwise, run:
mongod
```

**Linux:**
```bash
sudo systemctl start mongod
# or
sudo service mongod start
```

**Mac:**
```bash
brew services start mongodb-community
# or
mongod --config /usr/local/etc/mongod.conf
```

### 5. Verify MongoDB Connection

Open MongoDB shell to verify:
```bash
mongo
# or for MongoDB 6+
mongosh
```

## Running the Application

### Development Mode (with auto-reload)

```bash
npm run dev
```

This uses nodemon to automatically restart the server when you make changes.

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:5000`

You should see output like:
```
MongoDB Connected: localhost
    ╔═══════════════════════════════════════════╗
    ║  CHCi iHub Backend API Server Running    ║
    ║  Port: 5000                              ║
    ║  Environment: development                 ║
    ╚═══════════════════════════════════════════╝
```

## Database Setup

### Create Admin User

After starting the server, create an admin user:

```bash
npm run seed:admin
```

This will create an admin user with:
- **Email:** admin@chciihub.com
- **Password:** Admin@123456
- **Role:** admin

**Important:** Change this password after first login!

### Seed Sample Data (Optional)

To populate the database with sample data:

```bash
npm run seed:data
```

This will create sample:
- Blog posts
- Events
- Announcements
- Faculty members
- Researchers
- Staff members

### Seed Everything

To create admin user AND sample data:

```bash
npm run seed:all
```

### Clear Database

To clear all data from the database:

```bash
npm run clear:db
```

**Warning:** This will delete ALL data! You'll be prompted to confirm.

## Testing the API

### 1. Check Server Health

Open your browser or use curl:

```bash
curl http://localhost:5000/api/health
```

Response:
```json
{
  "success": true,
  "message": "CHCi iHub Backend API is running",
  "timestamp": "2025-01-15T10:00:00.000Z"
}
```

### 2. Test Authentication

**Register a new user:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@chciihub.com\",\"password\":\"Admin@123456\"}"
```

Save the token from the response!

### 3. Test Protected Routes

**Get current user:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Test Public Routes

**Get all blog posts:**
```bash
curl http://localhost:5000/api/blog
```

**Get events:**
```bash
curl http://localhost:5000/api/events?status=upcoming
```

## Using Postman

### Import Collection

1. Open Postman
2. Click "Import" button
3. Select `postman_collection.json` from the backend folder
4. The collection will be imported with all endpoints

### Set Variables

In Postman, set collection variables:
- `baseUrl`: `http://localhost:5000/api`
- `token`: (will be auto-set after login)

### Test Flow

1. Run "Authentication > Login" request
2. Token will be automatically saved
3. All protected routes will now work with the saved token

## Common npm Scripts

```bash
# Start server in production mode
npm start

# Start server in development mode with auto-reload
npm run dev

# Create admin user
npm run seed:admin

# Seed sample data
npm run seed:data

# Seed admin user + sample data
npm run seed:all

# Clear database (with confirmation)
npm run clear:db
```

## Project Structure Overview

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/             # Business logic
│   ├── authController.js
│   ├── blogController.js
│   └── ...
├── middleware/              # Express middleware
│   ├── auth.js             # JWT verification
│   ├── errorHandler.js     # Error handling
│   └── validator.js        # Input validation
├── models/                  # Mongoose schemas
│   ├── User.js
│   ├── Blog.js
│   └── ...
├── routes/                  # API routes
│   ├── authRoutes.js
│   ├── blogRoutes.js
│   └── ...
├── scripts/                 # Utility scripts
│   ├── seedAdmin.js
│   ├── seedSampleData.js
│   └── clearDatabase.js
├── utils/                   # Helper functions
│   ├── generateToken.js
│   ├── slugify.js
│   └── ...
├── .env                     # Environment variables (create this)
├── .env.example            # Environment template
├── server.js               # Entry point
└── package.json            # Dependencies
```

## Connecting Frontend

Update your frontend API configuration to point to the backend:

**In frontend `next.config.js` or API config:**
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

**Example API call from frontend:**
```javascript
// Login
const response = await axios.post('http://localhost:5000/api/auth/login', {
  email: 'admin@chciihub.com',
  password: 'Admin@123456'
});

const { token, user } = response.data;

// Store token
localStorage.setItem('token', token);

// Use token for authenticated requests
const config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
};

const blogs = await axios.get('http://localhost:5000/api/blog', config);
```

## Troubleshooting

### MongoDB Connection Error

**Problem:** `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solutions:**
1. Make sure MongoDB is running: `mongod`
2. Check if MongoDB is installed correctly
3. Verify `MONGODB_URI` in `.env` file
4. Check if port 27017 is available

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
lsof -ti:5000 | xargs kill -9
```

Or change the PORT in `.env` file.

### JWT Token Invalid

**Problem:** `401 Unauthorized - Not authorized to access this route`

**Solutions:**
1. Make sure you're including the token in the Authorization header
2. Check token format: `Bearer <token>`
3. Verify `JWT_SECRET` hasn't changed
4. Token might be expired (default 30 days)

### Module Not Found

**Problem:** `Error: Cannot find module 'express'`

**Solution:**
```bash
npm install
```

### Admin User Already Exists

**Problem:** When running `npm run seed:admin`

**Solution:** This is expected if admin user was already created. You can:
1. Use the existing admin credentials
2. Delete the user from MongoDB and run again
3. Change email in the seed script

## Using MongoDB Compass (GUI)

1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. Select database: `chci-ihub`
4. Browse collections:
   - users
   - blogs
   - events
   - announcements
   - faculties
   - researchers
   - staffs
   - newsletters
   - contacts

## Production Deployment

### Using MongoDB Atlas (Cloud Database)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chci-ihub
```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<strong-random-secret>
JWT_EXPIRE=30d
```

### Deployment Platforms

- **Render**: Easy deployment, free tier available
- **Railway**: Simple deployment with MongoDB support
- **Heroku**: Popular platform (paid)
- **DigitalOcean**: App Platform or Droplet
- **AWS**: EC2, ECS, or Elastic Beanstalk

## Next Steps

1. ✅ Server is running
2. ✅ Admin user created
3. ✅ Sample data seeded (optional)
4. 📖 Read [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for all endpoints
5. 📮 Import [postman_collection.json](postman_collection.json) for testing
6. 🔌 Connect your frontend to the backend
7. 🚀 Start building!

## Useful Commands

```bash
# Check if MongoDB is running
mongo --eval "db.adminCommand('ping')"

# View MongoDB logs
tail -f /var/log/mongodb/mongod.log

# Check Node.js version
node --version

# Check npm version
npm --version

# Update all packages
npm update

# View running processes on port 5000
netstat -ano | findstr :5000
lsof -i :5000
```

## Support

For more information:
- [README.md](README.md) - Complete documentation
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
- MongoDB Docs: https://docs.mongodb.com/
- Express Docs: https://expressjs.com/
- Mongoose Docs: https://mongoosejs.com/

## Quick Reference

**Default Credentials:**
- Email: admin@chciihub.com
- Password: Admin@123456

**Base URL:**
- http://localhost:5000/api

**Health Check:**
- http://localhost:5000/api/health

**API Documentation:**
- See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

**You're all set! Start developing your CHCi iHub application!** 🚀
