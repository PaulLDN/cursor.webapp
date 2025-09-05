export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'admin';
  avatar?: string;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  duration: number; // in minutes
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  heroImage: string;
  syllabus: Slide[];
  quizQuestions: QuizQuestion[];
  faq: FAQ[];
  createdAt: string;
  updatedAt: string;
}

export interface Slide {
  id: string;
  title: string;
  content: string; // markdown/HTML content
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  order: number;
  duration: number; // in minutes
  isPublished: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  type: 'slide' | 'video' | 'quiz' | 'text';
  content: string;
  videoUrl?: string;
  imageUrl?: string;
  duration: number; // in minutes
  order: number;
  isPublished: boolean;
  slides?: Slide[]; // for slide-based lessons
  courseId: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  order: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  relatedSlideIds: string[];
}

export interface UserProgress {
  userId: string;
  courseId: string;
  lastSlideIndex: number;
  completedSlides: string[];
  quizScore?: number;
  passed?: boolean;
  certificateId?: string;
  lastAccessed: string;
  enrolledAt: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  courseTitle: string;
  userName: string;
  issuedAt: string;
  score: number;
  uniqueId: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface CourseFilters {
  level?: string;
  tags?: string[];
  search?: string;
}
