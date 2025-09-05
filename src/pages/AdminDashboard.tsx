import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuthContext';
import { demoCourses } from '@/data/demoData';
import Button from '@/components/Button';
import Input from '@/components/Input';
import LessonManager from '@/components/LessonManager';
import { Plus, Edit, Trash2, Users, BookOpen, Award, LogOut, Save, X, Search, Play } from 'lucide-react';
import { apiService } from '@/services/api';
import { Lesson } from '@/types';
import { lessonStorage } from '@/utils/lessonStorage';

interface Course {
  id: string;
  _id?: string; // MongoDB ObjectId
  title: string;
  description: string;
  level: string;
  duration: number;
  isPublished?: boolean;
  syllabus: any[];
  lessons?: Lesson[];
}

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [courses, setCourses] = useState<Course[]>(demoCourses);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // Load courses from API
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCourses();
      if (response.success && response.data) {
        // Load lessons from API for each course
        const coursesWithLessons = await Promise.all(
          response.data.map(async (course) => {
            try {
              // Use MongoDB _id for API calls, but keep both id and _id for frontend
              const courseId = course._id || course.id;
              const lessonsResponse = await apiService.getCourseLessons(courseId);
              return {
                ...course,
                id: course._id || course.id, // Ensure id is set
                _id: course._id, // Keep MongoDB _id
                lessons: lessonsResponse.success ? lessonsResponse.data : []
              };
            } catch (error) {
              console.error(`Error loading lessons for course ${course.id}:`, error);
              return {
                ...course,
                id: course._id || course.id,
                _id: course._id,
                lessons: []
              };
            }
          })
        );
        setCourses(coursesWithLessons);
        console.log('Courses loaded from database:', coursesWithLessons);
        console.log('First course lessons:', coursesWithLessons[0]?.lessons);
      } else {
        console.log('No courses found in database, using demo data');
        // Fallback to demo data
        setCourses(demoCourses);
      }
    } catch (error) {
      console.error('Error loading courses from API:', error);
      // Fallback to demo data
      setCourses(demoCourses);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCourse = (course: Course) => {
    // Ensure lessons array exists
    const courseWithLessons = {
      ...course,
      lessons: course.lessons || []
    };
    setEditingCourse(courseWithLessons);
  };

  const handleSaveCourse = async () => {
    if (!editingCourse) return;

    try {
      console.log('Saving course with lessons:', editingCourse);
      
      // Save to MongoDB via API
      const response = await apiService.updateCourse(editingCourse.id, editingCourse);
      if (response.success) {
        console.log('Course saved to database successfully');
        // Update local state
        setCourses(prev => 
          prev.map(course => 
            course.id === editingCourse.id ? { ...editingCourse } : course
          )
        );
        setEditingCourse(null);
      } else {
        console.error('Failed to save course to database');
        // Still update local state as fallback
        setCourses(prev => 
          prev.map(course => 
            course.id === editingCourse.id ? { ...editingCourse } : course
          )
        );
        setEditingCourse(null);
      }
    } catch (error) {
      console.error('Error saving course:', error);
      // Still update local state as fallback
      setCourses(prev => 
        prev.map(course => 
          course.id === editingCourse.id ? { ...editingCourse } : course
        )
      );
      setEditingCourse(null);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      // In a real app, this would call the API
      setCourses(prev => prev.filter(course => course.id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleLessonsChange = async (courseId: string, lessons: Lesson[]) => {
    console.log('Updating lessons for course:', courseId, lessons);
    
    try {
      // Find the course to get the correct MongoDB ID
      const course = courses.find(c => c.id === courseId);
      if (!course) {
        console.error('Course not found:', courseId);
        return;
      }
      
      // Use the MongoDB _id if available, otherwise use the courseId
      const mongoId = course._id || courseId;
      console.log('Using MongoDB ID:', mongoId);
      
      // Save to MongoDB via API
      const response = await apiService.updateCourseLessons(mongoId, lessons);
      if (response.success) {
        console.log('Lessons saved to database successfully');
        
        // Update local state
        setCourses(prev => 
          prev.map(course => 
            course.id === courseId ? { ...course, lessons } : course
          )
        );
        
        // Also update the editing course if it's the same course
        if (editingCourse && editingCourse.id === courseId) {
          setEditingCourse(prev => prev ? { ...prev, lessons } : null);
        }
      } else {
        console.error('Failed to save lessons to database:', response);
        // Still update local state as fallback
        setCourses(prev => 
          prev.map(course => 
            course.id === courseId ? { ...course, lessons } : course
          )
        );
        
        if (editingCourse && editingCourse.id === courseId) {
          setEditingCourse(prev => prev ? { ...prev, lessons } : null);
        }
      }
    } catch (error) {
      console.error('Error saving lessons:', error);
      // Still update local state as fallback
      setCourses(prev => 
        prev.map(course => 
          course.id === courseId ? { ...course, lessons } : course
        )
      );
      
      if (editingCourse && editingCourse.id === courseId) {
        setEditingCourse(prev => prev ? { ...prev, lessons } : null);
      }
    }
  };

  const getCourseLessons = (courseId: string): Lesson[] => {
    const course = courses.find(c => c.id === courseId);
    console.log('Getting lessons for course:', courseId, 'Course found:', course, 'Lessons:', course?.lessons);
    return course?.lessons || [];
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Courses', value: courses.length.toString(), icon: BookOpen, color: 'text-blue-600' },
    { label: 'Total Students', value: '1,234', icon: Users, color: 'text-green-600' },
    { label: 'Certificates Issued', value: '856', icon: Award, color: 'text-purple-600' },
    { label: 'Completion Rate', value: '78%', icon: BookOpen, color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gradient">Admin Dashboard</h1>
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
            Admin Dashboard
          </h2>
          <p className="text-gray-600">
            Manage courses, content, and monitor student progress
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-4">
              <Button 
                className="w-full justify-start"
                onClick={() => setShowCreateForm(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Course
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => {
                  const courseManagement = document.getElementById('course-management');
                  courseManagement?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Edit className="h-4 w-4 mr-2" />
                Manage Existing Courses
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => alert('Student Progress feature coming soon!')}
              >
                <Users className="h-4 w-4 mr-2" />
                View Student Progress
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => alert('Certificate Management feature coming soon!')}
              >
                <Award className="h-4 w-4 mr-2" />
                Manage Certificates
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">New student enrolled</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
                <span className="text-green-600 text-sm">+1</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Course completed</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
                <span className="text-blue-600 text-sm">GDPR</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Certificate issued</p>
                  <p className="text-xs text-gray-500">6 hours ago</p>
                </div>
                <span className="text-purple-600 text-sm">Web Security</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Management */}
        <div id="course-management" className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Course Management</h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button size="sm" onClick={() => setShowCreateForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Course
                </Button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading courses...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                    {editingCourse?.id === course.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Course Title
                            </label>
                            <Input
                              value={editingCourse.title}
                              onChange={(e) => setEditingCourse({...editingCourse, title: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Level
                            </label>
                            <select
                              value={editingCourse.level}
                              onChange={(e) => setEditingCourse({...editingCourse, level: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value="beginner">Beginner</option>
                              <option value="intermediate">Intermediate</option>
                              <option value="advanced">Advanced</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={editingCourse.description}
                            onChange={(e) => setEditingCourse({...editingCourse, description: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                          />
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="published"
                              checked={editingCourse.isPublished || false}
                              onChange={(e) => setEditingCourse({...editingCourse, isPublished: e.target.checked})}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="published" className="ml-2 text-sm text-gray-700">
                              Published
                            </label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button onClick={handleSaveCourse} size="sm">
                              <Save className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setEditingCourse(null)} 
                              size="sm"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>

                        {/* Lesson Management */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <LessonManager
                            courseId={editingCourse.id}
                            lessons={getCourseLessons(editingCourse.id)}
                            onLessonsChange={(lessons) => handleLessonsChange(editingCourse.id, lessons)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              course.level === 'beginner' ? 'bg-green-100 text-green-800' :
                              course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                            </span>
                            <span className="text-sm text-gray-500">{course.duration} minutes</span>
                            <span className="text-sm text-gray-500">
                              {course.lessons?.length || course.syllabus.length} lessons
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              course.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {course.isPublished ? 'Published' : 'Draft'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditCourse(course)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteCourse(course.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
