import { useAuth } from '@/hooks/useAuthContext';
import Button from '@/components/Button';
import { BookOpen, Award, Clock, TrendingUp, LogOut, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

interface RecentCourse {
  id: string;
  title: string;
  progress: number;
  lastAccessed: string;
  nextLesson: string;
}

const StudentDashboard = () => {
  const { user, logout } = useAuth();

  const stats: Stat[] = [
    { label: 'Courses Enrolled', value: '2', icon: BookOpen, color: 'text-corporate-secondary' },
    { label: 'Certificates Earned', value: '1', icon: Award, color: 'text-green-600' },
    { label: 'Hours Completed', value: '3.5', icon: Clock, color: 'text-corporate-primary' },
    { label: 'Average Score', value: '85%', icon: TrendingUp, color: 'text-orange-600' },
  ];

  const recentCourses: RecentCourse[] = [
    {
      id: 'gdpr-compliance',
      title: 'GDPR Training Course (SME Edition)',
      progress: 75,
      lastAccessed: '2 days ago',
      nextLesson: 'Module 4: Individuals\' Rights under GDPR'
    },
    {
      id: 'web-security-fundamentals',
      title: 'Cybersecurity Training Course (SME Edition)',
      progress: 45,
      lastAccessed: '1 week ago',
      nextLesson: 'Module 2: Passwords and Authentication – Your First Line of Defense'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gradient">Corporate Training</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h2>
          <p className="text-gray-600">
            Continue your learning journey and track your progress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat: Stat, index: number) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg bg-gray-50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Continue Learning</h3>
            </div>
            <div className="p-6 space-y-4">
              {recentCourses.map((course: RecentCourse) => (
                <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{course.title}</h4>
                    <span className="text-sm text-gray-500">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-corporate h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Next: {course.nextLesson}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">Last accessed: {course.lastAccessed}</span>
                    <Link to={`/courses/${course.id}`}>
                      <Button size="sm">Continue</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-4">
              <Link to="/courses">
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse All Courses
                </Button>
              </Link>
              <Button className="w-full justify-start" variant="outline">
                <Award className="h-4 w-4 mr-2" />
                View Certificates
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Progress Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
