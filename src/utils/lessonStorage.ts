// Lesson persistence using localStorage
import { Lesson } from '@/types';

const LESSONS_STORAGE_KEY = 'corporate_training_lessons';

export const lessonStorage = {
  // Get all lessons for a course
  getLessons: (courseId: string): Lesson[] => {
    try {
      const stored = localStorage.getItem(LESSONS_STORAGE_KEY);
      if (!stored) return [];
      
      const allLessons = JSON.parse(stored);
      return allLessons[courseId] || [];
    } catch (error) {
      console.error('Error loading lessons:', error);
      return [];
    }
  },

  // Save lessons for a course
  saveLessons: (courseId: string, lessons: Lesson[]): void => {
    try {
      const stored = localStorage.getItem(LESSONS_STORAGE_KEY);
      const allLessons = stored ? JSON.parse(stored) : {};
      
      allLessons[courseId] = lessons;
      localStorage.setItem(LESSONS_STORAGE_KEY, JSON.stringify(allLessons));
    } catch (error) {
      console.error('Error saving lessons:', error);
    }
  },

  // Add a single lesson
  addLesson: (courseId: string, lesson: Lesson): void => {
    const lessons = lessonStorage.getLessons(courseId);
    lessons.push(lesson);
    lessonStorage.saveLessons(courseId, lessons);
  },

  // Update a lesson
  updateLesson: (courseId: string, lessonId: string, updatedLesson: Lesson): void => {
    const lessons = lessonStorage.getLessons(courseId);
    const index = lessons.findIndex(l => l.id === lessonId);
    if (index !== -1) {
      lessons[index] = updatedLesson;
      lessonStorage.saveLessons(courseId, lessons);
    }
  },

  // Delete a lesson
  deleteLesson: (courseId: string, lessonId: string): void => {
    const lessons = lessonStorage.getLessons(courseId);
    const filteredLessons = lessons.filter(l => l.id !== lessonId);
    lessonStorage.saveLessons(courseId, filteredLessons);
  },

  // Clear all lessons for a course
  clearLessons: (courseId: string): void => {
    lessonStorage.saveLessons(courseId, []);
  }
};
