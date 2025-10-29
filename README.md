# 🎓 Corporate Training Platform - MERN Stack

A modern, full-featured corporate training platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This application provides interactive courses on GDPR compliance and cybersecurity awareness, complete with quizzes, progress tracking, certificates, and an AI-powered chatbot coach.

## ✨ Features

### 🎯 For Students
- **Interactive Courses**: Professionally structured courses on GDPR and Cybersecurity
- **Rich Content Display**: Beautiful formatting with headings, lists, highlights, and emojis
- **Gamification**: XP system, progress milestones, and celebration animations
- **Quizzes**: Comprehensive assessments with instant feedback and visual progress
- **Progress Tracking**: Real-time tracking of course completion and quiz scores
- **Certificates**: Downloadable certificates (PDF/PNG) upon course completion
- **AI Chatbot Coach**: Pre-quiz preparation assistant powered by free Gemini AI
- **Responsive Design**: Modern UI built with Tailwind CSS

### 👨‍💼 For Administrators
- **Dashboard**: Overview of all students and their progress
- **Course Management**: Create, edit, and manage course content
- **Analytics**: Track completion rates and quiz performance
- **User Management**: View and manage student accounts

## 🏗️ Architecture

### Backend (Node.js + Express + MongoDB)
- **API Server**: RESTful API with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **Security**: Password hashing with bcryptjs
- **Validation**: Input validation with express-validator
- **In-memory database** fallback for quick development

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and builds
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context API
- **Routing**: React Router v6 for navigation
- **HTTP Client**: Fetch API with custom service layer
- **Certificates**: html2canvas & jspdf for certificate generation

### AI Integration
- **OpenAI SDK** for AI integrations (Groq & OpenAI)
- **Groq**: FREE llama-3.1-70b-versatile model
- **Context-Aware**: Course-specific assistance
- **Intelligent Fallback**: Works even without API keys

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas) - optional, in-memory fallback available
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PaulLDN/cursor.webapp.git
   cd cursor.webapp
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example config file
   cp backend/config.env.example backend/config.env
   ```

4. **Configure Backend Environment** (`backend/config.env`)
   ```env
   NODE_ENV=development
   PORT=5000
   
   # MongoDB (optional - will use in-memory DB if not configured)
   MONGODB_URI=mongodb://localhost:27017/corporate-training
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   
   # Frontend URL for CORS
   FRONTEND_URL=http://localhost:5173
   
   # AI API Keys (optional - has intelligent fallback)
   GROQ_API_KEY=your-groq-api-key
   OPENAI_API_KEY=your-openai-api-key
   ```

5. **Get a FREE Gemini API Key** (Optional for AI features)
   - Visit [Google AI Studio](https://aistudio.google.com/app/api-keys)
   - Sign up for a free student account
   - Generate an API key
   - Add it to `backend/config.env`

6. **Set up MongoDB** (Optional)
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas connection string in config.env
   # If not configured, the app will use in-memory database
   ```

7. **Seed the database** (Optional for MongoDB)
   ```bash
   cd backend
   npm run seed
   cd ..
   ```

8. **Run the application**
   
   **Option A: Windows (Easy)**
   ```bash
   # Double-click start-app.bat
   # Or run from terminal:
   start-app.bat
   ```

   **Option B: Manual (All OS)**
   ```bash
   # Terminal 1 - Backend
   cd backend
   node src/server.js
   # Or for development with auto-restart:
   npm run dev

   # Terminal 2 - Frontend
   npm run dev
   ```

9. **Access the application**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)
   - Health Check: [http://localhost:5000/api/health](http://localhost:5000/api/health)

## 👥 Demo Accounts

### Student Account
- **Email**: `student@example.com`
- **Password**: `password`

### Admin Account
- **Email**: `admin@example.com`
- **Password**: `password`

## 📚 Course Content

### 1. GDPR Training Course (SME Edition)
**6 comprehensive modules covering:**
- Introduction to GDPR and Data Protection
- Understanding Personal Data and Lawful Processing
- The Seven Principles of GDPR
- Individuals' Rights under GDPR
- Data Security and Breach Management
- Accountability, Compliance, and Best Practices

**Final Quiz**: 20 questions covering all modules

### 2. Cybersecurity Training Course (SME Edition)
**6 practical modules covering:**
- Introduction to Cybersecurity
- Passwords and Authentication
- Secure Use of Devices and Networks
- Phishing and Social Engineering
- Safe Data Handling and Physical Security
- Incident Response and Reporting

**Final Quiz**: 20 questions covering all modules

## 🤖 AI Chatbot Features

The platform includes an AI-powered chatbot coach to help students prepare for quizzes:
- **FREE**: Uses Groq's llama-3.1-70b-versatile model
- **Context-Aware**: Knows which course you're studying
- **Intelligent Fallback**: Works even without API keys
- **Real-time**: Instant responses to help you learn

See [CHATBOT_SETUP.md](CHATBOT_SETUP.md) for detailed setup instructions.

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS** for modern styling
- **React Router v6** for navigation
- **html2canvas** & **jspdf** for certificate generation

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **In-memory database** for quick development (MongoDB-ready)
- **OpenAI SDK** for AI integrations (Groq & OpenAI)

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/admin),
  avatar: String,
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Courses Collection
```javascript
{
  title: String,
  description: String,
  shortDescription: String,
  duration: Number,
  level: String (beginner/intermediate/advanced),
  tags: [String],
  heroImage: String,
  syllabus: [SlideSchema],
  quizQuestions: [QuizQuestionSchema],
  faq: [FAQSchema],
  isPublished: Boolean,
  createdBy: ObjectId (User),
  enrolledStudents: [ObjectId (User)],
  createdAt: Date,
  updatedAt: Date
}
```

### UserProgress Collection
```javascript
{
  userId: ObjectId (User),
  courseId: ObjectId (Course),
  lastSlideIndex: Number,
  completedSlides: [ObjectId],
  quizScore: Number,
  passed: Boolean,
  certificateId: ObjectId (Certificate),
  lastAccessed: Date,
  enrolledAt: Date,
  completedAt: Date,
  timeSpent: Number
}
```

### Certificates Collection
```javascript
{
  userId: ObjectId (User),
  courseId: ObjectId (Course),
  courseTitle: String,
  userName: String,
  score: Number,
  uniqueId: String (unique),
  issuedAt: Date,
  isActive: Boolean
}
```

## 📂 Project Structure

```
corporate-training-platform/
├── backend/                # Backend server
│   ├── src/
│   │   ├── server.js      # Main server file
│   │   ├── controllers/   # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── chatbotController.js
│   │   │   ├── courseController.js
│   │   │   └── progressController.js
│   │   ├── routes/        # API routes
│   │   │   ├── auth.js
│   │   │   ├── chatbot.js
│   │   │   ├── courses.js
│   │   │   └── progress.js
│   │   ├── models/        # MongoDB models
│   │   │   ├── Certificate.js
│   │   │   ├── Course.js
│   │   │   ├── User.js
│   │   │   └── UserProgress.js
│   │   ├── middleware/    # Auth & validation
│   │   │   ├── auth.js
│   │   │   └── errorHandler.js
│   │   ├── db/            # In-memory database
│   │   │   └── inMemoryDB.js
│   │   └── utils/         # Helper functions
│   │       ├── generateToken.js
│   │       └── seedData.js
│   ├── config.env.example # Environment template
│   └── package.json
├── src/                   # Frontend React app
│   ├── pages/             # Page components
│   │   ├── AdminDashboard.tsx
│   │   ├── CertificatePage.tsx
│   │   ├── ChatbotCoach.tsx
│   │   ├── CourseOverview.tsx
│   │   ├── CoursesPage.tsx
│   │   ├── LandingPage.tsx
│   │   ├── LessonViewer.tsx
│   │   ├── LoginPage.tsx
│   │   ├── QuizPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── StudentDashboard.tsx
│   ├── components/        # Reusable components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── LessonManager.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── VideoPlayer.tsx
│   ├── data/              # Demo data
│   │   └── demoData.ts
│   ├── hooks/             # Custom React hooks
│   │   └── useAuthContext.tsx
│   ├── services/          # API service layer
│   │   └── api.ts
│   ├── types/             # TypeScript interfaces
│   │   └── index.ts
│   └── utils/             # Utility functions
│       ├── cn.ts
│       └── storage.ts
├── CHATBOT_SETUP.md       # Chatbot setup guide
├── start-app.bat          # Windows startup script
└── package.json
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (Student/Admin)
- Input validation and sanitization
- CORS configuration
- Secure API endpoints
- Environment variable protection

## 📝 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Courses
- `GET /api/courses` - Get all courses (published for students, all for admin)
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (Admin only)
- `PUT /api/courses/:id` - Update course (Admin only)
- `DELETE /api/courses/:id` - Delete course (Admin only)
- `POST /api/courses/:id/enroll` - Enroll in course

### Progress
- `GET /api/progress` - Get user progress for all courses
- `GET /api/progress/:userId/:courseId` - Get user progress
- `POST /api/progress/lesson` - Update lesson progress
- `POST /api/progress/quiz` - Submit quiz results
- `GET /api/progress/certificates` - Get user certificates

### Chatbot
- `POST /api/chatbot/chat` - Chat with AI assistant

## 🎨 UI/UX Highlights

- **Gradient Headers**: Eye-catching course section headers
- **Progress Milestones**: Visual feedback at 25%, 50%, 75%, 100%
- **Celebration Animations**: Confetti and success messages on completion
- **Interactive Quizzes**: Hover effects and instant visual feedback
- **XP System**: Gamified learning experience
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify/Render.com)

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Set environment variables**
   ```
   VITE_API_URL=https://your-backend-api.com/api
   ```

3. **Deploy the `dist` folder** to your hosting platform

### Backend Deployment (Heroku/Railway/Render.com)

1. **Set environment variables** (use config.env as reference)
   ```
   NODE_ENV=production
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-production-jwt-secret
   JWT_EXPIRE=7d
   FRONTEND_URL=https://your-frontend-domain.com
   GROQ_API_KEY=your-groq-api-key (optional)
   OPENAI_API_KEY=your-openai-api-key (optional)
   ```

2. **Deploy backend**
   ```bash
   cd backend
   # Follow your platform's deployment guide
   ```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev  # Starts with nodemon for auto-restart
```

### Frontend Development
```bash
npm run dev  # Starts Vite dev server
```

### Database Management
```bash
# Seed database with demo data
cd backend
npm run seed

# Clear database (be careful!)
# Connect to MongoDB and drop collections
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test  # Run backend tests
```

### Frontend Testing
```bash
npm test  # Run frontend tests
```

## ✅ Current Status

**WORKING FEATURES:**
- Full MERN stack implementation
- User authentication (JWT-based)
- Course management (CRUD operations)
- Lesson progress tracking
- Quiz system with scoring
- Certificate generation
- Admin dashboard with course editing
- Student lesson viewer with "Mark Complete" functionality
- MongoDB database integration
- In-memory database fallback for development
- AI chatbot coach
- Responsive design
- Real-time progress updates
- Role-based access control

## 🚧 Future Enhancements

- Real-time notifications
- Video lesson support
- Discussion forums
- Advanced analytics
- Mobile app
- Multi-language support
- Payment integration
- Advanced reporting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Add tests if applicable
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Course content based on ICO (Information Commissioner's Office) guidelines
- Cybersecurity best practices from leading authorities
- AI powered by Groq (FREE) and OpenAI APIs
- Built with modern web technologies

## 📧 Contact

**Paul** - [@PaulLDN](https://github.com/PaulLDN)

Project Link: [https://github.com/PaulLDN/cursor.webapp](https://github.com/PaulLDN/cursor.webapp)

---

⭐ If you find this project useful, please consider giving it a star on GitHub! ⭐
