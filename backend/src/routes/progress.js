const express = require('express');
const { body } = require('express-validator');
const {
  getUserProgress,
  getCourseProgress,
  updateLessonProgress,
  submitQuiz,
  getUserCertificates
} = require('../controllers/progressController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/progress
router.get('/', protect, getUserProgress);

// @route   GET /api/progress/certificates
router.get('/certificates', protect, getUserCertificates);

// @route   GET /api/progress/:courseId
router.get('/:courseId', protect, getCourseProgress);

// @route   PUT /api/progress/:courseId/lesson
router.put('/:courseId/lesson', [
  body('slideIndex')
    .isInt({ min: 0 })
    .withMessage('Slide index must be a non-negative integer'),
  body('completedSlides')
    .optional()
    .isArray()
    .withMessage('Completed slides must be an array'),
  body('timeSpent')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Time spent must be a non-negative integer')
], updateLessonProgress);

// @route   POST /api/progress/:courseId/quiz
router.post('/:courseId/quiz', protect, [
  body('answers')
    .isArray()
    .withMessage('Answers must be an array'),
  body('answers.*')
    .isInt({ min: 0 })
    .withMessage('Each answer must be a non-negative integer')
], submitQuiz);

module.exports = router;
