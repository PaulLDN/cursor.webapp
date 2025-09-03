# Corporate Training Platform

A modern, professional online training platform for corporate training and compliance, focused on GDPR & Web Security. Built with React, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Features

### Core Functionality
- **Role-based Authentication** - Student and Admin roles with protected routes
- **Course Management** - Complete course catalog with filtering and search
- **Interactive Learning** - Slide-based lessons with progress tracking
- **Pre-Quiz Coach** - AI-powered chatbot for quiz preparation
- **Assessment System** - 20-question quizzes with instant scoring
- **Certificate Generation** - Professional certificates with PDF export
- **Progress Tracking** - Comprehensive analytics and progress monitoring
- **Admin Dashboard** - Full CRUD operations for courses and content

### Design & UX
- **Professional Theme** - Deep blue to purple gradient design
- **Responsive Design** - Mobile-first approach with desktop scaling
- **Smooth Animations** - Micro-interactions and transitions
- **Accessibility** - Keyboard navigation and ARIA labels
- **Modern UI** - Card-based layouts with generous whitespace

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **State Management**: React Context + Hooks
- **Persistence**: LocalStorage (demo-ready for backend integration)

## 📚 Demo Courses

### 1. GDPR Compliance Fundamentals
- **Duration**: 120 minutes
- **Level**: Intermediate
- **Content**: 10 comprehensive slides covering GDPR principles, rights, and implementation
- **Quiz**: 20 questions with detailed explanations
- **Topics**: Personal data, legal basis, individual rights, data breaches, DPIA

### 2. Web Security Fundamentals
- **Duration**: 90 minutes
- **Level**: Beginner
- **Content**: 10 slides covering essential web security concepts
- **Quiz**: 20 questions with practical scenarios
- **Topics**: HTTPS, SQL injection, XSS, CSRF, authentication, security headers

## 🔐 Demo Accounts

### Student Account
- **Email**: `student@example.com`
- **Password**: `password`
- **Access**: Course enrollment, lessons, quizzes, certificates

### Admin Account
- **Email**: `admin@example.com`
- **Password**: `password`
- **Access**: Course management, student progress, analytics

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd corporate-training-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 User Flows

### Student Journey
1. **Landing Page** → Browse features and benefits
2. **Login/Register** → Access with demo credentials
3. **Dashboard** → View progress and continue learning
4. **Course Catalog** → Browse and enroll in courses
5. **Course Overview** → Review syllabus and start learning
6. **Lesson Viewer** → Navigate through slides with progress tracking
7. **Pre-Quiz Coach** → Chat with AI assistant for quiz preparation
8. **Quiz System** → Take 20-question assessment with instant feedback
9. **Certificate** → Download professional certificate upon passing

### Admin Journey
1. **Admin Login** → Access admin dashboard
2. **Course Management** → Create, edit, and manage courses
3. **Content Management** → Add slides, quiz questions, and FAQ
4. **Analytics** → Monitor student progress and completion rates
5. **User Management** → View student enrollments and certificates

## 🎨 Design System

### Colors
- **Primary Gradient**: `#0B2B6B → #6A32C9`
- **Success**: `#34C759`
- **Warning**: `#FFB020`
- **Neutral Grays**: For text and backgrounds

### Typography
- **Font Stack**: Inter or system font stack
- **Hierarchy**: Clear heading and body text styles

### Components
- **Buttons**: Multiple variants with hover states
- **Cards**: Consistent spacing and shadows
- **Forms**: Accessible inputs with validation
- **Navigation**: Responsive with active states

## 🔧 Architecture

### File Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── types/              # TypeScript interfaces
├── data/               # Demo data and seed content
├── utils/              # Utility functions
└── App.tsx             # Main application component
```

### Key Features
- **Type Safety**: Full TypeScript coverage
- **Component Library**: Reusable, accessible components
- **State Management**: Context-based authentication and data
- **Routing**: Protected routes with role-based access
- **Persistence**: LocalStorage for demo data (backend-ready)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Connect your repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Deploy!

## 🔮 Future Enhancements

### Backend Integration
- Replace LocalStorage with real API calls
- Implement user management and authentication
- Add file upload for course media
- Real-time progress synchronization

### Advanced Features
- **Video Lessons** - Support for video content
- **Discussion Forums** - Student and instructor interaction
- **Advanced Analytics** - Detailed learning insights
- **Mobile App** - React Native version
- **Multi-language** - Internationalization support
- **Dark Mode** - Theme switching capability

### Content Expansion
- **Additional Courses** - More compliance and security topics
- **Interactive Labs** - Hands-on practical exercises
- **Peer Learning** - Collaborative features
- **Instructor Tools** - Advanced content creation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ for professional development and compliance training**
