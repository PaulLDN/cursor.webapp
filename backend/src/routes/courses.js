const express = require('express');
const { body } = require('express-validator');
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  updateCourseLessons,
  getCourseLessons
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/courses
router.get('/', getCourses);

// @route   GET /api/courses/:id
router.get('/:id', getCourse);

// @route   POST /api/courses
router.post('/', protect, authorize('admin'), [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters'),
  body('shortDescription')
    .trim()
    .isLength({ min: 10, max: 200 })
    .withMessage('Short description must be between 10 and 200 characters'),
  body('duration')
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer'),
  body('level')
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Level must be beginner, intermediate, or advanced'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
], createCourse);

// @route   PUT /api/courses/:id
router.put('/:id', protect, authorize('admin'), updateCourse);

// @route   DELETE /api/courses/:id
router.delete('/:id', protect, authorize('admin'), deleteCourse);

// @route   POST /api/courses/:id/enroll
router.post('/:id/enroll', protect, enrollInCourse);

// @route   PUT /api/courses/:id/lessons
router.put('/:id/lessons', protect, authorize('admin'), [
  body('lessons')
    .isArray()
    .withMessage('Lessons must be an array')
], updateCourseLessons);

// @route   GET /api/courses/:id/lessons
router.get('/:id/lessons', getCourseLessons);

module.exports = router;
