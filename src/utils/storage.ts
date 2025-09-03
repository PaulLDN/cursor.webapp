import { User, UserProgress, Certificate } from '@/types';

const STORAGE_KEYS = {
  USER: 'corporate_training_user',
  PROGRESS: 'corporate_training_progress',
  CERTIFICATES: 'corporate_training_certificates',
} as const;

export const storage = {
  // User management
  getUser: (): User | null => {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  },

  setUser: (user: User | null): void => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  },

  // Progress management
  getProgress: (): UserProgress[] => {
    try {
      const progress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      return progress ? JSON.parse(progress) : [];
    } catch {
      return [];
    }
  },

  setProgress: (progress: UserProgress[]): void => {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  },

  getCourseProgress: (userId: string, courseId: string): UserProgress | null => {
    const allProgress = storage.getProgress();
    return allProgress.find(p => p.userId === userId && p.courseId === courseId) || null;
  },

  updateCourseProgress: (progress: UserProgress): void => {
    const allProgress = storage.getProgress();
    const existingIndex = allProgress.findIndex(
      p => p.userId === progress.userId && p.courseId === progress.courseId
    );
    
    if (existingIndex >= 0) {
      allProgress[existingIndex] = progress;
    } else {
      allProgress.push(progress);
    }
    
    storage.setProgress(allProgress);
  },

  // Certificate management
  getCertificates: (): Certificate[] => {
    try {
      const certificates = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      return certificates ? JSON.parse(certificates) : [];
    } catch {
      return [];
    }
  },

  setCertificates: (certificates: Certificate[]): void => {
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(certificates));
  },

  addCertificate: (certificate: Certificate): void => {
    const certificates = storage.getCertificates();
    certificates.push(certificate);
    storage.setCertificates(certificates);
  },

  getUserCertificates: (userId: string): Certificate[] => {
    const certificates = storage.getCertificates();
    return certificates.filter(c => c.userId === userId);
  },

  // Clear all data (for logout)
  clearAll: (): void => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  },
};
