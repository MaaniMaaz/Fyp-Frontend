// API service for handling backend communication
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  private getAuthHeaders() {
    return {
      'Content-Type': 'application/json'
    };
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return this.handleResponse(response);
  }

  async register(userData: any) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return this.handleResponse(response);
  }

  async googleAuth(googleToken: string) {
    const response = await fetch(`${API_BASE_URL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: googleToken })
    });
    return this.handleResponse(response);
  }

  // Analytics
  async getDashboardAnalytics() {
    const response = await fetch(`${API_BASE_URL}/analytics/dashboard`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getDailyAnalytics(date?: string) {
    const url = date 
      ? `${API_BASE_URL}/analytics/daily?date=${date}`
      : `${API_BASE_URL}/analytics/daily`;
    
    const response = await fetch(url, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getWeeklyAnalytics(startDate?: string) {
    const url = startDate 
      ? `${API_BASE_URL}/analytics/weekly?startDate=${startDate}`
      : `${API_BASE_URL}/analytics/weekly`;
    
    const response = await fetch(url, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getProductivityAnalytics(days: number = 7) {
    const response = await fetch(`${API_BASE_URL}/analytics/productivity?days=${days}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getTopChannels(days: number = 30) {
    const response = await fetch(`${API_BASE_URL}/analytics/top-channels?days=${days}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getFlaggedContent(days: number = 7) {
    const response = await fetch(`${API_BASE_URL}/analytics/flagged-content?days=${days}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  // Videos
  async getRecentVideos(limit: number = 10) {
    const response = await fetch(`${API_BASE_URL}/videos-public/recent?limit=${limit}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getWatchHistory(page: number = 1, limit: number = 20, category?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(category && { category })
    });
    
    const response = await fetch(`${API_BASE_URL}/videos/watch-history?${params}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getFlaggedVideos(page: number = 1, limit: number = 20, severity?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(severity && { severity })
    });
    
    const response = await fetch(`${API_BASE_URL}/videos-public/flagged?${params}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async flagVideo(videoId: string, reason: string, severity: 'low' | 'medium' | 'high' = 'medium') {
    const response = await fetch(`${API_BASE_URL}/videos/flag`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ videoId, reason, severity })
    });
    return this.handleResponse(response);
  }

  async unflagVideo(videoId: string) {
    const response = await fetch(`${API_BASE_URL}/videos-public/unflag`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ videoId })
    });
    return this.handleResponse(response);
  }

  async classifyVideo(videoUrl: string) {
    const response = await fetch(`${API_BASE_URL}/videos/classify`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ videoUrl })
    });
    return this.handleResponse(response);
  }

  async logWatchHistory(videoId: string, watchDuration: number, videoDuration: number, source: string = 'web_app') {
    const response = await fetch(`${API_BASE_URL}/videos/watch-history`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ videoId, watchDuration, videoDuration, source })
    });
    return this.handleResponse(response);
  }

  // Mock data fallback (for development)
  async getMockData() {
    const response = await fetch(`${API_BASE_URL}/mock-data`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getMockStats() {
    const response = await fetch(`${API_BASE_URL}/mock-data/stats`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getMockAnalytics() {
    const response = await fetch(`${API_BASE_URL}/mock-data/analytics`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }
}

export const apiService = new ApiService();
export default apiService;
