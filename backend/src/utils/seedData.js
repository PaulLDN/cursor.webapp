const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('../models/Course');
const User = require('../models/User');

// Load env vars
dotenv.config({ path: './config.env' });

// Connect to database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // Clear existing data
    await Course.deleteMany({});
    await User.deleteMany({});

    // Create demo users
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password',
      role: 'admin'
    });

    const studentUser = await User.create({
      name: 'John Student',
      email: 'student@example.com',
      password: 'password',
      role: 'student'
    });

    // GDPR Course
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
      syllabus: [
        {
          title: 'Introduction to GDPR',
          content: 'The General Data Protection Regulation (GDPR) is a comprehensive data protection law that came into effect on May 25, 2018. It applies to all organizations that process personal data of EU residents, regardless of where the organization is located.',
          order: 1
        },
        {
          title: 'What is Personal Data?',
          content: 'Personal data is any information relating to an identified or identifiable natural person. This includes:\n\n• Names and identification numbers\n• Location data and online identifiers\n• Biometric data\n• Health information\n• Economic, cultural, or social identity data',
          order: 2
        },
        {
          title: 'Key Principles of GDPR',
          content: 'GDPR is built on seven key principles:\n\n1. **Lawfulness, fairness and transparency**\n2. **Purpose limitation**\n3. **Data minimisation**\n4. **Accuracy**\n5. **Storage limitation**\n6. **Integrity and confidentiality**\n7. **Accountability**',
          order: 3
        },
        {
          title: 'Legal Basis for Processing',
          content: 'You must have a legal basis for processing personal data:\n\n• **Consent** - Clear, informed, and freely given\n• **Contract** - Necessary for contract performance\n• **Legal obligation** - Required by law\n• **Vital interests** - Protecting life or health\n• **Public task** - Official authority or public interest\n• **Legitimate interests** - Business interests (with safeguards)',
          order: 4
        },
        {
          title: 'Individual Rights',
          content: 'GDPR grants individuals several important rights:\n\n• **Right to information** - Know how data is used\n• **Right of access** - Obtain copies of personal data\n• **Right to rectification** - Correct inaccurate data\n• **Right to erasure** - "Right to be forgotten"\n• **Right to restrict processing**\n• **Right to data portability**\n• **Right to object**',
          order: 5
        }
      ],
      quizQuestions: [
        {
          question: 'What does GDPR stand for?',
          options: [
            'General Data Protection Regulation',
            'Global Data Privacy Rules',
            'General Data Privacy Regulation',
            'Global Data Protection Rules'
          ],
          correctIndex: 0,
          explanation: 'GDPR stands for General Data Protection Regulation, which is the EU\'s comprehensive data protection law.',
          order: 1
        },
        {
          question: 'Which of the following is considered personal data under GDPR?',
          options: [
            'Only names and addresses',
            'Only financial information',
            'Any information relating to an identified or identifiable person',
            'Only information stored in databases'
          ],
          correctIndex: 2,
          explanation: 'Personal data is broadly defined as any information relating to an identified or identifiable natural person.',
          order: 2
        },
        {
          question: 'How long do you have to notify the supervisory authority of a data breach?',
          options: [
            '24 hours',
            '48 hours',
            '72 hours',
            '1 week'
          ],
          correctIndex: 2,
          explanation: 'Organizations must notify the supervisory authority within 72 hours of becoming aware of a data breach.',
          order: 3
        }
      ],
      faq: [
        {
          question: 'What is personal data?',
          answer: 'Personal data is any information that relates to an identified or identifiable natural person. This includes names, email addresses, phone numbers, IP addresses, and even behavioral data.',
          relatedSlideIds: []
        },
        {
          question: 'What are the key principles of GDPR?',
          answer: 'The key principles are: Lawfulness, fairness and transparency; Purpose limitation; Data minimisation; Accuracy; Storage limitation; Integrity and confidentiality; and Accountability.',
          relatedSlideIds: []
        }
      ]
    });

    // Web Security Course
    const webSecurityCourse = await Course.create({
      title: 'Web Security Fundamentals',
      description: 'Essential web security concepts covering common vulnerabilities, attack vectors, and defense strategies. Learn to protect web applications from modern threats.',
      shortDescription: 'Master web security essentials and protect against common vulnerabilities.',
      duration: 90,
      level: 'beginner',
      tags: ['Security', 'Web Development', 'Cybersecurity', 'OWASP'],
      heroImage: '/api/placeholder/600/400',
      isPublished: true,
      createdBy: adminUser._id,
      syllabus: [
        {
          title: 'Introduction to Web Security',
          content: 'Web security is the practice of protecting websites, web applications, and web services from various cyber threats. In today\'s digital world, web security is crucial for:\n\n• Protecting user data\n• Maintaining business reputation\n• Ensuring compliance\n• Preventing financial losses',
          order: 1
        },
        {
          title: 'HTTPS and SSL/TLS',
          content: 'HTTPS (HTTP Secure) encrypts data between the browser and server:\n\n• **SSL/TLS protocols** provide encryption\n• **Certificate authorities** verify server identity\n• **Perfect Forward Secrecy** protects past communications\n• **HSTS** prevents downgrade attacks\n\n**Benefits**: Data integrity, authentication, privacy',
          order: 2
        },
        {
          title: 'SQL Injection Overview',
          content: 'SQL injection occurs when user input is improperly handled in database queries:\n\n• **Attack vector**: Malicious SQL code in input fields\n• **Impact**: Data theft, data manipulation, system compromise\n• **Common targets**: Login forms, search boxes, URL parameters\n\n**Example**: `\' OR \'1\'=\'1` in a login form',
          order: 3
        }
      ],
      quizQuestions: [
        {
          question: 'What is the primary purpose of HTTPS?',
          options: [
            'To make websites load faster',
            'To encrypt data between browser and server',
            'To improve SEO rankings',
            'To reduce server costs'
          ],
          correctIndex: 1,
          explanation: 'HTTPS encrypts data transmission between the browser and server, protecting sensitive information from interception.',
          order: 1
        },
        {
          question: 'Which attack involves injecting malicious SQL code into input fields?',
          options: [
            'Cross-Site Scripting (XSS)',
            'SQL Injection',
            'Cross-Site Request Forgery (CSRF)',
            'Man-in-the-Middle'
          ],
          correctIndex: 1,
          explanation: 'SQL injection occurs when malicious SQL code is inserted into input fields to manipulate database queries.',
          order: 2
        }
      ],
      faq: [
        {
          question: 'What is SQL injection?',
          answer: 'SQL injection is a code injection technique where malicious SQL statements are inserted into an entry field for execution, allowing attackers to manipulate databases.',
          relatedSlideIds: []
        },
        {
          question: 'What is Cross-Site Scripting (XSS)?',
          answer: 'XSS is a security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users, potentially stealing data or performing actions on behalf of users.',
          relatedSlideIds: []
        }
      ]
    });

    console.log('Data seeded successfully!');
    console.log('Admin user:', adminUser.email);
    console.log('Student user:', studentUser.email);
    console.log('Courses created:', gdprCourse.title, webSecurityCourse.title);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run seeder
if (require.main === module) {
  seedData();
}

module.exports = seedData;
