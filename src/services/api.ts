const API_BASE_URL = (import.meta as { env: { VITE_API_URL?: string } }).env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    timeoutMs: number = 10000 // Default 10 seconds timeout
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (this.token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${this.token}`,
      };
    }

    try {
      // Add timeout to prevent slow requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async register(userData: {
    name: string;
    email: string;
    password: string;
    role?: 'student' | 'admin';
  }) {
    const response = await this.request<{
      success: boolean;
      data: {
        id: string;
        name: string;
        email: string;
        role: string;
        token: string;
      };
    }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    if (response.success) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async login(credentials: { email: string; password: string }) {
    const response = await this.request<{
      success: boolean;
      data: {
        id: string;
        name: string;
        email: string;
        role: string;
        token: string;
      };
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.success) {
      this.setToken(response.data.token);
    }

    return response;
  }

  async getMe() {
    return this.request<{
      success: boolean;
      data: {
        _id: string;
        name: string;
        email: string;
        role: string;
        createdAt: string;
      };
    }>('/auth/me');
  }

  // Course endpoints
  async getCourses(params?: {
    level?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params?.level) queryParams.append('level', params.level);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    const queryString = queryParams.toString();
    const endpoint = queryString ? `/courses?${queryString}` : '/courses';

    return this.request<{
      success: boolean;
      count: number;
      total: number;
      data: any[];
    }>(endpoint);
  }

  async getCourse(courseId: string) {
    return this.request<{
      success: boolean;
      data: any;
    }>(`/courses/${courseId}`);
  }

  async enrollInCourse(courseId: string) {
    return this.request<{
      success: boolean;
      message: string;
    }>(`/courses/${courseId}/enroll`, {
      method: 'POST',
    });
  }

  async createCourse(courseData: any) {
    return this.request<{
      success: boolean;
      data: any;
    }>('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  }

  async updateCourse(courseId: string, courseData: any) {
    return this.request<{
      success: boolean;
      data: any;
    }>(`/courses/${courseId}`, {
      method: 'PUT',
      body: JSON.stringify(courseData),
    });
  }

  async deleteCourse(courseId: string) {
    return this.request<{
      success: boolean;
      message: string;
    }>(`/courses/${courseId}`, {
      method: 'DELETE',
    });
  }

  async updateCourseLessons(courseId: string, lessons: any[]) {
    return this.request<{
      success: boolean;
      data: any;
    }>(`/courses/${courseId}/lessons`, {
      method: 'PUT',
      body: JSON.stringify({ lessons }),
    });
  }

  async getCourseLessons(courseId: string) {
    return this.request<{
      success: boolean;
      data: any[];
    }>(`/courses/${courseId}/lessons`);
  }

  // Progress endpoints
  async getUserProgress() {
    return this.request<{
      success: boolean;
      data: any[];
    }>('/progress');
  }

  async getCourseProgress(courseId: string) {
    return this.request<{
      success: boolean;
      data: any;
    }>(`/progress/${courseId}`);
  }

  async updateLessonProgress(courseId: string, progressData: {
    slideIndex: number;
    completedSlides: string[];
    timeSpent?: number;
  }) {
    return this.request<{
      success: boolean;
      data: any;
    }>(`/progress/${courseId}/lesson`, {
      method: 'PUT',
      body: JSON.stringify(progressData),
    });
  }

  async submitQuiz(courseId: string, answers: number[]) {
    return this.request<{
      success: boolean;
      data: {
        score: number;
        passed: boolean;
        correctAnswers: number;
        totalQuestions: number;
        certificate: {
          id: string;
          uniqueId: string;
        } | null;
      };
    }>(`/progress/${courseId}/quiz`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  }

  async getUserCertificates() {
    return this.request<{
      success: boolean;
      data: any[];
    }>('/progress/certificates');
  }

  // Chatbot API methods
  async chatWithAI(message: string, courseId?: string, context?: any) {
    return this.request<{
      success: boolean;
      data: {
        message: string;
        timestamp: string;
        courseId: string | null;
      };
    }>('/chatbot/chat', {
      method: 'POST',
      body: JSON.stringify({
        message,
        courseId,
        context
      }),
    }, 30000); // 30 second timeout for AI requests
  }
}

export const apiService = new ApiService(API_BASE_URL);
