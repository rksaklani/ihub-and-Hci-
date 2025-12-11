const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('../models/Blog');
const Event = require('../models/Event');
const Announcement = require('../models/Announcement');
const Faculty = require('../models/Faculty');
const Researcher = require('../models/Researcher');
const Staff = require('../models/Staff');

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Sample data
const sampleBlogs = [
  {
    title: 'Welcome to CHCi iHub IIT Mandi',
    slug: 'welcome-to-chci-ihub-iit-mandi',
    excerpt: 'Introducing the Center for Healthcare Innovation at IIT Mandi',
    content: 'The Center for Healthcare Innovation (CHCi) at IIT Mandi is dedicated to advancing healthcare technology and innovation. Our mission is to develop cutting-edge solutions for healthcare challenges...',
    categoryName: 'Innovation',
    tags: ['healthcare', 'innovation', 'technology'],
    status: 'published',
    views: 0,
    publishedAt: new Date()
  },
  {
    title: 'Latest Research in Medical Technology',
    slug: 'latest-research-in-medical-technology',
    excerpt: 'Exploring breakthroughs in medical technology research',
    content: 'Our research team has been working on innovative medical devices and healthcare solutions. Recent developments include...',
    categoryName: 'Research',
    tags: ['research', 'medical technology', 'innovation'],
    status: 'published',
    views: 0,
    publishedAt: new Date()
  }
];

const sampleEvents = [
  {
    title: 'Healthcare Innovation Summit 2025',
    eventDate: new Date('2025-03-15'),
    location: 'IIT Mandi Campus',
    description: 'Join us for a day of innovation and collaboration in healthcare technology',
    status: 'upcoming'
  },
  {
    title: 'Workshop on Medical Devices',
    eventDate: new Date('2025-02-20'),
    location: 'CHCi Lab, IIT Mandi',
    description: 'Hands-on workshop on designing and prototyping medical devices',
    status: 'upcoming'
  }
];

const sampleAnnouncements = [
  {
    title: 'Call for Research Proposals',
    content: 'CHCi is inviting research proposals for healthcare innovation projects. Deadline: March 31, 2025',
    status: 'active',
    priority: 'high'
  },
  {
    title: 'New Fellowship Program Launched',
    content: 'We are excited to announce the launch of our new fellowship program for healthcare innovation',
    status: 'active',
    priority: 'medium'
  }
];

const sampleFaculty = [
  {
    name: 'Dr. Rajesh Kumar',
    designation: 'Director, CHCi',
    email: 'rajesh.kumar@iitmandi.ac.in',
    department: 'Biomedical Engineering',
    category: 'Core Faculty',
    bio: 'Expert in medical device innovation and healthcare technology'
  },
  {
    name: 'Dr. Priya Sharma',
    designation: 'Professor',
    email: 'priya.sharma@iitmandi.ac.in',
    department: 'Computer Science',
    category: 'Core Faculty',
    bio: 'Specializes in AI applications in healthcare'
  }
];

const sampleResearchers = [
  {
    name: 'Dr. Amit Verma',
    designation: 'Senior Research Fellow',
    email: 'amit.verma@iitmandi.ac.in',
    researchArea: 'Medical Imaging',
    category: 'Research Fellow',
    bio: 'Working on advanced medical imaging techniques'
  }
];

const sampleStaff = [
  {
    name: 'Ravi Patel',
    position: 'Lab Manager',
    email: 'ravi.patel@iitmandi.ac.in',
    department: 'CHCi Lab',
    category: 'Technical Staff',
    bio: 'Managing laboratory operations and equipment'
  }
];

// Seed function
const seedData = async () => {
  try {
    await connectDB();

    console.log('\n🌱 Starting to seed sample data...\n');

    // Clear existing data
    console.log('Clearing existing data...');
    await Blog.deleteMany({});
    await Event.deleteMany({});
    await Announcement.deleteMany({});
    await Faculty.deleteMany({});
    await Researcher.deleteMany({});
    await Staff.deleteMany({});

    // Insert sample data
    console.log('Inserting sample blogs...');
    await Blog.insertMany(sampleBlogs);
    console.log(`✅ ${sampleBlogs.length} blogs created`);

    console.log('Inserting sample events...');
    await Event.insertMany(sampleEvents);
    console.log(`✅ ${sampleEvents.length} events created`);

    console.log('Inserting sample announcements...');
    await Announcement.insertMany(sampleAnnouncements);
    console.log(`✅ ${sampleAnnouncements.length} announcements created`);

    console.log('Inserting sample faculty...');
    await Faculty.insertMany(sampleFaculty);
    console.log(`✅ ${sampleFaculty.length} faculty members created`);

    console.log('Inserting sample researchers...');
    await Researcher.insertMany(sampleResearchers);
    console.log(`✅ ${sampleResearchers.length} researchers created`);

    console.log('Inserting sample staff...');
    await Staff.insertMany(sampleStaff);
    console.log(`✅ ${sampleStaff.length} staff members created`);

    console.log('\n✅ Sample data seeded successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error.message);
    process.exit(1);
  }
};

// Run the script
seedData();
