const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  total?: number;
  error?: string;
}

export interface Story {
  id: string;
  title: string;
  author: string;
  synopsis?: string;
  category: 'Financial' | 'Technology' | 'Health';
  keywords: string[];
  status: 'Publish' | 'Draft';
  chapters?: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  lastUpdated: Date;
}

export interface StoryFormData {
  title: string;
  author: string;
  synopsis: string;
  category: 'Financial' | 'Technology' | 'Health' | '';
  storyCover: File | null;
  keywords: string[];
  status: 'Publish' | 'Draft' | '';
  chapters: Chapter[];
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Stories
  async getStories(params?: {
    search?: string;
    category?: string;
    status?: string;
  }): Promise<ApiResponse<Story[]>> {
    const queryParams = new URLSearchParams();
    if (params?.search) queryParams.append('search', params.search);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.status) queryParams.append('status', params.status);

    const endpoint = `/stories${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.request<Story[]>(endpoint);
  }

  async getStory(id: string): Promise<ApiResponse<Story>> {
    return this.request<Story>(`/stories/${id}`);
  }

  async createStory(storyData: Omit<StoryFormData, 'storyCover'>): Promise<ApiResponse<Story>> {
    return this.request<Story>('/stories', {
      method: 'POST',
      body: JSON.stringify(storyData),
    });
  }

  async updateStory(id: string, storyData: Omit<StoryFormData, 'storyCover'>): Promise<ApiResponse<Story>> {
    return this.request<Story>(`/stories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(storyData),
    });
  }

  async deleteStory(id: string): Promise<ApiResponse<Story>> {
    return this.request<Story>(`/stories/${id}`, {
      method: 'DELETE',
    });
  }

  // Metadata
  async getCategories(): Promise<ApiResponse<string[]>> {
    return this.request<string[]>('/categories');
  }

  async getStatuses(): Promise<ApiResponse<string[]>> {
    return this.request<string[]>('/statuses');
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ message: string; timestamp: string }>> {
    return this.request<{ message: string; timestamp: string }>('/health');
  }
}

export const apiService = new ApiService();
export default apiService; 