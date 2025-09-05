const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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
    options: RequestInit = {}
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
      const response = await fetch(url, config);
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
}

export const apiService = new ApiService(API_BASE_URL);
