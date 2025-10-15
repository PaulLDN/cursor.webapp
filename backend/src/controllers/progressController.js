const db = require('../db/inMemoryDB');

// @desc    Get user progress for all courses
// @route   GET /api/progress
// @access  Private
const getUserProgress = async (req, res) => {
  try {
    const progress = await UserProgress.find({ userId: req.user.id })
      .populate('courseId', 'title description heroImage level duration')
      .sort({ lastAccessed: -1 });

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error('Get user progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get progress for specific course
// @route   GET /api/progress/:courseId
// @access  Private
const getCourseProgress = async (req, res) => {
  try {
    const progress = await UserProgress.findOne({
      userId: req.user.id,
      courseId: req.params.courseId
    }).populate('courseId', 'title syllabus quizQuestions');

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Not enrolled in this course'
      });
    }

    res.json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error('Get course progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update lesson progress
// @route   PUT /api/progress/:courseId/lesson
// @access  Public (for demo purposes)
const updateLessonProgress = async (req, res) => {
  try {
    const { slideIndex, completedSlides, timeSpent } = req.body;
    
    console.log('📝 Progress update request:', {
      courseId: req.params.courseId,
      slideIndex,
      completedSlides,
      timeSpent
    });

    // For demo purposes, we'll store progress in memory
    // In a real app, this would be saved per user
    const progress = {
      courseId: req.params.courseId,
      lastSlideIndex: slideIndex,
      completedSlides: completedSlides || [],
      timeSpent: timeSpent || 0,
      lastAccessed: new Date()
    };

    console.log('✅ Lesson progress updated successfully:', progress);

    res.json({
      success: true,
      data: progress,
      message: 'Progress updated successfully'
    });
  } catch (error) {
    console.error('Update lesson progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Submit quiz
// @route   POST /api/progress/:courseId/quiz
// @access  Private
const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;

    // Get course and progress
    const course = await Course.findById(req.params.courseId);
    const progress = await UserProgress.findOne({
      userId: req.user.id,
      courseId: req.params.courseId
    });

    if (!course || !progress) {
      return res.status(404).json({
        success: false,
        message: 'Course or progress not found'
      });
    }

    // Calculate score
    let correctAnswers = 0;
    course.quizQuestions.forEach((question, index) => {
      if (answers[index] === question.correctIndex) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / course.quizQuestions.length) * 100);
    const passed = score >= 70;

    // Update progress
    progress.quizScore = score;
    progress.passed = passed;
    progress.completedAt = passed ? new Date() : null;

    await progress.save();

    // Create certificate if passed
    let certificate = null;
    if (passed) {
      certificate = await Certificate.create({
        userId: req.user.id,
        courseId: course._id,
        courseTitle: course.title,
        userName: req.user.name,
        score: score
      });
    }

    res.json({
      success: true,
      data: {
        score,
        passed,
        correctAnswers,
        totalQuestions: course.quizQuestions.length,
        certificate: certificate ? {
          id: certificate._id,
          uniqueId: certificate.uniqueId
        } : null
      }
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user certificates
// @route   GET /api/progress/certificates
// @access  Private
const getUserCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ userId: req.user.id })
      .populate('courseId', 'title heroImage')
      .sort({ issuedAt: -1 });

    res.json({
      success: true,
      data: certificates
    });
  } catch (error) {
    console.error('Get certificates error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getUserProgress,
  getCourseProgress,
  updateLessonProgress,
  submitQuiz,
  getUserCertificates
};
