import { useParams, Link } from 'react-router-dom';
import { demoCourses } from '@/data/demoData';
import Button from '@/components/Button';
import { Clock, BookOpen, Play, MessageCircle, FileText } from 'lucide-react';

const CourseOverview = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = demoCourses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <Link to="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-8">
              <div className="mb-6">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  course.level === 'beginner' ? 'bg-green-100 text-green-800' :
                  course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">{course.title}</h1>
                <p className="text-gray-600 text-lg">{course.description}</p>
              </div>

              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{course.duration} minutes</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <span>{course.syllabus.length} lessons</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FileText className="h-5 w-5 mr-2" />
                  <span>20 quiz questions</span>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What you'll learn</h3>
                <ul className="space-y-2">
                  {course.syllabus.slice(0, 5).map((slide, index) => (
                    <li key={slide.id} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-corporate-primary text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{slide.title}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-4">
                <Link to={`/courses/${course.id}/lesson/0`}>
                  <Button size="lg">
                    <Play className="h-5 w-5 mr-2" />
                    Start Course
                  </Button>
                </Link>
                <Link to={`/courses/${course.id}/coach`}>
                  <Button variant="outline" size="lg">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Pre-Quiz Coach
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Lessons</span>
                    <span>0 / {course.syllabus.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-corporate h-2 rounded-full w-0"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Quiz</span>
                    <span>Not taken</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-200 h-2 rounded-full w-0"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Level</span>
                  <span className="font-medium">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{course.duration} min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lessons</span>
                  <span className="font-medium">{course.syllabus.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quiz Questions</span>
                  <span className="font-medium">20</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
