import { useParams, Link, useNavigate } from 'react-router-dom';
import { demoCourses } from '@/data/demoData';
import Button from '@/components/Button';
import VideoPlayer from '@/components/VideoPlayer';
import { ChevronLeft, ChevronRight, CheckCircle, Play, FileText, Video, HelpCircle, Award, Star, Zap, Trophy } from 'lucide-react';
import { Lesson } from '@/types';
import { useState, useEffect } from 'react';

const LessonViewer = () => {
  const { courseId, slideIndex } = useParams<{ courseId: string; slideIndex: string }>();
  const navigate = useNavigate();
  const course = demoCourses.find(c => c.id === courseId);
  const currentSlideIndex = parseInt(slideIndex || '0');
  
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [markingComplete, setMarkingComplete] = useState(false);

  // Load completed lessons from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`completed_lessons_${courseId}`);
    if (stored) {
      setCompletedLessons(JSON.parse(stored));
    }
  }, [courseId]);

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
    duration: slide.duration || 15,
    order: index + 1,
    isPublished: true,
    courseId: course.id
  }));

  const currentLesson = lessons[currentSlideIndex];
  const isLastLesson = currentSlideIndex === lessons.length - 1;
  const isFirstLesson = currentSlideIndex === 0;
  const isCompleted = completedLessons.includes(currentLesson?.id || '');

  const handleMarkComplete = async () => {
    if (!currentLesson || isCompleted) return;
    
    setMarkingComplete(true);
    
    try {
      // Add to completed lessons
      const newCompleted = [...completedLessons, currentLesson.id];
      setCompletedLessons(newCompleted);
      
      // Save to localStorage
      localStorage.setItem(`completed_lessons_${courseId}`, JSON.stringify(newCompleted));
      
      // Show success animation
      const xp = Math.floor(Math.random() * 50) + 50; // Random XP between 50-100
      setEarnedXP(xp);
      setShowXPAnimation(true);
      
      // Show success message
      setTimeout(() => {
        setMarkingComplete(false);
        setShowXPAnimation(false);
        
        // Auto-advance to next lesson or show completion message
        if (!isLastLesson) {
          const nextIndex = currentSlideIndex + 1;
          navigate(`/courses/${courseId}/lesson/${nextIndex}`);
        } else {
          // Course completed - show completion message
          setShowCelebration(true);
          setTimeout(() => {
            navigate(`/courses/${courseId}/coach`);
          }, 3000);
        }
      }, 2000);
      
    } catch (error) {
      console.error('Error marking lesson complete:', error);
      setMarkingComplete(false);
    }
  };

  const formatContent = (content: string) => {
    // Split content into paragraphs and format
    const sections = content.split('\n\n');
    
    return sections.map((section, index) => {
      // Check if it's a heading (starts with **)
      if (section.trim().startsWith('**') && section.trim().endsWith('**')) {
        const heading = section.replace(/\*\*/g, '').trim();
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4 flex items-center">
            <Zap className="h-6 w-6 text-yellow-500 mr-2" />
            {heading}
          </h2>
        );
      }
      
      // Check if it's a bullet list
      if (section.includes('• ') || section.includes('- ')) {
        const items = section.split('\n').filter(line => line.trim().startsWith('• ') || line.trim().startsWith('- '));
        if (items.length > 0) {
          return (
            <ul key={index} className="space-y-3 my-6">
              {items.map((item, i) => {
                const text = item.replace(/^[•\-]\s*/, '').trim();
                // Check if item has bold text
                const parts = text.split(/(\*\*.*?\*\*)/g);
                return (
                  <li key={i} className="flex items-start group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-corporate-primary to-corporate-secondary flex items-center justify-center mt-0.5 mr-3 group-hover:scale-110 transition-transform">
                      <CheckCircle className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">
                      {parts.map((part, pi) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={pi} className="font-semibold text-gray-900">{part.replace(/\*\*/g, '')}</strong>;
                        }
                        return part;
                      })}
                    </span>
                  </li>
                );
              })}
            </ul>
          );
        }
      }
      
      // Regular paragraph - format bold text
      const parts = section.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-4 text-lg">
          {parts.map((part, pi) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pi} className="font-semibold text-gray-900">{part.replace(/\*\*/g, '')}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  const [earnedXP, setEarnedXP] = useState(0);
  const [showXPAnimation, setShowXPAnimation] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

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
        {/* XP Animation */}
        {showXPAnimation && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="animate-bounce">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full shadow-2xl flex items-center space-x-3 animate-pulse">
                <Star className="h-8 w-8" />
                <span className="text-2xl font-bold">+{earnedXP} XP</span>
                <Star className="h-8 w-8" />
              </div>
            </div>
          </div>
        )}

        {/* Course Celebration */}
        {showCelebration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-12 max-w-md text-center shadow-2xl animate-bounce">
              <div className="mb-6">
                <Trophy className="h-24 w-24 text-yellow-500 mx-auto animate-pulse" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                🎉 Congratulations! 🎉
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                You've completed the course!
              </p>
              <div className="flex items-center justify-center space-x-2 text-yellow-600">
                <Star className="h-6 w-6 fill-current" />
                <Star className="h-6 w-6 fill-current" />
                <Star className="h-6 w-6 fill-current" />
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar with Gamification */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-sm mb-2">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-corporate-primary" />
              <span className="font-semibold text-gray-700">Course Progress</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {completedLessons.length} / {lessons.length} lessons
              </span>
              <span className="font-bold text-corporate-primary">
                {Math.round(((currentSlideIndex + 1) / lessons.length) * 100)}%
              </span>
            </div>
          </div>
          <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-corporate-primary via-purple-500 to-corporate-secondary transition-all duration-500 ease-out rounded-full"
              style={{ width: `${((currentSlideIndex + 1) / lessons.length) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
            </div>
            {/* Milestone markers */}
            {[0.25, 0.5, 0.75, 1].map((milestone, i) => (
              <div
                key={i}
                className="absolute top-0 h-full w-0.5 bg-white"
                style={{ left: `${milestone * 100}%` }}
              >
                {((currentSlideIndex + 1) / lessons.length) >= milestone && (
                  <div className="absolute -top-1 -left-2 w-5 h-5 bg-yellow-400 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <Star className="h-3 w-3 text-yellow-900 fill-current" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lesson Content with Enhanced Styling */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8 border border-gray-100">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-corporate-primary to-corporate-secondary p-6">
            <div className="flex items-center space-x-3 text-white">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                {getLessonIcon(currentLesson.type)}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium opacity-90 mb-1">
                  Lesson {currentSlideIndex + 1} of {lessons.length}
                </div>
                <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
              </div>
              {isCompleted && (
                <div className="bg-green-500 bg-opacity-90 px-4 py-2 rounded-full flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">Completed</span>
                </div>
              )}
            </div>
          </div>

          {/* Content Body */}
          <div className="p-8">
            {/* Video Lesson */}
            {currentLesson.type === 'video' && currentLesson.videoUrl && (
              <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                <VideoPlayer
                  videoUrl={currentLesson.videoUrl}
                  title={currentLesson.title}
                  className="w-full h-96"
                />
              </div>
            )}

            {/* Text Content with Rich Formatting */}
            {currentLesson.content && (
              <div className="prose prose-lg max-w-none">
                <div className="text-content">
                  {formatContent(currentLesson.content)}
                </div>
              </div>
            )}

            {/* Quiz Lesson */}
            {currentLesson.type === 'quiz' && (
              <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 shadow-inner">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <HelpCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900">Quiz Challenge</h3>
                </div>
                <p className="text-blue-800 mb-4 text-lg">Test your knowledge and earn bonus XP! Complete the quiz to proceed.</p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Play className="h-4 w-4 mr-2" />
                  Start Quiz Challenge
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div>
            {!isFirstLesson && (
              <Link to={`/courses/${course.id}/lesson/${currentSlideIndex - 1}`}>
                <Button variant="outline" className="flex items-center space-x-2 hover:bg-gray-50">
                  <ChevronLeft className="h-5 w-5" />
                  <span>Previous Lesson</span>
                </Button>
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={handleMarkComplete}
              disabled={isCompleted || markingComplete}
              className={`transition-all duration-300 ${
                isCompleted 
                  ? 'bg-green-100 text-green-800 border-green-300 cursor-default' 
                  : 'hover:bg-green-50 hover:border-green-300'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                  <span className="font-semibold">Completed</span>
                </>
              ) : markingComplete ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                  <span>Marking...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Mark Complete</span>
                </>
              )}
            </Button>
            
            {!isLastLesson ? (
              <Link to={`/courses/${course.id}/lesson/${currentSlideIndex + 1}`}>
                <Button className="flex items-center space-x-2 bg-gradient-to-r from-corporate-primary to-corporate-secondary hover:shadow-lg transition-shadow">
                  <span>Next Lesson</span>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to={`/courses/${course.id}/coach`}>
                <Button className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg transition-shadow">
                  <Trophy className="h-5 w-5" />
                  <span>Complete & Continue</span>
                  <ChevronRight className="h-5 w-5" />
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
