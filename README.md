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
- **AI Chatbot Coach**: Pre-quiz preparation assistant powered by free Groq AI (llama-3.1-70b)
- **Responsive Design**: Modern UI built with Tailwind CSS

### 👨‍💼 For Administrators
- **Dashboard**: Overview of all students and their progress
- **Course Management**: Create, edit, and manage course content
- **Analytics**: Track completion rates and quiz performance
- **User Management**: View and manage student accounts

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
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

4. **Get a FREE Gemini API Key **
   - Visit (https://aistudio.google.com/app/api-keys)
   - Sign up for a free student account
   - Generate an API key
   - Add it to `backend/config.env`:
    

5. **Run the application**
   
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

   # Terminal 2 - Frontend
   npm run dev
   ```

6. **Access the application**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)

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
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **In-memory database** for quick development (MongoDB-ready)
- **OpenAI SDK** for AI integrations (Groq & OpenAI)

## 📂 Project Structure

```
cursor.webapp/
├── backend/                # Backend server
│   ├── src/
│   │   ├── server.js      # Main server file
│   │   ├── controllers/   # Request handlers
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth & validation
│   │   ├── db/            # In-memory database
│   │   └── utils/         # Helper functions
│   ├── config.env.example # Environment template
│   └── package.json
├── src/                   # Frontend React app
│   ├── pages/             # Page components
│   ├── components/        # Reusable components
│   ├── data/              # Demo data
│   ├── hooks/             # Custom React hooks
│   └── services/          # API service layer
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

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (Admin)
- `PUT /api/courses/:id` - Update course (Admin)
- `DELETE /api/courses/:id` - Delete course (Admin)

### Progress
- `GET /api/progress/:userId/:courseId` - Get user progress
- `POST /api/progress/lesson` - Update lesson progress
- `POST /api/progress/quiz` - Submit quiz results

### Chatbot
- `POST /api/chatbot/chat` - Chat with AI assistant

## 🎨 UI/UX Highlights

- **Gradient Headers**: Eye-catching course section headers
- **Progress Milestones**: Visual feedback at 25%, 50%, 75%, 100%
- **Celebration Animations**: Confetti and success messages on completion
- **Interactive Quizzes**: Hover effects and instant visual feedback
- **XP System**: Gamified learning experience
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🚢 Deployment

### Frontend (Render.com)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend (Render.com)
```bash
cd backend
# Follow your platform's deployment guide
```

### Environment Variables for Production
Make sure to set all variables from `config.env.example` in your hosting platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Course content based on ICO (Information Commissioner's Office) guidelines
- Cybersecurity best practices from leading authorities
- AI powered by Groq (FREE) and OpenAI APIs
- Built with modern web technologies

## 📧 Contact

**Paul** - [@PaulLDN](https://github.com/PaulLDN)


⭐⭐⭐
