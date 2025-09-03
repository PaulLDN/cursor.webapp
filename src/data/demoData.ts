import { Course, User, FAQ } from '@/types';

// Demo Users
export const demoUsers: User[] = [
  {
    id: '1',
    email: 'student@example.com',
    name: 'John Student',
    role: 'student',
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z'
  }
];

// GDPR Course FAQ
const gdprFAQ: FAQ[] = [
  {
    id: 'gdpr-1',
    question: 'What is personal data?',
    answer: 'Personal data is any information that relates to an identified or identifiable natural person. This includes names, email addresses, phone numbers, IP addresses, and even behavioral data.',
    relatedSlideIds: ['gdpr-slide-1', 'gdpr-slide-2']
  },
  {
    id: 'gdpr-2',
    question: 'What are the key principles of GDPR?',
    answer: 'The key principles are: Lawfulness, fairness and transparency; Purpose limitation; Data minimisation; Accuracy; Storage limitation; Integrity and confidentiality; and Accountability.',
    relatedSlideIds: ['gdpr-slide-3']
  },
  {
    id: 'gdpr-3',
    question: 'What is the right to be forgotten?',
    answer: 'The right to be forgotten (right to erasure) allows individuals to request the deletion of their personal data when it is no longer necessary for the original purpose or when they withdraw consent.',
    relatedSlideIds: ['gdpr-slide-8']
  },
  {
    id: 'gdpr-4',
    question: 'What is a Data Protection Impact Assessment (DPIA)?',
    answer: 'A DPIA is a process to help identify and minimize data protection risks when processing personal data, especially for high-risk processing activities.',
    relatedSlideIds: ['gdpr-slide-10']
  }
];

// Web Security Course FAQ
const webSecurityFAQ: FAQ[] = [
  {
    id: 'security-1',
    question: 'What is SQL injection?',
    answer: 'SQL injection is a code injection technique where malicious SQL statements are inserted into an entry field for execution, allowing attackers to manipulate databases.',
    relatedSlideIds: ['security-slide-3', 'security-slide-4']
  },
  {
    id: 'security-2',
    question: 'What is Cross-Site Scripting (XSS)?',
    answer: 'XSS is a security vulnerability that allows attackers to inject malicious scripts into web pages viewed by other users, potentially stealing data or performing actions on behalf of users.',
    relatedSlideIds: ['security-slide-5', 'security-slide-6']
  },
  {
    id: 'security-3',
    question: 'What is HTTPS and why is it important?',
    answer: 'HTTPS (HTTP Secure) encrypts data between the browser and server, protecting sensitive information from being intercepted by attackers during transmission.',
    relatedSlideIds: ['security-slide-2']
  },
  {
    id: 'security-4',
    question: 'What is two-factor authentication (2FA)?',
    answer: '2FA adds an extra layer of security by requiring users to provide two different authentication factors, typically something they know (password) and something they have (phone).',
    relatedSlideIds: ['security-slide-8']
  }
];

// Demo Courses
export const demoCourses: Course[] = [
  {
    id: 'gdpr-compliance',
    title: 'GDPR Compliance Fundamentals',
    description: 'Comprehensive training on the General Data Protection Regulation (GDPR), covering key principles, rights, obligations, and practical implementation strategies for organizations.',
    shortDescription: 'Master GDPR compliance with practical examples and real-world scenarios.',
    duration: 120,
    level: 'intermediate',
    tags: ['Compliance', 'Privacy', 'Legal', 'Data Protection'],
    heroImage: '/api/placeholder/600/400',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    faq: gdprFAQ,
    syllabus: [
      {
        id: 'gdpr-slide-1',
        title: 'Introduction to GDPR',
        content: 'The General Data Protection Regulation (GDPR) is a comprehensive data protection law that came into effect on May 25, 2018. It applies to all organizations that process personal data of EU residents, regardless of where the organization is located.',
        order: 1
      },
      {
        id: 'gdpr-slide-2',
        title: 'What is Personal Data?',
        content: 'Personal data is any information relating to an identified or identifiable natural person. This includes:\n\n• Names and identification numbers\n• Location data and online identifiers\n• Biometric data\n• Health information\n• Economic, cultural, or social identity data',
        order: 2
      },
      {
        id: 'gdpr-slide-3',
        title: 'Key Principles of GDPR',
        content: 'GDPR is built on seven key principles:\n\n1. **Lawfulness, fairness and transparency**\n2. **Purpose limitation**\n3. **Data minimisation**\n4. **Accuracy**\n5. **Storage limitation**\n6. **Integrity and confidentiality**\n7. **Accountability**',
        order: 3
      },
      {
        id: 'gdpr-slide-4',
        title: 'Legal Basis for Processing',
        content: 'You must have a legal basis for processing personal data:\n\n• **Consent** - Clear, informed, and freely given\n• **Contract** - Necessary for contract performance\n• **Legal obligation** - Required by law\n• **Vital interests** - Protecting life or health\n• **Public task** - Official authority or public interest\n• **Legitimate interests** - Business interests (with safeguards)',
        order: 4
      },
      {
        id: 'gdpr-slide-5',
        title: 'Individual Rights',
        content: 'GDPR grants individuals several important rights:\n\n• **Right to information** - Know how data is used\n• **Right of access** - Obtain copies of personal data\n• **Right to rectification** - Correct inaccurate data\n• **Right to erasure** - "Right to be forgotten"\n• **Right to restrict processing**\n• **Right to data portability**\n• **Right to object**',
        order: 5
      },
      {
        id: 'gdpr-slide-6',
        title: 'Data Controller vs Processor',
        content: '**Data Controller**: Determines the purposes and means of processing personal data\n\n**Data Processor**: Processes personal data on behalf of the controller\n\n**Key Differences**:\n• Controllers have more obligations\n• Processors must follow controller instructions\n• Both can be held liable for breaches',
        order: 6
      },
      {
        id: 'gdpr-slide-7',
        title: 'Privacy by Design',
        content: 'Privacy by Design means building data protection into systems from the start:\n\n• **Proactive not reactive**\n• **Privacy as the default**\n• **Full functionality**\n• **End-to-end security**\n• **Visibility and transparency**\n• **Respect for user privacy**',
        order: 7
      },
      {
        id: 'gdpr-slide-8',
        title: 'Right to Erasure',
        content: 'Individuals can request deletion of their personal data when:\n\n• Data is no longer necessary for original purpose\n• Consent is withdrawn\n• Data was unlawfully processed\n• Erasure is required for legal compliance\n\n**Exceptions**: Freedom of expression, legal obligations, public interest, research purposes',
        order: 8
      },
      {
        id: 'gdpr-slide-9',
        title: 'Data Breach Notification',
        content: 'In case of a data breach:\n\n• **Notify supervisory authority** within 72 hours\n• **Notify affected individuals** without undue delay\n• **Document all breaches**\n• **Implement breach response plan**\n\n**Information to include**: Nature of breach, categories of data, likely consequences, measures taken',
        order: 9
      },
      {
        id: 'gdpr-slide-10',
        title: 'Data Protection Impact Assessment',
        content: 'DPIA is required for high-risk processing:\n\n• **Systematic monitoring**\n• **Large-scale processing**\n• **Special categories of data**\n• **Automated decision-making**\n\n**DPIA Process**:\n1. Describe processing\n2. Assess necessity and proportionality\n3. Identify risks\n4. Identify measures to address risks',
        order: 10
      }
    ],
    quizQuestions: [
      {
        id: 'gdpr-q1',
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
        id: 'gdpr-q2',
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
        id: 'gdpr-q3',
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
      },
      {
        id: 'gdpr-q4',
        question: 'What is the maximum fine for GDPR violations?',
        options: [
          '€10 million or 2% of annual turnover',
          '€20 million or 4% of annual turnover',
          '€50 million or 5% of annual turnover',
          '€100 million or 10% of annual turnover'
        ],
        correctIndex: 1,
        explanation: 'The maximum fine is €20 million or 4% of annual global turnover, whichever is higher.',
        order: 4
      },
      {
        id: 'gdpr-q5',
        question: 'Which principle requires that personal data is adequate, relevant, and limited to what is necessary?',
        options: [
          'Purpose limitation',
          'Data minimisation',
          'Accuracy',
          'Storage limitation'
        ],
        correctIndex: 1,
        explanation: 'Data minimisation requires that personal data is adequate, relevant, and limited to what is necessary for the purposes for which it is processed.',
        order: 5
      }
    ]
  },
  {
    id: 'web-security-fundamentals',
    title: 'Web Security Fundamentals',
    description: 'Essential web security concepts covering common vulnerabilities, attack vectors, and defense strategies. Learn to protect web applications from modern threats.',
    shortDescription: 'Master web security essentials and protect against common vulnerabilities.',
    duration: 90,
    level: 'beginner',
    tags: ['Security', 'Web Development', 'Cybersecurity', 'OWASP'],
    heroImage: '/api/placeholder/600/400',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    faq: webSecurityFAQ,
    syllabus: [
      {
        id: 'security-slide-1',
        title: 'Introduction to Web Security',
        content: 'Web security is the practice of protecting websites, web applications, and web services from various cyber threats. In today\'s digital world, web security is crucial for:\n\n• Protecting user data\n• Maintaining business reputation\n• Ensuring compliance\n• Preventing financial losses',
        order: 1
      },
      {
        id: 'security-slide-2',
        title: 'HTTPS and SSL/TLS',
        content: 'HTTPS (HTTP Secure) encrypts data between the browser and server:\n\n• **SSL/TLS protocols** provide encryption\n• **Certificate authorities** verify server identity\n• **Perfect Forward Secrecy** protects past communications\n• **HSTS** prevents downgrade attacks\n\n**Benefits**: Data integrity, authentication, privacy',
        order: 2
      },
      {
        id: 'security-slide-3',
        title: 'SQL Injection Overview',
        content: 'SQL injection occurs when user input is improperly handled in database queries:\n\n• **Attack vector**: Malicious SQL code in input fields\n• **Impact**: Data theft, data manipulation, system compromise\n• **Common targets**: Login forms, search boxes, URL parameters\n\n**Example**: `\' OR \'1\'=\'1` in a login form',
        order: 3
      },
      {
        id: 'security-slide-4',
        title: 'Preventing SQL Injection',
        content: 'Protect against SQL injection with:\n\n• **Prepared statements** - Separate SQL code from data\n• **Parameterized queries** - Use placeholders for user input\n• **Input validation** - Validate and sanitize all inputs\n• **Least privilege** - Limit database user permissions\n• **Error handling** - Don\'t expose database errors',
        order: 4
      },
      {
        id: 'security-slide-5',
        title: 'Cross-Site Scripting (XSS)',
        content: 'XSS allows attackers to inject malicious scripts into web pages:\n\n• **Stored XSS** - Script stored on server\n• **Reflected XSS** - Script reflected from user input\n• **DOM-based XSS** - Script executed in browser\n\n**Impact**: Session hijacking, defacement, malware distribution',
        order: 5
      },
      {
        id: 'security-slide-6',
        title: 'XSS Prevention',
        content: 'Prevent XSS attacks with:\n\n• **Input validation** - Validate all user inputs\n• **Output encoding** - Encode data before displaying\n• **Content Security Policy** - Restrict script sources\n• **HttpOnly cookies** - Prevent JavaScript access\n• **Regular security testing**',
        order: 6
      },
      {
        id: 'security-slide-7',
        title: 'Cross-Site Request Forgery (CSRF)',
        content: 'CSRF tricks users into performing unwanted actions:\n\n• **Attack method**: Malicious requests from trusted sites\n• **Target**: State-changing operations\n• **Example**: Unauthorized money transfers\n\n**Key point**: Attacker cannot read response, only trigger actions',
        order: 7
      },
      {
        id: 'security-slide-8',
        title: 'Authentication and Authorization',
        content: 'Secure authentication practices:\n\n• **Strong passwords** - Complexity requirements\n• **Multi-factor authentication** - Additional verification\n• **Session management** - Secure session handling\n• **Password hashing** - Use bcrypt, scrypt, or Argon2\n• **Account lockout** - Prevent brute force attacks',
        order: 8
      },
      {
        id: 'security-slide-9',
        title: 'Security Headers',
        content: 'Important security headers:\n\n• **Content-Security-Policy** - Prevent XSS\n• **X-Frame-Options** - Prevent clickjacking\n• **X-Content-Type-Options** - Prevent MIME sniffing\n• **Strict-Transport-Security** - Enforce HTTPS\n• **X-XSS-Protection** - Browser XSS protection',
        order: 9
      },
      {
        id: 'security-slide-10',
        title: 'Security Best Practices',
        content: 'General security best practices:\n\n• **Keep software updated** - Patch vulnerabilities\n• **Use secure coding practices** - Follow OWASP guidelines\n• **Implement logging and monitoring** - Detect attacks\n• **Regular security testing** - Penetration testing\n• **Security training** - Educate development team',
        order: 10
      }
    ],
    quizQuestions: [
      {
        id: 'security-q1',
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
        id: 'security-q2',
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
      },
      {
        id: 'security-q3',
        question: 'What is the best way to prevent SQL injection?',
        options: [
          'Input validation only',
          'Prepared statements and parameterized queries',
          'Using HTTPS',
          'Strong passwords'
        ],
        correctIndex: 1,
        explanation: 'Prepared statements and parameterized queries separate SQL code from data, preventing injection attacks.',
        order: 3
      },
      {
        id: 'security-q4',
        question: 'What does XSS stand for?',
        options: [
          'Cross-Site Scripting',
          'Cross-Site Security',
          'Cross-Site Session',
          'Cross-Site Storage'
        ],
        correctIndex: 0,
        explanation: 'XSS stands for Cross-Site Scripting, which allows attackers to inject malicious scripts into web pages.',
        order: 4
      },
      {
        id: 'security-q5',
        question: 'Which security header prevents clickjacking attacks?',
        options: [
          'Content-Security-Policy',
          'X-Frame-Options',
          'Strict-Transport-Security',
          'X-Content-Type-Options'
        ],
        correctIndex: 1,
        explanation: 'X-Frame-Options prevents clickjacking by controlling whether a page can be embedded in frames.',
        order: 5
      }
    ]
  }
];
