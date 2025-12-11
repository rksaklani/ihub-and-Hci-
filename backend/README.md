# CHCi iHub Backend API

Backend API server for CHCi iHub IIT Mandi built with Node.js, Express, and MongoDB.

## Features

- RESTful API architecture
- JWT-based authentication
- Role-based authorization (Admin/User)
- MongoDB database with Mongoose ODM
- Input validation with express-validator
- Comprehensive error handling
- CORS enabled
- Request logging with Morgan

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Environment Variables**: dotenv

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── blogController.js    # Blog CRUD operations
│   ├── eventController.js   # Event CRUD operations
│   ├── announcementController.js
│   ├── teamController.js    # Faculty, Researcher, Staff
│   ├── newsletterController.js
│   └── contactController.js
├── middleware/
│   ├── auth.js             # JWT verification & authorization
│   ├── errorHandler.js     # Global error handling
│   └── validator.js        # Validation middleware
├── models/
│   ├── User.js
│   ├── Blog.js
│   ├── Event.js
│   ├── Announcement.js
│   ├── Faculty.js
│   ├── Researcher.js
│   ├── Staff.js
│   ├── Newsletter.js
│   └── Contact.js
├── routes/
│   ├── authRoutes.js
│   ├── blogRoutes.js
│   ├── eventRoutes.js
│   ├── announcementRoutes.js
│   ├── facultyRoutes.js
│   ├── researcherRoutes.js
│   ├── staffRoutes.js
│   ├── newsletterRoutes.js
│   └── contactRoutes.js
├── .env.example
├── .gitignore
├── package.json
└── server.js               # Entry point
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Steps

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chci-ihub
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRE=30d
```

5. Make sure MongoDB is running on your system

## Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user |
| GET | `/api/auth/me` | Private | Get current user |
| PUT | `/api/auth/updatepassword` | Private | Update password |

### Blog Routes (`/api/blog`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/blog` | Public | Get all blog posts |
| GET | `/api/blog/:id` | Public | Get single blog post |
| GET | `/api/blog/slug/:slug` | Public | Get blog by slug |
| POST | `/api/blog` | Admin | Create blog post |
| PUT | `/api/blog/:id` | Admin | Update blog post |
| DELETE | `/api/blog/:id` | Admin | Delete blog post |

### Event Routes (`/api/events`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/events` | Public | Get all events |
| GET | `/api/events/:id` | Public | Get single event |
| POST | `/api/events` | Admin | Create event |
| PUT | `/api/events/:id` | Admin | Update event |
| DELETE | `/api/events/:id` | Admin | Delete event |

### Announcement Routes (`/api/announcements`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/announcements` | Public | Get all announcements |
| GET | `/api/announcements/:id` | Public | Get single announcement |
| POST | `/api/announcements` | Admin | Create announcement |
| PUT | `/api/announcements/:id` | Admin | Update announcement |
| DELETE | `/api/announcements/:id` | Admin | Delete announcement |

### Faculty Routes (`/api/faculty`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/faculty` | Public | Get all faculty members |
| GET | `/api/faculty/:id` | Public | Get single faculty member |
| POST | `/api/faculty` | Admin | Create faculty member |
| PUT | `/api/faculty/:id` | Admin | Update faculty member |
| DELETE | `/api/faculty/:id` | Admin | Delete faculty member |

### Researcher Routes (`/api/researchers`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/researchers` | Public | Get all researchers |
| GET | `/api/researchers/:id` | Public | Get single researcher |
| POST | `/api/researchers` | Admin | Create researcher |
| PUT | `/api/researchers/:id` | Admin | Update researcher |
| DELETE | `/api/researchers/:id` | Admin | Delete researcher |

### Staff Routes (`/api/staff`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/staff` | Public | Get all staff members |
| GET | `/api/staff/:id` | Public | Get single staff member |
| POST | `/api/staff` | Admin | Create staff member |
| PUT | `/api/staff/:id` | Admin | Update staff member |
| DELETE | `/api/staff/:id` | Admin | Delete staff member |

### Newsletter Routes (`/api/newsletter`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/newsletter` | Public | Subscribe to newsletter |
| PUT | `/api/newsletter/unsubscribe` | Public | Unsubscribe from newsletter |
| GET | `/api/newsletter` | Admin | Get all subscriptions |
| DELETE | `/api/newsletter/:id` | Admin | Delete subscription |

### Contact Routes (`/api/contact`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/contact` | Public | Submit contact form |
| GET | `/api/contact` | Admin | Get all contact submissions |
| GET | `/api/contact/:id` | Admin | Get single contact submission |
| PUT | `/api/contact/:id` | Admin | Update contact status |
| DELETE | `/api/contact/:id` | Admin | Delete contact submission |

## Query Parameters

Most GET endpoints support the following query parameters:

- `limit` - Number of results to return (default: 100)
- `status` - Filter by status (varies by endpoint)
- `search` - Search term for filtering
- `category` - Filter by category (team endpoints)

Example:
```
GET /api/blog?status=published&limit=10&search=technology
```

## Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Creating Admin User

To create an admin user, you can either:

1. Register through the API and manually update the role in MongoDB:
```bash
mongo
use chci-ihub
db.users.updateOne({email: "admin@example.com"}, {$set: {role: "admin"}})
```

2. Or create a seed script to populate initial data

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Role-based access control
- Input validation and sanitization
- MongoDB injection prevention
- CORS configuration
- Environment variable protection

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Authentication errors
- Authorization errors
- Database errors
- Not found errors
- Server errors

## Development Tips

1. Use MongoDB Compass to view and manage your database
2. Use Postman or Thunder Client for API testing
3. Check logs in the console for debugging
4. Enable development mode for detailed error messages

## Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod` or check your MongoDB service
- Verify MONGODB_URI in .env file
- Check if port 27017 is not in use

### Port Already in Use
- Change PORT in .env file
- Or kill the process using port 5000:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### JWT Token Invalid
- Ensure JWT_SECRET matches between sessions
- Check token expiration (JWT_EXPIRE in .env)
- Verify Authorization header format: `Bearer <token>`

## Database Schema

### User Model
- username (String, required, unique)
- email (String, required, unique)
- password (String, required, hashed)
- role (String, enum: ['admin', 'user'])
- timestamps

### Blog Model
- title (String, required)
- slug (String, unique)
- excerpt (String)
- content (String, required)
- categoryName (String)
- tags (Array of Strings)
- status (String, enum: ['draft', 'published'])
- featuredImage (String)
- publishedAt (Date)
- views (Number)
- timestamps

### Event Model
- title (String, required)
- eventDate (Date, required)
- location (String)
- description (String)
- status (String, enum: ['upcoming', 'ongoing', 'completed'])
- featuredImage (String)
- timestamps

### Announcement Model
- title (String, required)
- content (String)
- status (String, enum: ['active', 'inactive', 'archived'])
- priority (String, enum: ['low', 'medium', 'high', 'urgent'])
- timestamps

### Team Models (Faculty, Researcher, Staff)
- name (String, required)
- designation/position (String)
- email (String)
- phone (String)
- department/researchArea (String)
- category (String)
- bio (String)
- image (String)
- socialLinks (Object) - for Faculty and Researcher
- timestamps

### Newsletter Model
- email (String, required, unique)
- status (String, enum: ['subscribed', 'unsubscribed'])
- subscribedAt (Date)
- timestamps

### Contact Model
- name (String, required)
- email (String, required)
- subject (String)
- message (String, required)
- status (String, enum: ['new', 'read', 'replied', 'archived'])
- readAt (Date)
- timestamps

## Testing

Use tools like Postman, Insomnia, or curl to test the API endpoints.

Example curl commands:

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"password123","role":"admin"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password123"}'

# Get blogs (public)
curl http://localhost:5000/api/blog

# Create blog (requires token)
curl -X POST http://localhost:5000/api/blog \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Test Blog","content":"This is test content","status":"published"}'
```

## Deployment

### Environment Variables for Production

Update your `.env` for production:
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/chci-ihub
JWT_SECRET=<strong_random_secret>
JWT_EXPIRE=30d
```

### Deployment Platforms

- **Heroku**: Use the Heroku MongoDB add-on or MongoDB Atlas
- **Railway**: Easy deployment with MongoDB Atlas
- **Render**: Free tier available with MongoDB Atlas
- **DigitalOcean**: App Platform or Droplet
- **AWS**: EC2, ECS, or Elastic Beanstalk
- **Azure**: App Service

### MongoDB Atlas Setup

1. Create account at mongodb.com/cloud/atlas
2. Create a new cluster
3. Add database user
4. Whitelist IP addresses (0.0.0.0/0 for all IPs)
5. Get connection string and update MONGODB_URI

## License

ISC

## Support

For issues and questions, please contact the development team.

## Version

1.0.0
