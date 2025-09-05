const express = require('express');
const { body, validationResult } = require('express-validator');
const { protect } = require('../middleware/auth');
const { chatWithAI } = require('../controllers/chatbotController');

const router = express.Router();

// @route   POST /api/chatbot/chat
// @desc    Chat with AI assistant
// @access  Private
router.post('/chat', protect, [
  body('message')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Message is required'),
  body('courseId')
    .optional()
    .isMongoId()
    .withMessage('Invalid course ID'),
  body('context')
    .optional()
    .isObject()
    .withMessage('Context must be an object')
], chatWithAI);

module.exports = router;
