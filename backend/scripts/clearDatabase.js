const mongoose = require('mongoose');
const dotenv = require('dotenv');
const readline = require('readline');
const User = require('../models/User');
const Blog = require('../models/Blog');
const Event = require('../models/Event');
const Announcement = require('../models/Announcement');
const Faculty = require('../models/Faculty');
const Researcher = require('../models/Researcher');
const Staff = require('../models/Staff');
const Newsletter = require('../models/Newsletter');
const Contact = require('../models/Contact');

// Load environment variables
dotenv.config();

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

// Clear database
const clearDatabase = async () => {
  try {
    await connectDB();

    console.log('\n⚠️  WARNING: This will delete ALL data from the database!\n');

    rl.question('Are you sure you want to continue? (yes/no): ', async (answer) => {
      if (answer.toLowerCase() === 'yes') {
        console.log('\nClearing database...\n');

        const results = await Promise.all([
          User.deleteMany({}),
          Blog.deleteMany({}),
          Event.deleteMany({}),
          Announcement.deleteMany({}),
          Faculty.deleteMany({}),
          Researcher.deleteMany({}),
          Staff.deleteMany({}),
          Newsletter.deleteMany({}),
          Contact.deleteMany({})
        ]);

        console.log(`✅ Deleted ${results[0].deletedCount} users`);
        console.log(`✅ Deleted ${results[1].deletedCount} blogs`);
        console.log(`✅ Deleted ${results[2].deletedCount} events`);
        console.log(`✅ Deleted ${results[3].deletedCount} announcements`);
        console.log(`✅ Deleted ${results[4].deletedCount} faculty members`);
        console.log(`✅ Deleted ${results[5].deletedCount} researchers`);
        console.log(`✅ Deleted ${results[6].deletedCount} staff members`);
        console.log(`✅ Deleted ${results[7].deletedCount} newsletter subscriptions`);
        console.log(`✅ Deleted ${results[8].deletedCount} contact submissions`);

        console.log('\n✅ Database cleared successfully!\n');
      } else {
        console.log('\n❌ Operation cancelled\n');
      }

      rl.close();
      process.exit(0);
    });
  } catch (error) {
    console.error('Error clearing database:', error.message);
    rl.close();
    process.exit(1);
  }
};

// Run the script
clearDatabase();
