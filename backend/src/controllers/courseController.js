const db = require('../db/inMemoryDB');
const { validationResult } = require('express-validator');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const { level, search, page = 1, limit = 10 } = req.query;
    
    let courses = db.getAllCourses().filter(course => course.isPublished);
    
    // Filter by level
    if (level) {
      courses = courses.filter(course => course.level === level);
    }
    
    // Search functionality (simple text search)
    if (search) {
      const searchLower = search.toLowerCase();
      courses = courses.filter(course => 
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort by creation date (newest first)
    courses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const total = courses.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedCourses = courses.slice(startIndex, endIndex);

    res.json({
      success: true,
      count: paginatedCourses.length,
      total,
      data: paginatedCourses
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
const getCourse = async (req, res) => {
  try {
    const course = db.findCourseById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Admin only)
const createCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const courseData = {
      ...req.body,
      createdBy: req.user.id
    };

    const course = db.createCourse(courseData);

    res.status(201).json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Admin only)
const updateCourse = async (req, res) => {
  try {
    let course = db.findCourseById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user is the creator or admin
    if (course.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this course'
      });
    }

    // Update course in memory database
    Object.assign(course, req.body);
    course.updatedAt = new Date();

    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Admin only)
const deleteCourse = async (req, res) => {
  try {
    const course = db.findCourseById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user is the creator or admin
    if (course.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this course'
      });
    }

    // Delete course from in-memory database
    const deleted = db.deleteCourse(req.params.id);

    if (deleted) {
      res.json({
        success: true,
        message: 'Course deleted successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to delete course'
      });
    }
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Enroll in course
// @route   POST /api/courses/:id/enroll
// @access  Private
const enrollInCourse = async (req, res) => {
  try {
    const course = db.findCourseById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if already enrolled (using in-memory database)
    const existingProgress = db.getUserProgress(req.user.id, req.params.id);

    if (existingProgress) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    // Create progress record in in-memory database
    db.createUserProgress({
      userId: req.user.id,
      courseId: req.params.id,
      completedLessons: [],
      progress: 0,
      enrolledAt: new Date()
    });

    // Add user to course enrolled students
    if (!course.enrolledStudents) {
      course.enrolledStudents = [];
    }
    course.enrolledStudents.push(req.user.id);

    res.json({
      success: true,
      message: 'Successfully enrolled in course'
    });
  } catch (error) {
    console.error('Enroll course error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update course lessons
// @route   PUT /api/courses/:id/lessons
// @access  Private/Admin
const updateCourseLessons = async (req, res) => {
  try {
    const course = db.findCourseById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Update lessons
    course.lessons = req.body.lessons;
    course.updatedAt = new Date();

    res.json({
      success: true,
      message: 'Course lessons updated successfully',
      data: course
    });
  } catch (error) {
    console.error('Update course lessons error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get course lessons
// @route   GET /api/courses/:id/lessons
// @access  Public
const getCourseLessons = async (req, res) => {
  try {
    const course = db.findCourseById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.json({
      success: true,
      data: course.lessons || []
    });
  } catch (error) {
    console.error('Get course lessons error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  updateCourseLessons,
  getCourseLessons
};
