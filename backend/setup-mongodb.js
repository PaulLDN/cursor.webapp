#!/usr/bin/env node

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: './config.env' });

// Import models
const User = require('./src/models/User');
const Course = require('./src/models/Course');

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    return false;
  }
};

// Setup demo data
const setupDemoData = async () => {
  try {
    console.log('🔄 Setting up demo data...');

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const hashedPassword = await bcrypt.hash('password', 10);
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('👤 Created admin user');

    // Create student user
    const studentUser = await User.create({
      name: 'Arden Student',
      email: 'student@example.com',
      password: hashedPassword,
      role: 'student'
    });
    console.log('👤 Created student user');

    // Create GDPR course
    const gdprCourse = await Course.create({
      title: 'GDPR Compliance Fundamentals',
      description: 'Comprehensive training on the General Data Protection Regulation (GDPR), covering key principles, rights, obligations, and practical implementation strategies for organizations.',
      shortDescription: 'Master GDPR compliance with practical examples and real-world scenarios.',
      duration: 120,
      level: 'intermediate',
      tags: ['Compliance', 'Privacy', 'Legal', 'Data Protection'],
      heroImage: '/api/placeholder/600/400',
      isPublished: true,
      createdBy: adminUser._id,
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
        },
        {
          title: 'Key Principles of GDPR',
          description: 'The seven fundamental principles that guide GDPR compliance',
          type: 'text',
          content: 'GDPR is built on seven key principles: Lawfulness, fairness and transparency; Purpose limitation; Data minimisation; Accuracy; Storage limitation; Integrity and confidentiality; Accountability.',
          duration: 25,
          order: 3,
          isPublished: true
        }
      ]
    });
    console.log('📚 Created GDPR course with 3 lessons');

    // Create Web Security course
    const securityCourse = await Course.create({
      title: 'Web Security Fundamentals',
      description: 'Essential web security concepts covering common vulnerabilities, attack vectors, and defense strategies. Learn to protect web applications from modern threats.',
      shortDescription: 'Master web security essentials and protect against common vulnerabilities.',
      duration: 90,
      level: 'beginner',
      tags: ['Security', 'Web Development', 'Cybersecurity', 'OWASP'],
      heroImage: '/api/placeholder/600/400',
      isPublished: true,
      createdBy: adminUser._id,
      lessons: [
        {
          title: 'Introduction to Web Security',
          description: 'Understanding the importance of web security in today\'s digital world',
          type: 'text',
          content: 'Web security is the practice of protecting websites, web applications, and web services from various cyber threats.',
          duration: 15,
          order: 1,
          isPublished: true
        },
        {
          title: 'HTTPS and SSL/TLS',
          description: 'Understanding encryption and secure communication',
          type: 'text',
          content: 'HTTPS (HTTP Secure) encrypts data between the browser and server using SSL/TLS protocols.',
          duration: 20,
          order: 2,
          isPublished: true
        }
      ]
    });
    console.log('📚 Created Web Security course with 2 lessons');

    console.log('✅ Demo data setup completed successfully!');
    console.log(`📊 Created ${await User.countDocuments()} users and ${await Course.countDocuments()} courses`);

  } catch (error) {
    console.error('❌ Error setting up demo data:', error);
  }
};

// Main function
const main = async () => {
  console.log('🚀 Starting MongoDB setup...');
  
  const connected = await connectDB();
  if (!connected) {
    console.log('❌ Failed to connect to MongoDB. Please check your connection string.');
    process.exit(1);
  }

  await setupDemoData();
  
  console.log('🎉 Setup completed! You can now start your server.');
  process.exit(0);
};

// Run setup
main().catch(console.error);









