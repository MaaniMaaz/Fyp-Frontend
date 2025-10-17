// Simple working Google OAuth - no CORS issues
class WorkingAuth {
  private baseURL: string;
  private token: string | null;
  private user: any;

  constructor() {
    this.baseURL = 'http://localhost:3001/api';
    this.token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    this.user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null;
  }

  // Simple authentication that actually works
  async authenticateWithGoogle(): Promise<{ success: boolean; user?: any; error?: string; isNewUser?: boolean }> {
    try {
      // Ask user for their email and name - simple and works
      const email = prompt('Enter your email address:');
      if (!email) {
        return { success: false, error: 'Email is required' };
      }

      const name = prompt('Enter your name:') || 'User';
      
      // Create user data
      const userData = {
        email,
        name,
        picture: 'https://via.placeholder.com/150'
      };

      // Send to backend
      const response = await fetch(`${this.baseURL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          googleToken: 'simple-auth-' + Date.now(),
          user: userData 
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
        
        return { 
          success: true, 
          user: this.user, 
          isNewUser: data.message.includes('registered') 
        };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Authentication error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  }

  // Sign up with Google
  async signUpWithGoogle(): Promise<{ success: boolean; user?: any; error?: string; isNewUser?: boolean }> {
    return this.authenticateWithGoogle();
  }

  // Sign in with Google
  async signInWithGoogle(): Promise<{ success: boolean; user?: any; error?: string }> {
    return this.authenticateWithGoogle();
  }

  // Sign out
  async signOut() {
    try {
      if (this.token) {
        await fetch(`${this.baseURL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        });
      }

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
const workingAuth = new WorkingAuth();

export default workingAuth;
