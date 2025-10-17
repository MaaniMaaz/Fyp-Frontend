// Simple authentication service for testing
class SimpleAuthService {
  private baseURL: string;
  private token: string | null;
  private user: any;

  constructor() {
    this.baseURL = 'http://localhost:3001/api';
    // Check if we're in the browser before accessing localStorage
    this.token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    this.user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null;
  }

  // Mock Google authentication
  async authenticateWithGoogle(): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      // Simulate Google OAuth with mock data
      const mockUser = {
        id: 'google-user-' + Date.now(),
        email: 'test@example.com',
        name: 'Test User',
        picture: 'https://via.placeholder.com/150'
      };

      // Send to backend
      const response = await fetch(`${this.baseURL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          googleToken: 'mock-google-token-' + Date.now(),
          user: mockUser 
        }),
      });

      const data = await response.json();

      if (data.success) {
        this.token = data.data.token;
        this.user = data.data.user;
        
        // Store in localStorage (only in browser)
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', this.token || '');
          localStorage.setItem('user', JSON.stringify(this.user));
        }
        
        return { success: true, user: this.user, isNewUser: data.message.includes('registered') };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Authentication error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  }

  // Sign out
  async signOut() {
    try {
      // Call backend logout endpoint
      if (this.token) {
        await fetch(`${this.baseURL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        });
      }

      // Clear local storage (only in browser)
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }

      this.token = null;
      this.user = null;

      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token && !!this.user;
  }

  // Get current user
  getCurrentUser() {
    return this.user;
  }

  // Get auth token
  getToken() {
    return this.token;
  }

  // Update profile
  async updateProfile(profileData: any) {
    try {
      const response = await fetch(`${this.baseURL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (data.success) {
        this.user = data.data.user;
        
        // Store in localStorage (only in browser)
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(this.user));
        }
        
        return { success: true, user: this.user };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  }
}

// Create singleton instance
const simpleAuthService = new SimpleAuthService();

export default simpleAuthService;
