# CHCi iHub Backend API Documentation

Complete API documentation with example requests and responses.

Base URL: `http://localhost:5000/api`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Blog Management](#blog-management)
3. [Event Management](#event-management)
4. [Announcement Management](#announcement-management)
5. [Team Management](#team-management)
6. [Newsletter](#newsletter)
7. [Contact](#contact)

---

## Authentication

### Register User

**Endpoint:** `POST /api/auth/register`
**Access:** Public

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "User with this email or username already exists"
}
```

---

### Login

**Endpoint:** `POST /api/auth/login`
**Access:** Public

**Request Body:**
```json
{
  "email": "admin@chciihub.com",
  "password": "Admin@123456"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "admin",
    "email": "admin@chciihub.com",
    "role": "admin"
  }
}
```

---

### Get Current User

**Endpoint:** `GET /api/auth/me`
**Access:** Private (requires token)

**Headers:**
```
Authorization: Bearer <your_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "admin",
    "email": "admin@chciihub.com",
    "role": "admin"
  }
}
```

---

### Update Password

**Endpoint:** `PUT /api/auth/updatepassword`
**Access:** Private

**Headers:**
```
Authorization: Bearer <your_token>
```

**Request Body:**
```json
{
  "currentPassword": "Admin@123456",
  "newPassword": "NewPassword@123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Password updated successfully"
}
```

---

## Blog Management

### Get All Blogs

**Endpoint:** `GET /api/blog`
**Access:** Public

**Query Parameters:**
- `status` - Filter by status (draft, published, all)
- `limit` - Number of results (default: 100)
- `categoryName` - Filter by category
- `search` - Search term

**Example:** `GET /api/blog?status=published&limit=10`

**Success Response (200):**
```json
{
  "success": true,
  "total": 50,
  "count": 10,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Welcome to CHCi iHub",
      "slug": "welcome-to-chci-ihub",
      "excerpt": "Introduction to our innovation center",
      "content": "Full blog content here...",
      "categoryName": "Innovation",
      "tags": ["healthcare", "innovation"],
      "status": "published",
      "featuredImage": "https://example.com/image.jpg",
      "publishedAt": "2025-01-15T10:00:00.000Z",
      "views": 150,
      "createdAt": "2025-01-10T10:00:00.000Z",
      "updatedAt": "2025-01-15T10:00:00.000Z"
    }
  ]
}
```

---

### Get Single Blog

**Endpoint:** `GET /api/blog/:id`
**Access:** Public

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Welcome to CHCi iHub",
    "slug": "welcome-to-chci-ihub",
    "content": "Full content...",
    "views": 151
  }
}
```

---

### Get Blog by Slug

**Endpoint:** `GET /api/blog/slug/:slug`
**Access:** Public

**Example:** `GET /api/blog/slug/welcome-to-chci-ihub`

---

### Create Blog

**Endpoint:** `POST /api/blog`
**Access:** Admin only

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "title": "New Blog Post",
  "excerpt": "Short description",
  "content": "Full blog content here...",
  "categoryName": "Research",
  "tags": "research,innovation,healthcare",
  "status": "published",
  "featuredImage": "https://example.com/image.jpg"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "New Blog Post",
    "slug": "new-blog-post",
    "status": "published"
  },
  "message": "Blog post created successfully"
}
```

---

### Update Blog

**Endpoint:** `PUT /api/blog/:id`
**Access:** Admin only

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "title": "Updated Blog Title",
  "content": "Updated content...",
  "status": "published"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "data": { /* updated blog */ },
  "message": "Blog post updated successfully"
}
```

---

### Delete Blog

**Endpoint:** `DELETE /api/blog/:id`
**Access:** Admin only

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Blog post deleted successfully"
}
```

---

## Event Management

### Get All Events

**Endpoint:** `GET /api/events`
**Access:** Public

**Query Parameters:**
- `status` - Filter by status (upcoming, ongoing, completed, all)
- `limit` - Number of results
- `search` - Search term

**Example:** `GET /api/events?status=upcoming`

**Success Response (200):**
```json
{
  "success": true,
  "total": 10,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Healthcare Innovation Summit 2025",
      "eventDate": "2025-03-15T00:00:00.000Z",
      "location": "IIT Mandi Campus",
      "description": "Join us for innovation...",
      "status": "upcoming",
      "featuredImage": "https://example.com/event.jpg",
      "createdAt": "2025-01-10T10:00:00.000Z"
    }
  ]
}
```

---

### Create Event

**Endpoint:** `POST /api/events`
**Access:** Admin only

**Request Body:**
```json
{
  "title": "Workshop on Medical Devices",
  "eventDate": "2025-04-20",
  "location": "CHCi Lab",
  "description": "Hands-on workshop...",
  "status": "upcoming",
  "featuredImage": "https://example.com/workshop.jpg"
}
```

---

## Announcement Management

### Get All Announcements

**Endpoint:** `GET /api/announcements`
**Access:** Public

**Query Parameters:**
- `status` - Filter by status (active, inactive, archived)
- `limit` - Number of results
- `search` - Search term

**Success Response (200):**
```json
{
  "success": true,
  "total": 15,
  "count": 10,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Call for Research Proposals",
      "content": "CHCi is inviting proposals...",
      "status": "active",
      "priority": "high",
      "createdAt": "2025-01-10T10:00:00.000Z"
    }
  ]
}
```

---

### Create Announcement

**Endpoint:** `POST /api/announcements`
**Access:** Admin only

**Request Body:**
```json
{
  "title": "New Fellowship Program",
  "content": "We are excited to announce...",
  "status": "active",
  "priority": "medium"
}
```

---

## Team Management

### Faculty

#### Get All Faculty

**Endpoint:** `GET /api/faculty`
**Access:** Public

**Query Parameters:**
- `category` - Filter by category
- `limit` - Number of results
- `search` - Search term

**Success Response (200):**
```json
{
  "success": true,
  "total": 20,
  "count": 10,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Dr. Rajesh Kumar",
      "designation": "Professor",
      "email": "rajesh@iitmandi.ac.in",
      "phone": "+91-1234567890",
      "department": "Biomedical Engineering",
      "category": "Core Faculty",
      "bio": "Expert in medical devices...",
      "image": "https://example.com/profile.jpg",
      "socialLinks": {
        "linkedin": "https://linkedin.com/in/...",
        "googleScholar": "https://scholar.google.com/..."
      }
    }
  ]
}
```

#### Create Faculty

**Endpoint:** `POST /api/faculty`
**Access:** Admin only

**Request Body:**
```json
{
  "name": "Dr. Priya Sharma",
  "designation": "Associate Professor",
  "email": "priya@iitmandi.ac.in",
  "department": "Computer Science",
  "category": "Core Faculty",
  "bio": "AI in healthcare specialist"
}
```

---

### Researchers

**Endpoints:**
- `GET /api/researchers` - Get all researchers
- `GET /api/researchers/:id` - Get single researcher
- `POST /api/researchers` - Create researcher (Admin)
- `PUT /api/researchers/:id` - Update researcher (Admin)
- `DELETE /api/researchers/:id` - Delete researcher (Admin)

---

### Staff

**Endpoints:**
- `GET /api/staff` - Get all staff
- `GET /api/staff/:id` - Get single staff member
- `POST /api/staff` - Create staff (Admin)
- `PUT /api/staff/:id` - Update staff (Admin)
- `DELETE /api/staff/:id` - Delete staff (Admin)

---

## Newsletter

### Subscribe to Newsletter

**Endpoint:** `POST /api/newsletter`
**Access:** Public

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "status": "subscribed",
    "subscribedAt": "2025-01-15T10:00:00.000Z"
  }
}
```

---

### Unsubscribe from Newsletter

**Endpoint:** `PUT /api/newsletter/unsubscribe`
**Access:** Public

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Successfully unsubscribed from newsletter"
}
```

---

### Get All Subscriptions

**Endpoint:** `GET /api/newsletter`
**Access:** Admin only

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Query Parameters:**
- `status` - Filter by status (subscribed, unsubscribed)
- `limit` - Number of results

---

## Contact

### Submit Contact Form

**Endpoint:** `POST /api/contact`
**Access:** Public

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry about fellowship",
  "message": "I would like to know more about..."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Your message has been sent successfully. We will get back to you soon!",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "status": "new",
    "createdAt": "2025-01-15T10:00:00.000Z"
  }
}
```

---

### Get All Contact Submissions

**Endpoint:** `GET /api/contact`
**Access:** Admin only

**Query Parameters:**
- `status` - Filter by status (new, read, replied, archived)
- `limit` - Number of results
- `search` - Search term

**Success Response (200):**
```json
{
  "success": true,
  "total": 50,
  "count": 20,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Inquiry",
      "message": "I would like to know...",
      "status": "new",
      "createdAt": "2025-01-15T10:00:00.000Z"
    }
  ]
}
```

---

### Update Contact Status

**Endpoint:** `PUT /api/contact/:id`
**Access:** Admin only

**Request Body:**
```json
{
  "status": "replied"
}
```

---

## Error Responses

### 400 - Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 403 - Forbidden
```json
{
  "success": false,
  "message": "User role 'user' is not authorized to access this route"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 - Server Error
```json
{
  "success": false,
  "message": "Server Error"
}
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. Consider adding rate limiting for production using packages like `express-rate-limit`.

---

## CORS

CORS is enabled for all origins in development. For production, configure specific allowed origins in the server configuration.

---

## Testing with cURL

### Register and Login
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@chciihub.com","password":"Admin@123456","role":"admin"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@chciihub.com","password":"Admin@123456"}'
```

### Protected Routes
```bash
# Get current user
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create blog
curl -X POST http://localhost:5000/api/blog \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test Blog","content":"Test content","status":"published"}'
```

---

## Notes

- All dates should be in ISO 8601 format
- All authenticated requests require the `Authorization: Bearer <token>` header
- Admin-only routes will return 403 if accessed by non-admin users
- The `slug` field for blog posts is auto-generated from the title if not provided
- Blog post `views` are automatically incremented when accessed
- Newsletter emails must be unique
- Contact submissions are automatically marked as "new" and can be updated by admins

---

For more information, see the [README.md](README.md) file.
