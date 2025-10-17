// Real Google OAuth authentication service
class GoogleAuthService {
  private baseURL: string;
  private token: string | null;
  private user: any;
  private googleClientId: string;

  constructor() {
    this.baseURL = 'http://localhost:3001/api';
    this.token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    this.user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null;
    this.googleClientId = '73187296567-61gjtjifqhghbpq2kcq917tthgo16i1a.apps.googleusercontent.com';
  }

  // Initialize Google OAuth
  private async initializeGoogleAuth(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.google) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google) {
          window.google.accounts.id.initialize({
            client_id: this.googleClientId,
            callback: () => {}
          });
          resolve();
        } else {
          reject(new Error('Failed to load Google OAuth'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load Google OAuth script'));
      document.head.appendChild(script);
    });
  }

  // Real Google OAuth authentication
  async authenticateWithGoogle(): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      await this.initializeGoogleAuth();
      
      return new Promise((resolve) => {
        // Create a modal for the Google Sign-In button
        const modal = document.createElement('div');
        modal.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
        `;

        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          text-align: center;
          max-width: 400px;
          width: 90%;
        `;

        const title = document.createElement('h2');
        title.textContent = 'Sign in with Google';
        title.style.cssText = `
          margin: 0 0 20px 0;
          color: #333;
          font-size: 24px;
        `;

        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
          margin: 20px 0;
        `;

        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.style.cssText = `
          position: absolute;
          top: 10px;
          right: 15px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
        `;

        modalContent.appendChild(closeButton);
        modalContent.appendChild(title);
        modalContent.appendChild(buttonContainer);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Render Google Sign-In button
        window.google.accounts.id.renderButton(buttonContainer, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'rectangular',
          text: 'continue_with',
          onSuccess: (response: any) => {
            document.body.removeChild(modal);
            this.handleGoogleResponse(response, resolve);
          },
          onError: (error: any) => {
            document.body.removeChild(modal);
            resolve({ success: false, error: error.message || 'Google authentication failed' });
          }
        });

        // Close modal handlers
        const closeModal = () => {
          document.body.removeChild(modal);
          resolve({ success: false, error: 'Authentication cancelled' });
        };

        closeButton.onclick = closeModal;
        modal.onclick = (e) => {
          if (e.target === modal) closeModal();
        };

        // Auto-close after 60 seconds
        setTimeout(() => {
          if (document.body.contains(modal)) {
            closeModal();
          }
        }, 60000);
      });
    } catch (error) {
      console.error('Google authentication error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  }

  // Handle Google OAuth response
  private async handleGoogleResponse(response: any, resolve: (result: any) => void) {
    try {
      const { credential } = response;

      // Send credential to backend
      const apiResponse = await fetch(`${this.baseURL}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ googleToken: credential }),
      });

      const data = await apiResponse.json();

      if (data.success) {
        this.token = data.data.token;
        this.user = data.data.user;
        
        // Store in localStorage (only in browser)
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', this.token || '');
          localStorage.setItem('user', JSON.stringify(this.user));
        }
        
        resolve({ success: true, user: this.user, isNewUser: data.message.includes('registered') });
      } else {
        resolve({ success: false, error: data.message });
      }
    } catch (error) {
      console.error('Backend auth error:', error);
      resolve({ success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' });
    }
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
const googleAuthService = new GoogleAuthService();

export default googleAuthService;
