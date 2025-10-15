import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { demoCourses } from '@/data/demoData';
import { apiService } from '@/services/api';
import Button from '@/components/Button';
import { CheckCircle, XCircle, ArrowLeft, ArrowRight, Trophy, Star, Award, Zap } from 'lucide-react';

const QuizPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Load course data
  useEffect(() => {
    const loadCourse = async () => {
      try {
        // First try to find course in demo data (for slug-based URLs)
        let foundCourse = demoCourses.find(c => c.id === courseId);
        
        // If not found in demo data, try API (for MongoDB _id-based URLs)
        if (!foundCourse) {
          const response = await apiService.getCourses();
          if (response.success && response.data) {
            foundCourse = response.data.find((c: any) => c._id === courseId || c.id === courseId);
          }
        }

        if (foundCourse) {
          setCourse(foundCourse);
          // Initialize answers array with the correct length
          setAnswers(new Array(foundCourse.quizQuestions.length).fill(-1));
        }
      } catch (error) {
        console.error('Error loading course:', error);
      }
    };

    if (courseId) {
      loadCourse();
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

  const questions = course.quizQuestions;
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctIndex) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
  };

  if (showResults) {
    const passed = score >= 70;
    const correctAnswers = Math.round((score / 100) * questions.length);
    const earnedXP = correctAnswers * 25; // 25 XP per correct answer
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header Banner */}
            <div className={`p-8 ${passed ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-orange-400 to-red-500'}`}>
              <div className="text-center text-white">
                <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center bg-white bg-opacity-20 backdrop-blur-sm ${
                  passed ? 'animate-bounce' : ''
                }`}>
                  {passed ? (
                    <Trophy className="h-14 w-14 text-white" />
                  ) : (
                    <Award className="h-14 w-14 text-white" />
                  )}
                </div>
                
                <h2 className="text-4xl font-bold mb-2">
                  {passed ? '🎉 Congratulations! 🎉' : 'Quiz Complete!'}
                </h2>
                
                <p className="text-xl opacity-90">
                  {passed ? 'You passed with flying colors!' : 'Keep learning and try again!'}
                </p>
              </div>
            </div>

            {/* Results Body */}
            <div className="p-8">
              {/* Score Display */}
              <div className="text-center mb-8">
                <div className="inline-block">
                  <div className="relative">
                    <svg className="w-48 h-48" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={passed ? '#10b981' : '#f59e0b'}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={`${(score / 100) * 251.2} 251.2`}
                        transform="rotate(-90 50 50)"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-bold text-gray-900">{score}%</span>
                      <span className="text-sm text-gray-500 mt-1">Score</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg text-gray-700 mt-4">
                  {correctAnswers} out of {questions.length} questions correct
                </p>
              </div>

              {/* XP Earned */}
              {passed && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-center space-x-3">
                    <Star className="h-8 w-8 text-yellow-500 fill-current" />
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Experience Points Earned</p>
                      <p className="text-3xl font-bold text-yellow-600">+{earnedXP} XP</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500 fill-current" />
                  </div>
                </div>
              )}

              {/* Pass/Fail Message */}
              {passed ? (
                <div className="mb-6 text-center">
                  <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-6 py-3 rounded-full mb-4">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">Quiz Passed!</span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Outstanding work! You've demonstrated excellent understanding of the material.
                  </p>
                  <Link to={`/courses/${course.id}/certificate`}>
                    <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-xl transition-shadow">
                      <Trophy className="h-5 w-5 mr-2" />
                      Get Your Certificate
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="mb-6 text-center">
                  <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-6 py-3 rounded-full mb-4">
                    <Zap className="h-5 w-5" />
                    <span className="font-semibold">Keep Going!</span>
                  </div>
                  <p className="text-gray-700 mb-4">
                    You need 70% to pass. Review the course material and come back stronger!
                  </p>
                  <Link to={`/courses/${course.id}`}>
                    <Button variant="outline" size="lg" className="border-2 hover:bg-gray-50">
                      <ArrowLeft className="h-5 w-5 mr-2" />
                      Review Course Material
                    </Button>
                  </Link>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 pt-6 border-t">
                <Link to={`/courses/${course.id}`}>
                  <Button variant="outline">Back to Course</Button>
                </Link>
                <Link to="/dashboard">
                  <Button variant="outline">Dashboard</Button>
                </Link>
              </div>
            </div>
          </div>
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
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress with Gamification */}
        <div className="mb-8">
          <div className="flex justify-between items-center text-sm mb-2">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-corporate-primary" />
              <span className="font-semibold text-gray-700">Quiz Progress</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {answers.filter(a => a !== -1).length} / {questions.length} answered
              </span>
              <span className="font-bold text-corporate-primary">
                {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
              </span>
            </div>
          </div>
          <div className="relative w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8 border border-gray-100">
          {/* Question Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                  <span className="text-lg font-bold">Q{currentQuestionIndex + 1}</span>
                </div>
                <span className="text-sm opacity-90">of {questions.length}</span>
              </div>
              {answers[currentQuestionIndex] !== -1 && (
                <div className="bg-green-500 bg-opacity-90 px-4 py-2 rounded-full flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-semibold">Answered</span>
                </div>
              )}
            </div>
          </div>

          {/* Question Body */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
              {currentQuestion.question}
            </h2>
            
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = answers[currentQuestionIndex] === index;
                const optionLabels = ['A', 'B', 'C', 'D'];
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 group ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-lg scale-[1.02]'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                        isSelected
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100'
                      }`}>
                        {optionLabels[index]}
                      </div>
                      <span className={`flex-1 text-lg ${
                        isSelected ? 'text-gray-900 font-medium' : 'text-gray-700'
                      }`}>
                        {option}
                      </span>
                      {isSelected && (
                        <CheckCircle className="h-6 w-6 text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div>
            {!isFirstQuestion && (
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                className="flex items-center space-x-2 hover:bg-gray-50"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Previous</span>
              </Button>
            )}
          </div>

          <div>
            {!isLastQuestion ? (
              <Button 
                onClick={handleNext} 
                disabled={answers[currentQuestionIndex] === -1}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Next Question</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                disabled={answers[currentQuestionIndex] === -1}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trophy className="h-5 w-5" />
                <span>Submit Quiz</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
