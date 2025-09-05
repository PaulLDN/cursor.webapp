const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Slide title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Slide content is required']
  },
  mediaUrl: {
    type: String,
    default: ''
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    default: 'image'
  },
  order: {
    type: Number,
    required: true
  }
});

const quizQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required'],
    trim: true
  },
  options: [{
    type: String,
    required: true,
    trim: true
  }],
  correctIndex: {
    type: Number,
    required: [true, 'Correct answer index is required'],
    min: 0
  },
  explanation: {
    type: String,
    required: [true, 'Explanation is required'],
    trim: true
  },
  order: {
    type: Number,
    required: true
  }
});

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'FAQ question is required'],
    trim: true
  },
  answer: {
    type: String,
    required: [true, 'FAQ answer is required'],
    trim: true
  },
  relatedSlideIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slide'
  }]
});

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Lesson title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Lesson description is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['slide', 'video', 'quiz', 'text'],
    required: [true, 'Lesson type is required']
  },
  content: {
    type: String,
    required: [true, 'Lesson content is required']
  },
  videoUrl: {
    type: String,
    default: ''
  },
  imageUrl: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    required: [true, 'Lesson duration is required'],
    min: [1, 'Duration must be at least 1 minute']
  },
  order: {
    type: Number,
    required: [true, 'Lesson order is required']
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  slides: [slideSchema]
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    trim: true
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [200, 'Short description cannot be more than 200 characters']
  },
  duration: {
    type: Number,
    required: [true, 'Course duration is required'],
    min: [1, 'Duration must be at least 1 minute']
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: [true, 'Course level is required']
  },
  tags: [{
    type: String,
    trim: true
  }],
  heroImage: {
    type: String,
    default: ''
  },
  syllabus: [slideSchema],
  lessons: [lessonSchema],
  quizQuestions: [quizQuestionSchema],
  faq: [faqSchema],
  isPublished: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Index for search functionality
courseSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Course', courseSchema);
