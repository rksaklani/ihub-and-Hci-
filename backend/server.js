// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const dotenv = require('dotenv');
// const connectDB = require('./config/database');

// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();

// // Initialize Express app
// const app = express();

// // Middleware
// app.use(cors({
//   origin: "*",
//   methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
//   allowedHeaders: "*"
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(morgan('dev'));

// // Import routes
// const authRoutes = require('./routes/authRoutes');
// const blogRoutes = require('./routes/blogRoutes');
// const eventRoutes = require('./routes/eventRoutes');
// const announcementRoutes = require('./routes/announcementRoutes');
// const facultyRoutes = require('./routes/facultyRoutes');
// const researcherRoutes = require('./routes/researcherRoutes');
// const staffRoutes = require('./routes/staffRoutes');
// const newsletterRoutes = require('./routes/newsletterRoutes');
// const contactRoutes = require('./routes/contactRoutes');

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/blog', blogRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/announcements', announcementRoutes);
// app.use('/api/faculty', facultyRoutes);
// app.use('/api/researchers', researcherRoutes);
// app.use('/api/staff', staffRoutes);
// app.use('/api/newsletter', newsletterRoutes);
// app.use('/api/contact', contactRoutes);

// // Health check route
// app.get('/api/health', (req, res) => {
//   res.json({
//     success: true,
//     message: 'CHCi iHub Backend API is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // Root route
// app.get('/', (req, res) => {
//   res.json({
//     message: 'Welcome to CHCi iHub Backend API',
//     version: '1.0.0',
//     endpoints: {
//       auth: '/api/auth',
//       blog: '/api/blog',
//       events: '/api/events',
//       announcements: '/api/announcements',
//       faculty: '/api/faculty',
//       researchers: '/api/researchers',
//       staff: '/api/staff',
//       newsletter: '/api/newsletter',
//       contact: '/api/contact'
//     }
//   });
// });

// // Error handling middleware (must be last)
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || 'Internal Server Error',
//     ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found'
//   });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`
//     ╔═══════════════════════════════════════════╗
//     ║  iHub Backend API Server Running on iHub  ║
//     ║  Port: ${PORT}                            ║
//     ║  Environment: ${process.env.NODE_ENV || 'development'}              ║
//     ╚═══════════════════════════════════════════╝
//   `);
// });

// module.exports = app;



const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// ----- FIXED CORS CONFIG -----
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors({
  origin: "http://localhost:3000",
  credentials: true
}));
// --------------------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Import routes
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const eventRoutes = require('./routes/eventRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const researcherRoutes = require('./routes/researcherRoutes');
const staffRoutes = require('./routes/staffRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');
const contactRoutes = require('./routes/contactRoutes');

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/researchers', researcherRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'CHCi iHub Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// Root
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to CHCi iHub Backend API',
    version: '1.0.0'
  });
});

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
    ╔═══════════════════════════════════════════╗
    ║  iHub Backend API Server Running on iHub  ║
    ║  Port: ${PORT}                            ║
    ║  Environment: ${process.env.NODE_ENV || 'development'}              ║
    ╚═══════════════════════════════════════════╝
  `);
});

module.exports = app;
