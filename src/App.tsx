import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/hooks/useAuthContext';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import StudentDashboard from '@/pages/StudentDashboard';
import CoursesPage from '@/pages/CoursesPage';
import CourseOverview from '@/pages/CourseOverview';
import LessonViewer from '@/pages/LessonViewer';
import ChatbotCoach from '@/pages/ChatbotCoach';
import QuizPage from '@/pages/QuizPage';
import CertificatePage from '@/pages/CertificatePage';
import AdminDashboard from '@/pages/AdminDashboard';
import LoadingSpinner from '@/components/LoadingSpinner';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'student' | 'admin';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Main App Routes
const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace /> : <LoginPage />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace /> : <RegisterPage />} 
      />

      {/* Student Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/courses" 
        element={
          <ProtectedRoute requiredRole="student">
            <CoursesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/courses/:courseId" 
        element={
          <ProtectedRoute requiredRole="student">
            <CourseOverview />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/courses/:courseId/lesson/:slideIndex" 
        element={
          <ProtectedRoute requiredRole="student">
            <LessonViewer />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/courses/:courseId/coach" 
        element={
          <ProtectedRoute requiredRole="student">
            <ChatbotCoach />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/courses/:courseId/quiz" 
        element={
          <ProtectedRoute requiredRole="student">
            <QuizPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/courses/:courseId/certificate" 
        element={
          <ProtectedRoute requiredRole="student">
            <CertificatePage />
          </ProtectedRoute>
        } 
      />

      {/* Admin Routes */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Main App Component
const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
};

export default App;
