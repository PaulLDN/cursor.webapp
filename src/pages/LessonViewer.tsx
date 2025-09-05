import { useParams, Link } from 'react-router-dom';
import { demoCourses } from '@/data/demoData';
import Button from '@/components/Button';
import VideoPlayer from '@/components/VideoPlayer';
import { ChevronLeft, ChevronRight, CheckCircle, Play, FileText, Video, HelpCircle } from 'lucide-react';
import { Lesson } from '@/types';

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

  // Convert syllabus to lessons format
  const lessons = course.syllabus.map((slide, index) => ({
    id: slide.id,
    title: slide.title,
    description: slide.content.substring(0, 100) + '...',
    type: slide.mediaType === 'video' ? 'video' : 'text',
    content: slide.content,
    videoUrl: slide.mediaUrl,
    duration: 5,
    order: index + 1,
    isPublished: true,
    courseId: course.id
  }));

  const currentLesson = lessons[currentSlideIndex];
  const isLastLesson = currentSlideIndex === lessons.length - 1;
  const isFirstLesson = currentSlideIndex === 0;

  if (!currentLesson) {
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

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'quiz':
        return <HelpCircle className="h-5 w-5" />;
      case 'slide':
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

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
              <div className="flex items-center space-x-2">
                {getLessonIcon(currentLesson.type)}
                <span className="text-sm text-gray-600">
                  Lesson {currentSlideIndex + 1} of {lessons.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentSlideIndex + 1) / lessons.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-corporate h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSlideIndex + 1) / lessons.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Lesson Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            {getLessonIcon(currentLesson.type)}
            <h1 className="text-3xl font-bold text-gray-900">{currentLesson.title}</h1>
          </div>
          
          {currentLesson.description && (
            <p className="text-lg text-gray-600 mb-6">{currentLesson.description}</p>
          )}

          {/* Video Lesson */}
          {currentLesson.type === 'video' && currentLesson.videoUrl && (
            <div className="mb-8">
              <VideoPlayer
                videoUrl={currentLesson.videoUrl}
                title={currentLesson.title}
                className="w-full h-96"
              />
            </div>
          )}

          {/* Text Content */}
          {currentLesson.content && (
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {currentLesson.content}
              </div>
            </div>
          )}

          {/* Quiz Lesson */}
          {currentLesson.type === 'quiz' && (
            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-4">
                <HelpCircle className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-900">Quiz Lesson</h3>
              </div>
              <p className="text-blue-800">This lesson contains quiz questions. Complete the quiz to proceed.</p>
              <Button className="mt-4">
                <Play className="h-4 w-4 mr-2" />
                Start Quiz
              </Button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div>
            {!isFirstLesson && (
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
            
            {!isLastLesson ? (
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
