# CHCi iHub Backend Architecture

Visual representation of the backend system architecture and data flow.

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND (Next.js)                          │
│                    Port: 3000                                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Public Pages  │  Admin Panel  │  Forms  │  API Client   │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP Requests
                             │ (Axios with Bearer Token)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   BACKEND API (Express.js)                       │
│                        Port: 5000                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                      Middleware Layer                     │  │
│  │  ┌──────────┬──────────────┬─────────────┬────────────┐ │  │
│  │  │   CORS   │   Body Parser│   Morgan    │  Error     │ │  │
│  │  │  Enabled │   JSON/URL   │  Logging    │  Handler   │ │  │
│  │  └──────────┴──────────────┴─────────────┴────────────┘ │  │
│  └──────────────────────────────────────────────────────────┘  │
│                             │                                    │
│  ┌──────────────────────────▼────────────────────────────────┐ │
│  │                    Authentication                         │ │
│  │  ┌────────────────────────────────────────────────────┐  │ │
│  │  │  JWT Verification  │  Role Authorization (protect) │  │ │
│  │  └────────────────────────────────────────────────────┘  │ │
│  └──────────────────────────────────────────────────────────┘ │
│                             │                                    │
│  ┌──────────────────────────▼────────────────────────────────┐ │
│  │                       Routes Layer                        │ │
│  │  /api/auth          /api/blog         /api/events        │ │
│  │  /api/announcements /api/faculty      /api/researchers   │ │
│  │  /api/staff         /api/newsletter   /api/contact       │ │
│  └──────────────────────────┬────────────────────────────────┘ │
│                             │                                    │
│  ┌──────────────────────────▼────────────────────────────────┐ │
│  │                    Controllers Layer                      │ │
│  │  ┌──────────────────────────────────────────────────────┐│ │
│  │  │ authController    blogController    eventController  ││ │
│  │  │ announcementCtrl  teamController    newsletterCtrl   ││ │
│  │  │ contactController                                    ││ │
│  │  └──────────────────────┬───────────────────────────────┘│ │
│  └────────────────────────────────────────────────────────────┘│
│                             │                                    │
│  ┌──────────────────────────▼────────────────────────────────┐ │
│  │                      Models Layer (Mongoose)              │ │
│  │  ┌──────────────────────────────────────────────────────┐│ │
│  │  │  User    Blog    Event    Announcement   Faculty     ││ │
│  │  │  Researcher  Staff   Newsletter   Contact            ││ │
│  │  │  - Schema Validation                                 ││ │
│  │  │  - Pre-save Hooks                                    ││ │
│  │  │  - Indexes                                           ││ │
│  │  └──────────────────────┬───────────────────────────────┘│ │
│  └────────────────────────────────────────────────────────────┘│
└────────────────────────────┬────────────────────────────────────┘
                             │ Mongoose ODM
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     MongoDB Database                             │
│              mongodb+srv://cluster.mongodb.net                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Collections:                                            │  │
│  │  • users          • blogs           • events            │  │
│  │  • announcements  • faculties       • researchers       │  │
│  │  • staffs         • newsletters     • contacts          │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Request Flow Diagram

### Public Request (e.g., Get Blogs)

```
Frontend                Backend              Middleware          Controller          Model              Database
   |                       |                      |                  |                 |                   |
   |--GET /api/blog------->|                      |                  |                 |                   |
   |                       |---CORS Check-------->|                  |                 |                   |
   |                       |<--Allow------------- |                  |                 |                   |
   |                       |---Parse Query------->|                  |                 |                   |
   |                       |                      |                  |                 |                   |
   |                       |---Route to blogRoutes|                  |                 |                   |
   |                       |                      |                  |                 |                   |
   |                       |----------------------|--getAllBlogs()-->|                 |                   |
   |                       |                      |                  |--Blog.find()--->|                   |
   |                       |                      |                  |                 |--Query----------->|
   |                       |                      |                  |                 |<-Results----------|
   |                       |                      |                  |<-Data-----------|                   |
   |                       |                      |<-Response--------|                 |                   |
   |<--JSON Response-------|                      |                  |                 |                   |
   |  {success, data}      |                      |                  |                 |                   |
```

### Protected Request (e.g., Create Blog - Admin Only)

```
Frontend                Backend              Auth Middleware     Controller          Model              Database
   |                       |                      |                  |                 |                   |
   |--POST /api/blog------>|                      |                  |                 |                   |
   | Bearer <token>        |                      |                  |                 |                   |
   |                       |---Extract Token----->|                  |                 |                   |
   |                       |                      |--Verify JWT------|                 |                   |
   |                       |                      |--Get User--------|                 |                   |
   |                       |                      |                  |                 |                   |
   |                       |                      |--Check Role------|                 |                   |
   |                       |                      | (admin?)         |                 |                   |
   |                       |                      |--✓ Authorized--->|                 |                   |
   |                       |                      |                  |                 |                   |
   |                       |----------------------|--createBlog()-->>|                 |                   |
   |                       |                      |                  |--Validate-------|                   |
   |                       |                      |                  |--Blog.create()-->|                   |
   |                       |                      |                  |                 |--Insert---------->|
   |                       |                      |                  |                 |<-Saved Doc--------|
   |                       |                      |                  |<-New Blog-------|                   |
   |                       |                      |<-Response--------|                 |                   |
   |<--JSON Response-------|                      |                  |                 |                   |
   |  {success, data}      |                      |                  |                 |                   |
```

## Authentication Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    Registration Flow                         │
└──────────────────────────────────────────────────────────────┘

 User Input                                         Database
    │                                                   │
    │ username, email, password                        │
    ▼                                                   │
┌────────────────────┐                                │
│  Validation Check  │                                │
│  - Email format    │                                │
│  - Password length │                                │
└─────────┬──────────┘                                │
          │                                            │
          ▼                                            │
┌────────────────────┐                                │
│  Check Duplicate   │──────Query User──────────────>│
│  email/username    │<─────Result──────────────────│
└─────────┬──────────┘                                │
          │                                            │
          ▼                                            │
┌────────────────────┐                                │
│  Hash Password     │                                │
│  (bcrypt + salt)   │                                │
└─────────┬──────────┘                                │
          │                                            │
          ▼                                            │
┌────────────────────┐                                │
│  Save User to DB   │─────Insert User──────────────>│
└─────────┬──────────┘                                │
          │                                            │
          ▼                                            │
┌────────────────────┐                                │
│  Generate JWT      │                                │
│  (user._id + role) │                                │
└─────────┬──────────┘                                │
          │                                            │
          ▼                                            │
    Return: { token, user }


┌──────────────────────────────────────────────────────────────┐
│                       Login Flow                             │
└──────────────────────────────────────────────────────────────┘

 User Input                                         Database
    │                                                   │
    │ email, password                                  │
    ▼                                                   │
┌────────────────────┐                                │
│  Find User by      │─────Query User──────────────>│
│  Email (+password) │<────User Document────────────│
└─────────┬──────────┘                                │
          │                                            │
          ▼                                            │
┌────────────────────┐                                │
│  User Exists?      │                                │
└─────────┬──────────┘                                │
          │ Yes                                        │
          ▼                                            │
┌────────────────────┐                                │
│  Compare Password  │                                │
│  bcrypt.compare()  │                                │
└─────────┬──────────┘                                │
          │ Match                                      │
          ▼                                            │
┌────────────────────┐                                │
│  Generate JWT      │                                │
│  (user._id + role) │                                │
└─────────┬──────────┘                                │
          │                                            │
          ▼                                            │
    Return: { token, user }


┌──────────────────────────────────────────────────────────────┐
│              Protected Route Access Flow                     │
└──────────────────────────────────────────────────────────────┘

 Request with Token                                 Database
    │                                                   │
    │ Authorization: Bearer <token>                    │
    ▼                                                   │
┌────────────────────┐                                │
│  Extract Token     │                                │
│  from Header       │                                │
└─────────┬──────────┘                                │
          │                                            │
          ▼                                            │
┌────────────────────┐                                │
│  Verify JWT        │                                │
│  jwt.verify()      │                                │
└─────────┬──────────┘                                │
          │ Valid                                      │
          ▼                                            │
┌────────────────────┐                                │
│  Get User from DB  │─────Query User──────────────>│
│  (decoded.id)      │<────User Document────────────│
└─────────┬──────────┘                                │
          │                                            │
          ▼                                            │
┌────────────────────┐                                │
│  Check User Role   │                                │
│  (if required)     │                                │
└─────────┬──────────┘                                │
          │ Authorized                                 │
          ▼                                            │
    Attach user to req.user
    Continue to Controller
```

## Data Model Relationships

```
┌─────────────────────────────────────────────────────────────┐
│                     Database Schema                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────┐
│    User     │
├─────────────┤
│ _id         │ (Primary Key)
│ username    │ (Unique)
│ email       │ (Unique)
│ password    │ (Hashed)
│ role        │ (admin/user)
│ createdAt   │
│ updatedAt   │
└─────────────┘
      │
      │ Created by (implicit, not stored)
      ▼
┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│    Blog     │    │    Event     │    │ Announcement │
├─────────────┤    ├──────────────┤    ├──────────────┤
│ _id         │    │ _id          │    │ _id          │
│ title       │    │ title        │    │ title        │
│ slug        │    │ eventDate    │    │ content      │
│ content     │    │ location     │    │ status       │
│ status      │    │ description  │    │ priority     │
│ tags[]      │    │ status       │    │ createdAt    │
│ views       │    │ createdAt    │    │ updatedAt    │
│ createdAt   │    │ updatedAt    │    └──────────────┘
│ updatedAt   │    └──────────────┘
└─────────────┘

┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│   Faculty   │    │  Researcher  │    │    Staff     │
├─────────────┤    ├──────────────┤    ├──────────────┤
│ _id         │    │ _id          │    │ _id          │
│ name        │    │ name         │    │ name         │
│ designation │    │ designation  │    │ position     │
│ email       │    │ email        │    │ email        │
│ department  │    │ researchArea │    │ department   │
│ category    │    │ category     │    │ category     │
│ socialLinks │    │ socialLinks  │    │ bio          │
│ createdAt   │    │ createdAt    │    │ createdAt    │
│ updatedAt   │    │ updatedAt    │    │ updatedAt    │
└─────────────┘    └──────────────┘    └──────────────┘

┌─────────────┐    ┌──────────────┐
│ Newsletter  │    │   Contact    │
├─────────────┤    ├──────────────┤
│ _id         │    │ _id          │
│ email       │    │ name         │
│ status      │    │ email        │
│ subscribedAt│    │ subject      │
│ createdAt   │    │ message      │
│ updatedAt   │    │ status       │
└─────────────┘    │ readAt       │
                   │ createdAt    │
                   │ updatedAt    │
                   └──────────────┘
```

## Folder Structure Breakdown

```
backend/
│
├── config/                      # Configuration Files
│   └── database.js              # MongoDB connection setup
│
├── controllers/                 # Business Logic Layer
│   ├── authController.js        # User authentication operations
│   ├── blogController.js        # Blog CRUD + slug handling
│   ├── eventController.js       # Event management
│   ├── announcementController.js# Announcement management
│   ├── teamController.js        # Faculty, Researcher, Staff CRUD
│   ├── newsletterController.js  # Newsletter subscriptions
│   └── contactController.js     # Contact form handling
│
├── middleware/                  # Express Middleware
│   ├── auth.js                  # JWT verification & role check
│   ├── errorHandler.js          # Global error handling
│   └── validator.js             # Validation result checker
│
├── models/                      # Database Models (Mongoose Schemas)
│   ├── User.js                  # User schema with password hashing
│   ├── Blog.js                  # Blog schema with auto-slug
│   ├── Event.js                 # Event schema
│   ├── Announcement.js          # Announcement schema
│   ├── Faculty.js               # Faculty schema
│   ├── Researcher.js            # Researcher schema
│   ├── Staff.js                 # Staff schema
│   ├── Newsletter.js            # Newsletter subscription schema
│   └── Contact.js               # Contact submission schema
│
├── routes/                      # API Route Definitions
│   ├── authRoutes.js            # Auth endpoints + validation
│   ├── blogRoutes.js            # Blog endpoints (public + protected)
│   ├── eventRoutes.js           # Event endpoints
│   ├── announcementRoutes.js    # Announcement endpoints
│   ├── facultyRoutes.js         # Faculty endpoints
│   ├── researcherRoutes.js      # Researcher endpoints
│   ├── staffRoutes.js           # Staff endpoints
│   ├── newsletterRoutes.js      # Newsletter endpoints
│   └── contactRoutes.js         # Contact endpoints
│
├── scripts/                     # Utility Scripts
│   ├── seedAdmin.js             # Create default admin user
│   ├── seedSampleData.js        # Populate sample content
│   └── clearDatabase.js         # Clear all collections
│
├── utils/                       # Helper Functions
│   ├── generateToken.js         # JWT token generation
│   ├── slugify.js               # URL slug creator
│   ├── responseHelper.js        # Response formatters
│   └── emailValidator.js        # Email validation utilities
│
├── .env                         # Environment variables (DO NOT COMMIT)
├── .env.example                 # Environment template
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies & scripts
├── server.js                    # Application entry point
│
├── README.md                    # Complete documentation
├── API_DOCUMENTATION.md         # API reference guide
├── GETTING_STARTED.md           # Quick start guide
├── ARCHITECTURE.md              # This file
├── PROJECT_SUMMARY.md           # Project overview
└── postman_collection.json      # Postman API collection
```

## API Endpoint Structure

```
/api
├── /auth                    # Authentication
│   ├── POST   /register     # Create new user
│   ├── POST   /login        # Get JWT token
│   ├── GET    /me           # Get current user (Protected)
│   └── PUT    /updatepassword # Change password (Protected)
│
├── /blog                    # Blog Management
│   ├── GET    /             # Get all blogs
│   ├── GET    /:id          # Get blog by ID
│   ├── GET    /slug/:slug   # Get blog by slug
│   ├── POST   /             # Create blog (Admin)
│   ├── PUT    /:id          # Update blog (Admin)
│   └── DELETE /:id          # Delete blog (Admin)
│
├── /events                  # Event Management
│   ├── GET    /             # Get all events
│   ├── GET    /:id          # Get event by ID
│   ├── POST   /             # Create event (Admin)
│   ├── PUT    /:id          # Update event (Admin)
│   └── DELETE /:id          # Delete event (Admin)
│
├── /announcements           # Announcement Management
│   ├── GET    /             # Get all announcements
│   ├── GET    /:id          # Get announcement by ID
│   ├── POST   /             # Create announcement (Admin)
│   ├── PUT    /:id          # Update announcement (Admin)
│   └── DELETE /:id          # Delete announcement (Admin)
│
├── /faculty                 # Faculty Management
│   ├── GET    /             # Get all faculty
│   ├── GET    /:id          # Get faculty by ID
│   ├── POST   /             # Create faculty (Admin)
│   ├── PUT    /:id          # Update faculty (Admin)
│   └── DELETE /:id          # Delete faculty (Admin)
│
├── /researchers             # Researcher Management
│   ├── GET    /             # Get all researchers
│   ├── GET    /:id          # Get researcher by ID
│   ├── POST   /             # Create researcher (Admin)
│   ├── PUT    /:id          # Update researcher (Admin)
│   └── DELETE /:id          # Delete researcher (Admin)
│
├── /staff                   # Staff Management
│   ├── GET    /             # Get all staff
│   ├── GET    /:id          # Get staff by ID
│   ├── POST   /             # Create staff (Admin)
│   ├── PUT    /:id          # Update staff (Admin)
│   └── DELETE /:id          # Delete staff (Admin)
│
├── /newsletter              # Newsletter
│   ├── POST   /             # Subscribe
│   ├── PUT    /unsubscribe  # Unsubscribe
│   ├── GET    /             # Get all subscriptions (Admin)
│   └── DELETE /:id          # Delete subscription (Admin)
│
└── /contact                 # Contact Form
    ├── POST   /             # Submit contact form
    ├── GET    /             # Get all contacts (Admin)
    ├── GET    /:id          # Get contact by ID (Admin)
    ├── PUT    /:id          # Update contact status (Admin)
    └── DELETE /:id          # Delete contact (Admin)
```

## Technology Stack

```
┌─────────────────────────────────────────────────┐
│              Technology Stack                    │
└─────────────────────────────────────────────────┘

┌──────────────┐
│   Runtime    │  Node.js v14+
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Framework  │  Express.js 4.x
└──────┬───────┘
       │
       ├──────────────┬──────────────┬──────────────┐
       │              │              │              │
       ▼              ▼              ▼              ▼
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ Database │  │   Auth   │  │Validation│  │  Utils   │
│          │  │          │  │          │  │          │
│ Mongoose │  │   JWT    │  │ express- │  │  bcrypt  │
│   8.x    │  │jsonweb   │  │validator │  │   cors   │
│          │  │ token    │  │          │  │  morgan  │
└────┬─────┘  └──────────┘  └──────────┘  └──────────┘
     │
     ▼
┌──────────────┐
│   MongoDB    │  v4.4+ (Local or Atlas)
└──────────────┘
```

---

This architecture provides a scalable, maintainable, and secure foundation for the CHCi iHub application.
