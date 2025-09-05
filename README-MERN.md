# Corporate Training Platform - MERN Stack

A full-stack corporate training platform built with MongoDB, Express.js, React, and Node.js. This application provides comprehensive course management, user progress tracking, and certificate generation for corporate training and compliance.

## 🏗️ Architecture

### Backend (Node.js + Express + MongoDB)
- **API Server**: RESTful API with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **Security**: Password hashing with bcryptjs
- **Validation**: Input validation with express-validator

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context API
- **HTTP Client**: Fetch API with custom service layer
- **Build Tool**: Vite

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp config.env .env
   
   # Edit .env with your configuration
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/corporate-training
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas connection string in .env
   ```

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the backend server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd .. # Go back to root directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   echo "VITE_API_URL=http://localhost:5000/api" > .env
   ```

4. **Start the frontend development server**
   ```bash
   npm run dev
   ```

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

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Courses
- `GET /api/courses` - Get all published courses
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create course (Admin only)
- `PUT /api/courses/:id` - Update course (Admin only)
- `DELETE /api/courses/:id` - Delete course (Admin only)
- `POST /api/courses/:id/enroll` - Enroll in course

### Progress
- `GET /api/progress` - Get user progress for all courses
- `GET /api/progress/:courseId` - Get progress for specific course
- `PUT /api/progress/:courseId/lesson` - Update lesson progress
- `POST /api/progress/:courseId/quiz` - Submit quiz
- `GET /api/progress/certificates` - Get user certificates

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Registration/Login**: User provides credentials
2. **Token Generation**: Server generates JWT token
3. **Token Storage**: Frontend stores token in localStorage
4. **API Requests**: Token sent in Authorization header
5. **Token Validation**: Server validates token on protected routes

## 🎯 Demo Accounts

After seeding the database, you can use these accounts:

### Student Account
- **Email**: `student@example.com`
- **Password**: `password`
- **Role**: Student

### Admin Account
- **Email**: `admin@example.com`
- **Password**: `password`
- **Role**: Admin

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/DigitalOcean)

1. **Set environment variables**:
   ```
   NODE_ENV=production
   MONGODB_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-production-jwt-secret
   FRONTEND_URL=https://your-frontend-domain.com
   ```

2. **Deploy**:
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Vercel/Netlify)

1. **Set environment variables**:
   ```
   VITE_API_URL=https://your-backend-api.com/api
   ```

2. **Deploy**:
   ```bash
   npm run build
   # Deploy dist folder to your hosting platform
   ```

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

## 📁 Project Structure

```
corporate-training-platform/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Custom middleware
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── utils/           # Utility functions
│   │   └── server.js        # Main server file
│   ├── package.json
│   └── config.env          # Environment variables
├── src/                     # React frontend
│   ├── components/          # Reusable components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API service layer
│   ├── types/              # TypeScript interfaces
│   └── utils/              # Utility functions
├── package.json
└── README-MERN.md          # This file
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/corporate-training
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
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

## 📝 Features

### ✅ Implemented
- User authentication and authorization
- Course management (CRUD operations)
- User progress tracking
- Quiz system with scoring
- Certificate generation
- Responsive design
- Real-time progress updates
- Search and filtering
- Role-based access control

### 🚧 Future Enhancements
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
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ using the MERN stack**
