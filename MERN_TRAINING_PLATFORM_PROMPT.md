# Professional MERN Stack Corporate Training Platform - Complete Development Prompt

## Project Overview
Create a comprehensive, production-ready corporate training platform using the MERN stack (MongoDB, Express.js, React, Node.js) with integrated payment processing, user management, course delivery, and administrative capabilities.

## Technical Requirements

### Backend Architecture (Node.js + Express.js)
- **Framework**: Express.js with TypeScript support
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based with refresh tokens
- **Validation**: Joi or express-validator for request validation
- **Security**: Helmet.js, CORS, rate limiting, input sanitization
- **File Upload**: Multer for course materials and user avatars
- **Email**: Nodemailer for notifications and password resets
- **Payment**: Stripe integration with webhooks
- **Documentation**: Swagger/OpenAPI documentation
- **Testing**: Jest + Supertest for API testing
- **Logging**: Winston for structured logging
- **Environment**: dotenv for configuration management

### Frontend Architecture (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Routing**: React Router v6 with protected routes
- **State Management**: Redux Toolkit + RTK Query for server state
- **UI Library**: Tailwind CSS + Headless UI components
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios with interceptors
- **Notifications**: React Hot Toast for user feedback
- **Charts**: Recharts for analytics and progress tracking
- **Video Player**: Custom video player with progress tracking
- **Testing**: Vitest + React Testing Library

### Database Design (MongoDB)
- **Users Collection**: Authentication, roles, profiles, preferences
- **Courses Collection**: Course metadata, lessons, quizzes, pricing
- **Lessons Collection**: Content, media, interactive elements
- **Enrollments Collection**: User-course relationships, progress tracking
- **Progress Collection**: Detailed lesson completion, quiz scores
- **Certificates Collection**: Generated certificates with unique IDs
- **Payments Collection**: Transaction records, subscription management
- **Notifications Collection**: System and user notifications
- **Analytics Collection**: User behavior, course performance metrics

## Core Features Implementation

### 1. Authentication & Authorization System
```typescript
// User roles and permissions
enum UserRole {
  STUDENT = 'student',
  INSTRUCTOR = 'instructor', 
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}

// JWT token structure
interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  permissions: string[];
  iat: number;
  exp: number;
}
```

**Features:**
- Multi-role authentication (Student, Instructor, Admin, Super Admin)
- Email verification and password reset flows
- Social login integration (Google, LinkedIn)
- Two-factor authentication (2FA) support
- Session management with refresh tokens
- Role-based access control (RBAC)
- Account lockout after failed attempts

### 2. Course Management System
```typescript
interface Course {
  _id: ObjectId;
  title: string;
  description: string;
  shortDescription: string;
  instructor: ObjectId;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  price: number;
  currency: string;
  isPublished: boolean;
  isFree: boolean;
  thumbnail: string;
  videoPreview: string;
  tags: string[];
  prerequisites: string[];
  learningObjectives: string[];
  lessons: ObjectId[];
  quiz: ObjectId;
  certificate: ObjectId;
  ratings: Rating[];
  enrollmentCount: number;
  createdAt: Date;
  updatedAt: Date;
}
```

**Features:**
- Course creation and editing with rich text editor
- Video lesson upload and streaming
- Interactive quizzes with multiple question types
- Course categories and tagging system
- Prerequisites and learning objectives
- Course preview and free trial lessons
- Instructor dashboard for course management
- Course approval workflow for admins

### 3. Payment Integration (Stripe)
```typescript
interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled';
  client_secret: string;
  metadata: {
    userId: string;
    courseId: string;
    type: 'course' | 'subscription';
  };
}
```

**Features:**
- One-time course purchases
- Subscription-based access (monthly/yearly)
- Coupon and discount code system
- Refund processing
- Invoice generation
- Payment method management
- Webhook handling for payment events
- Tax calculation integration
- Multi-currency support

### 4. Learning Management System
```typescript
interface Lesson {
  _id: ObjectId;
  courseId: ObjectId;
  title: string;
  description: string;
  type: 'video' | 'text' | 'quiz' | 'assignment' | 'live';
  content: string;
  videoUrl?: string;
  duration: number;
  order: number;
  isPublished: boolean;
  prerequisites: ObjectId[];
  resources: Resource[];
  quiz?: ObjectId;
  assignment?: ObjectId;
}
```

**Features:**
- Video streaming with progress tracking
- Interactive content (quizzes, polls, discussions)
- Downloadable resources and materials
- Note-taking and bookmarking
- Discussion forums per lesson
- Live session integration
- Mobile-responsive learning interface
- Offline content access (PWA)

### 5. Progress Tracking & Analytics
```typescript
interface UserProgress {
  _id: ObjectId;
  userId: ObjectId;
  courseId: ObjectId;
  lessonId: ObjectId;
  status: 'not_started' | 'in_progress' | 'completed';
  progressPercentage: number;
  timeSpent: number;
  lastAccessed: Date;
  quizScores: QuizScore[];
  completedAt?: Date;
}
```

**Features:**
- Real-time progress tracking
- Completion certificates
- Learning analytics dashboard
- Performance metrics and reporting
- Badge and achievement system
- Learning path recommendations
- Time tracking and study analytics

### 6. Admin Dashboard
```typescript
interface AdminDashboard {
  users: {
    total: number;
    active: number;
    newThisMonth: number;
  };
  courses: {
    total: number;
    published: number;
    draft: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    growth: number;
  };
  analytics: {
    topCourses: Course[];
    userEngagement: EngagementMetric[];
    completionRates: CompletionRate[];
  };
}
```

**Features:**
- User management and role assignment
- Course approval and moderation
- Financial reporting and analytics
- System configuration and settings
- Content moderation tools
- Bulk operations and data export
- Audit logs and security monitoring

## API Design Standards

### RESTful API Structure
```
Authentication:
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET  /api/auth/me

Users:
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
POST   /api/users/:id/avatar

Courses:
GET    /api/courses
GET    /api/courses/:id
POST   /api/courses
PUT    /api/courses/:id
DELETE /api/courses/:id
POST   /api/courses/:id/enroll
GET    /api/courses/:id/lessons
POST   /api/courses/:id/rate

Lessons:
GET    /api/lessons/:id
PUT    /api/lessons/:id/progress
POST   /api/lessons/:id/notes
GET    /api/lessons/:id/discussion

Payments:
POST   /api/payments/create-intent
POST   /api/payments/confirm
GET    /api/payments/history
POST   /api/payments/webhook

Analytics:
GET    /api/analytics/dashboard
GET    /api/analytics/users
GET    /api/analytics/courses
GET    /api/analytics/revenue
```

### Response Format Standards
```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: ValidationError[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}
```

## Frontend Component Architecture

### Component Structure
```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── forms/              # Form components
│   ├── layout/             # Layout components
│   ├── course/             # Course-related components
│   ├── lesson/             # Lesson components
│   ├── payment/            # Payment components
│   └── admin/              # Admin components
├── pages/
│   ├── auth/               # Authentication pages
│   ├── courses/            # Course pages
│   ├── learning/           # Learning interface
│   ├── admin/              # Admin pages
│   └── profile/            # User profile pages
├── hooks/                  # Custom React hooks
├── services/               # API services
├── store/                  # Redux store
├── utils/                  # Utility functions
└── types/                  # TypeScript types
```

## Security Implementation

### Backend Security
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection
- Rate limiting per IP and user
- Secure password hashing (bcrypt)
- JWT token security
- API key management
- CORS configuration
- Security headers (Helmet.js)

### Frontend Security
- XSS prevention
- CSRF token handling
- Secure storage of tokens
- Input validation
- Content Security Policy
- HTTPS enforcement

## Performance Optimization

### Backend Optimization
- Database indexing strategy
- Query optimization
- Caching with Redis
- CDN integration
- Image optimization
- API response compression
- Database connection pooling

### Frontend Optimization
- Code splitting and lazy loading
- Image optimization
- Bundle size optimization
- Service worker for caching
- Virtual scrolling for large lists
- Memoization for expensive operations

## Testing Strategy

### Backend Testing
- Unit tests for all controllers and services
- Integration tests for API endpoints
- Database testing with test containers
- Authentication flow testing
- Payment webhook testing
- Load testing with Artillery

### Frontend Testing
- Component unit tests
- Integration tests for user flows
- E2E tests with Playwright
- Accessibility testing
- Performance testing
- Cross-browser testing

## Deployment & DevOps

### Production Environment
- **Frontend**: Vercel or Netlify
- **Backend**: Railway, Render, or AWS
- **Database**: MongoDB Atlas
- **CDN**: Cloudflare
- **File Storage**: AWS S3 or Cloudinary
- **Email**: SendGrid or AWS SES
- **Monitoring**: Sentry for error tracking

### CI/CD Pipeline
- GitHub Actions for automated testing
- Automated deployment on merge to main
- Environment-specific configurations
- Database migration scripts
- Health checks and monitoring

## Additional Features

### Advanced Learning Features
- AI-powered course recommendations
- Adaptive learning paths
- Gamification elements
- Social learning features
- Mobile app (React Native)
- Offline learning support
- Multi-language support

### Business Features
- White-label solutions
- Multi-tenant architecture
- Advanced reporting and analytics
- Integration with HR systems
- Compliance tracking
- Custom branding options

## Development Guidelines

### Code Quality
- ESLint and Prettier configuration
- TypeScript strict mode
- Comprehensive error handling
- Consistent naming conventions
- Detailed code documentation
- Regular code reviews

### Git Workflow
- Feature branch development
- Pull request reviews
- Conventional commit messages
- Automated testing on PRs
- Semantic versioning

## Success Metrics
- User engagement and retention
- Course completion rates
- Revenue and conversion metrics
- Performance benchmarks
- Security incident tracking
- User satisfaction scores

This comprehensive prompt provides a complete roadmap for building a professional, scalable corporate training platform with modern technologies, robust security, and excellent user experience.









