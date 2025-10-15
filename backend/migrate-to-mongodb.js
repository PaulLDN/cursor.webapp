const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './config.env' });

// Import models
const User = require('./src/models/User');
const Course = require('./src/models/Course');
const UserProgress = require('./src/models/UserProgress');
const Certificate = require('./src/models/Certificate');

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Demo data
const demoUsers = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password',
    role: 'admin'
  },
  {
    name: 'Arden Student',
    email: 'student@example.com',
    password: 'password',
    role: 'student'
  }
];

const demoCourses = [
  {
    title: 'GDPR Compliance Fundamentals',
    description: 'Comprehensive training on the General Data Protection Regulation (GDPR), covering key principles, rights, obligations, and practical implementation strategies for organizations.',
    shortDescription: 'Master GDPR compliance with practical examples and real-world scenarios.',
    duration: 120,
    level: 'intermediate',
    tags: ['Compliance', 'Privacy', 'Legal', 'Data Protection'],
    heroImage: '/api/placeholder/600/400',
    isPublished: true,
    lessons: [
      {
        title: 'Introduction to GDPR',
        description: 'Learn the basics of GDPR and its importance for organizations',
        type: 'text',
        content: 'The General Data Protection Regulation (GDPR) is a comprehensive data protection law that came into effect on May 25, 2018. It applies to all organizations that process personal data of EU residents, regardless of where the organization is located.',
        duration: 15,
        order: 1,
        isPublished: true
      },
      {
        title: 'What is Personal Data?',
        description: 'Understanding what constitutes personal data under GDPR',
        type: 'text',
        content: 'Personal data is any information relating to an identified or identifiable natural person. This includes names, email addresses, phone numbers, IP addresses, and even behavioral data.',
        duration: 20,
        order: 2,
        isPublished: true
      }
      // Add more lessons as needed
    ]
  },
  {
    title: 'Web Security Fundamentals',
    description: 'Essential web security concepts covering common vulnerabilities, attack vectors, and defense strategies. Learn to protect web applications from modern threats.',
    shortDescription: 'Master web security essentials and protect against common vulnerabilities.',
    duration: 90,
    level: 'beginner',
    tags: ['Security', 'Web Development', 'Cybersecurity', 'OWASP'],
    heroImage: '/api/placeholder/600/400',
    isPublished: true,
    lessons: [
      {
        title: 'Introduction to Web Security',
        description: 'Understanding the importance of web security in today\'s digital world',
        type: 'text',
        content: 'Web security is the practice of protecting websites, web applications, and web services from various cyber threats.',
        duration: 15,
        order: 1,
        isPublished: true
      }
      // Add more lessons as needed
    ]
  }
];

// Migration function
const migrateData = async () => {
  try {
    console.log('Starting migration to MongoDB...');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await UserProgress.deleteMany({});
    await Certificate.deleteMany({});

    console.log('Cleared existing data');

    // Create users
    const hashedPassword = await bcrypt.hash('password', 10);
    const users = [];
    
    for (const userData of demoUsers) {
      const user = await User.create({
        ...userData,
        password: hashedPassword
      });
      users.push(user);
      console.log(`Created user: ${user.email}`);
    }

    // Create courses
    const courses = [];
    for (const courseData of demoCourses) {
      const course = await Course.create({
        ...courseData,
        createdBy: users[0]._id // Admin user
      });
      courses.push(course);
      console.log(`Created course: ${course.title}`);
    }

    console.log('Migration completed successfully!');
    console.log(`Created ${users.length} users and ${courses.length} courses`);

  } catch (error) {
    console.error('Migration error:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run migration
connectDB().then(() => {
  migrateData();
});









