// Form-based authentication service
class FormAuthService {
  private baseURL: string;
  private token: string | null;
  private user: any;

  constructor() {
    this.baseURL = 'http://localhost:3001/api';
    this.token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    this.user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null;
  }

  // Sign up with form data
  async signUp(formData: { name: string; email: string; password: string }): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      const googleToken = `test-google-token-${Date.now()}`;
      const userData = { 
        email: formData.email, 
        name: formData.name, 
        picture: 'https://via.placeholder.com/150' 
      };

      console.log('Form signup data:', { googleToken, userData });

      // Send to backend
      const response = await fetch(`${this.baseURL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ googleToken, user: userData }),
      });

      const data = await response.json();
      console.log('Backend response:', data);

      if (data.success) {
        this.token = data.data.token;
        this.user = data.data.user;
        
        // Store in localStorage (only in browser)
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', this.token || '');
          localStorage.setItem('user', JSON.stringify(this.user));
        }
        
        return { 
          success: true, 
          user: this.user, 
          isNewUser: data.message.includes('registered') 
        };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Form signup error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  }

  // Sign in with form data
  async signIn(formData: { email: string; password: string }): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      const googleToken = `test-google-token-${Date.now()}`;
      const userData = { 
        email: formData.email, 
        name: 'User', // We'll get the real name from the database
        picture: 'https://via.placeholder.com/150' 
      };

      console.log('Form signin data:', { googleToken, userData });

      // Send to backend
      const response = await fetch(`${this.baseURL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ googleToken, user: userData }),
      });

      const data = await response.json();
      console.log('Backend response:', data);

      if (data.success) {
        this.token = data.data.token;
        this.user = data.data.user;
        
        // Store in localStorage (only in browser)
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', this.token || '');
          localStorage.setItem('user', JSON.stringify(this.user));
        }
        
        return { 
          success: true, 
          user: this.user, 
          isNewUser: data.message.includes('registered') 
        };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Form signin error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  }

  // Google OAuth authentication (fallback)
  async authenticateWithGoogle(): Promise<{ success: boolean; user?: any; error?: string; isNewUser?: boolean }> {
    try {
      // For testing - use simple prompts
      const email = prompt('Enter your email:') || '';
      const name = prompt('Enter your name:') || 'Test User';
      const picture = 'https://via.placeholder.com/150';

      if (!email) {
        return { success: false, error: 'Email is required' };
      }

      const googleToken = `test-google-token-${Date.now()}`;
      const userData = { email, name, picture };

      console.log('Google auth data:', { googleToken, userData });

      // Send to backend
      const response = await fetch(`${this.baseURL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ googleToken, user: userData }),
      });

      const data = await response.json();
      console.log('Backend response:', data);

      if (data.success) {
        this.token = data.data.token;
        this.user = data.data.user;
        
        // Store in localStorage (only in browser)
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', this.token || '');
          localStorage.setItem('user', JSON.stringify(this.user));
        }
        
        return { 
          success: true, 
          user: this.user, 
          isNewUser: data.message.includes('registered') 
        };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Google auth error:', error);
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
const formAuthService = new FormAuthService();

export default formAuthService;
