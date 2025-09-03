import { useParams, Link } from 'react-router-dom';
import { demoCourses } from '@/data/demoData';
import Button from '@/components/Button';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const LessonViewer = () => {
  const { courseId, slideIndex } = useParams<{ courseId: string; slideIndex: string }>();
  const course = demoCourses.find(c => c.id === courseId);
  const currentSlideIndex = parseInt(slideIndex || '0');
  
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

  const currentSlide = course.syllabus[currentSlideIndex];
  const isLastSlide = currentSlideIndex === course.syllabus.length - 1;
  const isFirstSlide = currentSlideIndex === 0;

  if (!currentSlide) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson not found</h2>
          <Link to={`/courses/${course.id}`}>
            <Button>Back to Course</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to={`/courses/${course.id}`} className="text-corporate-primary hover:text-corporate-secondary">
                ← Back to Course
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Lesson {currentSlideIndex + 1} of {course.syllabus.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentSlideIndex + 1) / course.syllabus.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-corporate h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSlideIndex + 1) / course.syllabus.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Lesson Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{currentSlide.title}</h1>
          
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {currentSlide.content}
            </div>
          </div>

          {currentSlide.mediaUrl && (
            <div className="mt-8">
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <p className="text-gray-600">Media placeholder: {currentSlide.mediaUrl}</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div>
            {!isFirstSlide && (
              <Link to={`/courses/${course.id}/lesson/${currentSlideIndex - 1}`}>
                <Button variant="outline">
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Complete
            </Button>
            
            {!isLastSlide ? (
              <Link to={`/courses/${course.id}/lesson/${currentSlideIndex + 1}`}>
                <Button>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Link to={`/courses/${course.id}/coach`}>
                <Button>
                  Continue to Coach
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;
