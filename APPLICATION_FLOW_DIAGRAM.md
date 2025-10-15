# Corporate Training Platform - Complete Application Flow & Architecture

## 🏗️ Application Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (React + TypeScript)                      │
│                                Port: 5173 (Vite)                               │
├─────────────────────────────────────────────────────────────────────────────────┤
│                              BACKEND (Express.js)                              │
│                                Port: 5000 (Node.js)                            │
├─────────────────────────────────────────────────────────────────────────────────┤
│                              DATABASE (MongoDB + In-Memory)                     │
│                              Mongoose ODM + Local Storage                       │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## 🗺️ Route-to-Component-to-API Flow Map

### 📍 **Public Routes** (No Authentication Required)

#### 1. **Landing Page**
```
URL: /
├── Component: LandingPage.tsx
├── Features:
│   ├── Course showcase
│   ├── Feature highlights
│   └── CTA buttons → /login
├── API Calls: None
└── Navigation: → /login, /register
```

#### 2. **Login Page**
```
URL: /login
├── Component: LoginPage.tsx
├── Authentication Check: If authenticated → redirect to dashboard/admin
├── API Flow:
│   └── POST /api/auth/login
│       ├── Controller: authController.login()
│       ├── Database: User.findOne({ email })
│       ├── Validation: bcrypt.compare(password)
│       ├── Token: generateToken(user._id)
│       └── Response: { user, token }
├── State Updates:
│   ├── AuthContext.login()
│   ├── apiService.setToken()
│   └── localStorage.setItem('token')
└── Navigation: → /dashboard (student) | /admin (admin)
```

#### 3. **Register Page**
```
URL: /register
├── Component: RegisterPage.tsx
├── Authentication Check: If authenticated → redirect to dashboard/admin
├── API Flow:
│   └── POST /api/auth/register
│       ├── Controller: authController.register()
│       ├── Validation: express-validator rules
│       ├── Database: User.create({ name, email, hashedPassword, role })
│       ├── Token: generateToken(user._id)
│       └── Response: { user, token }
├── State Updates: Same as login
└── Navigation: → /dashboard (student) | /admin (admin)
```

### 🔒 **Protected Routes** (Authentication Required)

#### **Authentication Middleware Chain:**
```
Request → ProtectedRoute Component → useAuth Hook → Check AuthContext
├── If not authenticated → Navigate to /login
├── If wrong role → Navigate to /
└── If authorized → Render children
```

### 👨‍🎓 **Student Routes** (requiredRole: 'student')

#### 4. **Student Dashboard**
```
URL: /dashboard
├── Component: StudentDashboard.tsx
├── Protection: ProtectedRoute(requiredRole: 'student')
├── API Flows:
│   ├── GET /api/courses → courseController.getCourses()
│   │   ├── Database: Course.find({ isPublished: true })
│   │   └── Response: { courses[] }
│   ├── GET /api/progress → progressController.getUserProgress()
│   │   ├── Database: UserProgress.find({ userId })
│   │   └── Response: { progress[] }
│   └── GET /api/auth/me → authController.getMe()
│       ├── Database: User.findById(req.user.id)
│       └── Response: { user }
├── Features:
│   ├── Enrolled courses overview
│   ├── Progress tracking
│   ├── Recent activity
│   └── Quick access to continue learning
└── Navigation: → /courses, /courses/:id
```

#### 5. **Courses Page**
```
URL: /courses
├── Component: CoursesPage.tsx
├── Protection: ProtectedRoute(requiredRole: 'student')
├── API Flows:
│   └── GET /api/courses?level=X&search=Y
│       ├── Controller: courseController.getCourses()
│       ├── Database: Course.find(filters).populate('createdBy')
│       └── Response: { courses[], count, total }
├── Features:
│   ├── Course catalog with filtering
│   ├── Search functionality
│   ├── Level-based filtering
│   └── Course enrollment
└── Navigation: → /courses/:courseId
```

#### 6. **Course Overview**
```
URL: /courses/:courseId
├── Component: CourseOverview.tsx
├── Protection: ProtectedRoute(requiredRole: 'student')
├── URL Parameters: courseId (e.g., 'gdpr-compliance')
├── API Flows:
│   ├── GET /api/courses/:id → courseController.getCourse()
│   │   ├── Database: Course.findById(id).populate('lessons.slides')
│   │   └── Response: { course }
│   ├── GET /api/courses/:id/lessons → courseController.getCourseLessons()
│   │   ├── Database: Course.findById(id).select('lessons')
│   │   └── Response: { lessons[] }
│   └── POST /api/courses/:id/enroll → courseController.enrollInCourse()
│       ├── Database: Course.findByIdAndUpdate(id, { $push: { enrolledStudents: userId } })
│       └── Response: { success, message }
├── Features:
│   ├── Course details and syllabus
│   ├── Lesson list with progress
│   ├── Enrollment management
│   └── Course statistics
└── Navigation: → /courses/:courseId/lesson/:slideIndex, /courses/:courseId/quiz
```

#### 7. **Lesson Viewer**
```
URL: /courses/:courseId/lesson/:slideIndex
├── Component: LessonViewer.tsx
├── Protection: ProtectedRoute(requiredRole: 'student')
├── URL Parameters: 
│   ├── courseId (e.g., 'gdpr-compliance')
│   └── slideIndex (e.g., '0', '1', '2')
├── Data Flow:
│   ├── Course ID Mapping: 'gdpr-compliance' → 'course1' (backend ID)
│   ├── API Fallback: If API fails → use demoCourses data
│   └── Local Storage: Completion status stored locally
├── API Flows:
│   ├── GET /api/courses/:id → Get course data
│   ├── GET /api/courses/:id/lessons → Get lesson content
│   └── PUT /api/progress/:courseId/lesson → Update progress
│       ├── Controller: progressController.updateLessonProgress()
│       ├── Middleware: Currently NO auth (for demo)
│       └── Response: { progress }
├── Features:
│   ├── Video/content display
│   ├── Progress tracking
│   ├── Mark complete functionality
│   ├── Auto-advance to next lesson
│   └── Navigation between slides
└── Navigation: → Next/Previous lessons, /courses/:courseId/quiz
```

#### 8. **Quiz Page**
```
URL: /courses/:courseId/quiz
├── Component: QuizPage.tsx
├── Protection: ProtectedRoute(requiredRole: 'student')
├── API Flows:
│   ├── GET /api/courses/:id → Get quiz questions
│   └── POST /api/progress/:courseId/quiz → Submit answers
│       ├── Controller: progressController.submitQuiz()
│       ├── Database: UserProgress.create(), Certificate.create()
│       └── Response: { score, passed, certificate }
├── Features:
│   ├── Multiple choice questions
│   ├── Score calculation
│   ├── Certificate generation
│   └── Pass/fail logic
└── Navigation: → /courses/:courseId/certificate (if passed)
```

#### 9. **Certificate Page**
```
URL: /courses/:courseId/certificate
├── Component: CertificatePage.tsx
├── Protection: ProtectedRoute(requiredRole: 'student')
├── API Flows:
│   └── GET /api/progress/certificates → Get user certificates
│       ├── Controller: progressController.getUserCertificates()
│       ├── Database: Certificate.find({ userId })
│       └── Response: { certificates[] }
├── Features:
│   ├── Certificate display
│   ├── Download functionality
│   └── Unique certificate ID
└── Navigation: Back to dashboard
```

#### 10. **Chatbot Coach**
```
URL: /courses/:courseId/coach
├── Component: ChatbotCoach.tsx
├── Protection: ProtectedRoute(requiredRole: 'student')
├── API Flows:
│   └── POST /api/chatbot/chat → AI conversation
│       ├── Controller: chatbotController.chat()
│       ├── External: OpenAI API integration
│       └── Response: { message, timestamp }
├── Features:
│   ├── AI-powered assistance
│   ├── Course-specific context
│   └── Real-time chat interface
└── Navigation: → Course-related pages
```

### 👨‍💼 **Admin Routes** (requiredRole: 'admin')

#### 11. **Admin Dashboard**
```
URL: /admin
├── Component: AdminDashboard.tsx
├── Protection: ProtectedRoute(requiredRole: 'admin')
├── API Flows:
│   ├── GET /api/courses → Get all courses (admin view)
│   │   ├── Controller: courseController.getCourses()
│   │   ├── Database: Course.find().populate('createdBy enrolledStudents')
│   │   └── Response: { courses[] }
│   ├── PUT /api/courses/:id → Update course
│   │   ├── Controller: courseController.updateCourse()
│   │   ├── Database: Course.findByIdAndUpdate()
│   │   └── Response: { course }
│   └── PUT /api/courses/:id/lessons → Update lessons
│       ├── Controller: courseController.updateCourseLessons()
│       ├── Database: Course.findByIdAndUpdate({ lessons })
│       └── Response: { course }
├── Features:
│   ├── Course management (CRUD)
│   ├── Lesson editing with LessonManager
│   ├── User management
│   ├── Analytics and reporting
│   └── Content moderation
├── Components:
│   └── LessonManager.tsx → Rich lesson content editing
└── Navigation: Course editing modals, user management
```

## 🔄 **Data Flow Patterns**

### **Authentication Flow**
```
1. User Login
   ├── LoginPage → apiService.login()
   ├── POST /api/auth/login → authController.login()
   ├── MongoDB: User.findOne({ email })
   ├── bcrypt.compare(password, hashedPassword)
   ├── generateToken(user._id) → JWT
   ├── Response: { user, token }
   ├── AuthContext.setAuthState()
   ├── localStorage.setItem('token')
   └── Navigate to role-based dashboard

2. Route Protection
   ├── ProtectedRoute → useAuth()
   ├── AuthContext checks isAuthenticated
   ├── If not authenticated → Navigate('/login')
   ├── If wrong role → Navigate('/')
   └── If authorized → Render component

3. Token Verification (Backend)
   ├── protect middleware → jwt.verify(token)
   ├── Find user by decoded ID
   ├── Attach user to req.user
   └── Continue to controller
```

### **Course Data Flow**
```
1. Frontend Request
   ├── Component → apiService.getCourses()
   ├── fetch() with Authorization header
   └── Handle response/errors

2. Backend Processing
   ├── Express route → protect middleware
   ├── JWT verification → req.user
   ├── Controller function
   ├── MongoDB query with Mongoose
   ├── Data transformation
   └── JSON response

3. Frontend State Update
   ├── Response handling
   ├── State management (useState/Context)
   ├── Component re-render
   └── UI updates
```

### **Progress Tracking Flow**
```
1. Lesson Completion
   ├── LessonViewer → Mark Complete button
   ├── localStorage.setItem('completed')
   ├── apiService.updateLessonProgress()
   ├── PUT /api/progress/:courseId/lesson
   ├── progressController.updateLessonProgress()
   ├── UserProgress.create() or update
   └── Auto-navigate to next lesson

2. Quiz Submission
   ├── QuizPage → Submit answers
   ├── apiService.submitQuiz()
   ├── POST /api/progress/:courseId/quiz
   ├── Score calculation
   ├── Certificate generation (if passed)
   └── Navigate to certificate page
```

## 🛡️ **Security & Middleware Chain**

### **Request Flow Through Middleware**
```
Request → CORS → Body Parser → Route Handler → Middleware → Controller
                                      ├── protect (JWT verification)
                                      ├── authorize (role checking)
                                      └── validation (express-validator)
```

### **Authentication Middleware**
```javascript
// backend/src/middleware/auth.js
protect() {
  1. Extract Bearer token from headers
  2. jwt.verify(token, JWT_SECRET)
  3. Find user by decoded ID
  4. Attach user to req.user
  5. Continue to next middleware/controller
}

authorize(...roles) {
  1. Check req.user.role
  2. Verify role is in allowed roles
  3. Continue or return 403 Forbidden
}
```

## 🗄️ **Database Schema & Relationships**

### **MongoDB Collections**
```
Users Collection:
├── _id (ObjectId)
├── name, email, password (hashed)
├── role ('student' | 'admin')
├── avatar, isActive, lastLogin
└── timestamps

Courses Collection:
├── _id (ObjectId)
├── title, description, shortDescription
├── duration, level, tags, heroImage
├── lessons[] (embedded documents)
│   ├── title, content, slides[]
│   └── slides[] { title, content, mediaUrl, order }
├── quizQuestions[] (embedded)
├── faq[] (embedded)
├── isPublished, createdBy (User ref)
├── enrolledStudents[] (User refs)
└── timestamps

UserProgress Collection:
├── _id (ObjectId)
├── userId (User ref)
├── courseId (Course ref)
├── completedLessons[], currentLesson
├── quizScore, certificateId
└── timestamps

Certificates Collection:
├── _id (ObjectId)
├── userId (User ref)
├── courseId (Course ref)
├── uniqueId, issueDate
└── timestamps
```

## 🎯 **Key Integration Points**

### **Frontend-Backend Communication**
```
1. API Service Layer (src/services/api.ts)
   ├── Centralized HTTP client
   ├── Token management
   ├── Error handling
   └── TypeScript interfaces

2. Authentication Context (src/hooks/useAuthContext.tsx)
   ├── Global auth state
   ├── Login/logout methods
   ├── User persistence
   └── Fallback to demo users

3. Protected Routes (src/App.tsx)
   ├── Role-based access control
   ├── Automatic redirects
   └── Loading states
```

### **State Management Strategy**
```
1. Authentication State
   ├── AuthContext (global)
   ├── localStorage (persistence)
   └── API token management

2. Component State
   ├── useState for local data
   ├── useEffect for API calls
   └── Loading/error states

3. Progress Tracking
   ├── localStorage (completion status)
   ├── API calls (server sync)
   └── Real-time updates
```

## 🚀 **Development & Production Flow**

### **Development Environment**
```
Frontend: http://localhost:5173 (Vite)
Backend: http://localhost:5000 (Express)
Database: MongoDB local + In-memory fallback
```

### **Build & Deployment Process**
```
1. Frontend Build
   ├── npm run build → TypeScript compilation
   ├── Vite bundling → Static assets
   └── Deployment → Netlify/Vercel

2. Backend Deployment
   ├── Node.js server → Railway/Render
   ├── MongoDB Atlas → Production database
   └── Environment variables → Config management
```

This comprehensive flow diagram shows how your application routes, components, APIs, and database all interconnect to create a complete learning management system with role-based access control and real-time progress tracking.






