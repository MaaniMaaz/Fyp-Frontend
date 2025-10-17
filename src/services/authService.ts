// Google OAuth authentication service
class AuthService {
  private baseURL: string;
  private token: string | null;
  private user: any;
  private googleClientId: string;
  private isGoogleLoaded: boolean = false;

  constructor() {
    this.baseURL = 'http://localhost:3001/api';
    // Check if we're in the browser before accessing localStorage
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
            callback: () => {} // We'll handle this in individual methods
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

  // Sign up with Google OAuth
  async signUpWithGoogle(): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      await this.initializeGoogleAuth();
      
      return new Promise((resolve) => {
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Try popup instead
            window.google.accounts.id.renderButton(
              document.createElement('div'),
              {
                theme: 'outline',
                size: 'large',
                type: 'standard',
                shape: 'rectangular',
                text: 'signup_with',
                onSuccess: this.handleGoogleResponse.bind(this, 'signup', resolve),
                onError: (error: any) => resolve({ success: false, error: error.message })
              }
            );
            return;
          }
        });

        // Set up the callback for the prompt
        window.google.accounts.id.callback = (response: any) => {
          this.handleGoogleResponse('signup', resolve, response);
        };
      });
    } catch (error) {
      console.error('Google sign-up error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  }

  // Sign in with Google OAuth
  async signInWithGoogle(): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      await this.initializeGoogleAuth();
      
      return new Promise((resolve) => {
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Try popup instead
            window.google.accounts.id.renderButton(
              document.createElement('div'),
              {
                theme: 'outline',
                size: 'large',
                type: 'standard',
                shape: 'rectangular',
                text: 'signin_with',
                onSuccess: this.handleGoogleResponse.bind(this, 'signin', resolve),
                onError: (error: any) => resolve({ success: false, error: error.message })
              }
            );
            return;
          }
        });

        // Set up the callback for the prompt
        window.google.accounts.id.callback = (response: any) => {
          this.handleGoogleResponse('signin', resolve, response);
        };
      });
    } catch (error) {
      console.error('Google sign-in error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  }

  // Handle Google OAuth response
  private async handleGoogleResponse(
    action: 'signup' | 'signin', 
    resolve: (result: any) => void, 
    response: any
  ) {
    try {
      const { credential } = response;

      // Send to backend
      const endpoint = action === 'signup' ? '/auth/google-signup' : '/auth/google-signin';
      const apiResponse = await fetch(`${this.baseURL}${endpoint}`, {
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
        
        resolve({ success: true, user: this.user });
      } else {
        resolve({ success: false, error: data.message });
      }
    } catch (error) {
      console.error('Backend auth error:', error);
      resolve({ success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' });
    }
  }

  // Auto-detect signup or signin
  async authenticateWithGoogle(): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      await this.initializeGoogleAuth();
      
      return new Promise((resolve) => {
        // Create a temporary container for the Google button
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';
        container.style.zIndex = '10000';
        container.style.backgroundColor = 'white';
        container.style.padding = '20px';
        container.style.borderRadius = '8px';
        container.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        container.style.border = '1px solid #dadce0';
        
        // Add backdrop
        const backdrop = document.createElement('div');
        backdrop.style.position = 'fixed';
        backdrop.style.top = '0';
        backdrop.style.left = '0';
        backdrop.style.width = '100%';
        backdrop.style.height = '100%';
        backdrop.style.backgroundColor = 'rgba(0,0,0,0.5)';
        backdrop.style.zIndex = '9999';
        
        document.body.appendChild(backdrop);
        document.body.appendChild(container);

        // Render the Google Sign-In button
        window.google.accounts.id.renderButton(container, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'rectangular',
          text: 'continue_with',
          onSuccess: (response: any) => {
            document.body.removeChild(backdrop);
            document.body.removeChild(container);
            this.handleAutoAuth(resolve, response);
          },
          onError: (error: any) => {
            document.body.removeChild(backdrop);
            document.body.removeChild(container);
            resolve({ success: false, error: error.message || 'Authentication failed' });
          }
        });

        // Add close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '✕';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '5px';
        closeButton.style.right = '10px';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.fontSize = '18px';
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = () => {
          document.body.removeChild(backdrop);
          document.body.removeChild(container);
          resolve({ success: false, error: 'Authentication cancelled' });
        };
        container.appendChild(closeButton);

        // Auto-close after 30 seconds
        setTimeout(() => {
          if (document.body.contains(container)) {
            document.body.removeChild(backdrop);
            document.body.removeChild(container);
            resolve({ success: false, error: 'Authentication timeout' });
          }
        }, 30000);
      });
    } catch (error) {
      console.error('Google authentication error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  }

  // Handle auto authentication
  private async handleAutoAuth(resolve: (result: any) => void, response: any) {
    try {
      const { credential } = response;

      // Send to backend for auto-detection
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
}

// Create singleton instance
const authService = new AuthService();

export default authService;