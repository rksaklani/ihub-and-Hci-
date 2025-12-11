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
  origin:  process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors({
  origin:  process.env.FRONTEND_URL,
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

// New admin module routes
const courseRoutes = require('./routes/courseRoutes');
const callForInnovationRoutes = require('./routes/callForInnovationRoutes');
const careerRoutes = require('./routes/careerRoutes');
const incubationRoutes = require('./routes/incubationRoutes');
const collaborationRoutes = require('./routes/collaborationRoutes');
const projectRoutes = require('./routes/projectRoutes');
const newsRoutes = require('./routes/newsRoutes');
const workshopRoutes = require('./routes/workshopRoutes');
const tenderRoutes = require('./routes/tenderRoutes');
const visitRoutes = require('./routes/visitRoutes');
const infrastructureRoutes = require('./routes/infrastructureRoutes');
const procurementPolicyRoutes = require('./routes/procurementPolicyRoutes');
const auditReportRoutes = require('./routes/auditReportRoutes');
const skillDevelopmentRoutes = require('./routes/skillDevelopmentRoutes');

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

// New admin module routes
app.use('/api/courses', courseRoutes);
app.use('/api/call-for-innovation', callForInnovationRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/incubation', incubationRoutes);
app.use('/api/collaborations', collaborationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/api/tenders', tenderRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/infrastructure', infrastructureRoutes);
app.use('/api/procurement-policy', procurementPolicyRoutes);
app.use('/api/audit-reports', auditReportRoutes);
app.use('/api/skill-development', skillDevelopmentRoutes);

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
