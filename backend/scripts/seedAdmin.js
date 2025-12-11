const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

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

// Create admin user
const createAdminUser = async () => {
  try {
    await connectDB();

    // Check if admin user already exists
    const adminExists = await User.findOne({ email: 'admin@chciihub.com' });

    if (adminExists) {
      console.log('Admin user already exists!');
      console.log('Email:', adminExists.email);
      console.log('Username:', adminExists.username);
      process.exit(0);
    }

    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'rohit@ihubiitmandi.in',
      password: 'rohit@ihubiitmandi.in',
      role: 'admin'
    });

    console.log('\n✅ Admin user created successfully!\n');
    console.log('=================================');
    console.log('Email:', adminUser.email);
    console.log('Username:', adminUser.username);
    console.log('Password: rohit@ihubiitmandi.in');
    console.log('Role:', adminUser.role);
    console.log('=================================');
    console.log('\n⚠️  IMPORTANT: Change the password after first login!\n');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error.message);
    process.exit(1);
  }
};

// Run the script
createAdminUser();
