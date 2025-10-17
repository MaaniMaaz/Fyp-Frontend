// Proper Google OAuth authentication service
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

  // Load Google OAuth script
  private loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.google) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google script'));
      document.head.appendChild(script);
    });
  }

  // Initialize Google OAuth
  private async initializeGoogle(): Promise<void> {
    await this.loadGoogleScript();
    
    window.google.accounts.id.initialize({
      client_id: this.googleClientId,
      callback: () => {} // We'll handle this in individual methods
    });
  }

  // Sign up with Google
  async signUpWithGoogle(): Promise<{ success: boolean; user?: any; error?: string; isNewUser?: boolean }> {
    try {
      await this.initializeGoogle();
      
      return new Promise((resolve) => {
        // Create a container for the Google button
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';
        container.style.zIndex = '10000';
        container.style.backgroundColor = 'white';
        container.style.padding = '30px';
        container.style.borderRadius = '12px';
        container.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
        container.style.textAlign = 'center';
        container.style.minWidth = '300px';

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

        // Title
        const title = document.createElement('h2');
        title.textContent = 'Sign up with Google';
        title.style.margin = '0 0 20px 0';
        title.style.color = '#333';
        container.appendChild(title);

        // Button container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.margin = '20px 0';
        container.appendChild(buttonContainer);

        // Close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '15px';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.fontSize = '20px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.color = '#666';
        container.appendChild(closeButton);

        // Render Google Sign-In button
        window.google.accounts.id.renderButton(buttonContainer, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'rectangular',
          text: 'signup_with',
          onSuccess: (response: any) => {
            document.body.removeChild(backdrop);
            document.body.removeChild(container);
            this.handleSignUp(response, resolve);
          },
          onError: (error: any) => {
            document.body.removeChild(backdrop);
            document.body.removeChild(container);
            resolve({ success: false, error: error.message || 'Sign up failed' });
          }
        });

        // Close handlers
        const closeModal = () => {
          document.body.removeChild(backdrop);
          document.body.removeChild(container);
          resolve({ success: false, error: 'Sign up cancelled' });
        };

        closeButton.onclick = closeModal;
        backdrop.onclick = closeModal;

        // Auto-close after 60 seconds
        setTimeout(() => {
          if (document.body.contains(container)) {
            closeModal();
          }
        }, 60000);
      });
    } catch (error) {
      console.error('Google sign-up error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  }

  // Sign in with Google
  async signInWithGoogle(): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      await this.initializeGoogle();
      
      return new Promise((resolve) => {
        // Create a container for the Google button
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';
        container.style.zIndex = '10000';
        container.style.backgroundColor = 'white';
        container.style.padding = '30px';
        container.style.borderRadius = '12px';
        container.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
        container.style.textAlign = 'center';
        container.style.minWidth = '300px';

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

        // Title
        const title = document.createElement('h2');
        title.textContent = 'Sign in with Google';
        title.style.margin = '0 0 20px 0';
        title.style.color = '#333';
        container.appendChild(title);

        // Button container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.margin = '20px 0';
        container.appendChild(buttonContainer);

        // Close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '15px';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.fontSize = '20px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.color = '#666';
        container.appendChild(closeButton);

        // Render Google Sign-In button
        window.google.accounts.id.renderButton(buttonContainer, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'rectangular',
          text: 'signin_with',
          onSuccess: (response: any) => {
            document.body.removeChild(backdrop);
            document.body.removeChild(container);
            this.handleSignIn(response, resolve);
          },
          onError: (error: any) => {
            document.body.removeChild(backdrop);
            document.body.removeChild(container);
            resolve({ success: false, error: error.message || 'Sign in failed' });
          }
        });

        // Close handlers
        const closeModal = () => {
          document.body.removeChild(backdrop);
          document.body.removeChild(container);
          resolve({ success: false, error: 'Sign in cancelled' });
        };

        closeButton.onclick = closeModal;
        backdrop.onclick = closeModal;

        // Auto-close after 60 seconds
        setTimeout(() => {
          if (document.body.contains(container)) {
            closeModal();
          }
        }, 60000);
      });
    } catch (error) {
      console.error('Google sign-in error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  }

  // Auto-detect signup or signin
  async authenticateWithGoogle(): Promise<{ success: boolean; user?: any; error?: string; isNewUser?: boolean }> {
    try {
      await this.initializeGoogle();
      
      return new Promise((resolve) => {
        // Create a container for the Google button
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';
        container.style.zIndex = '10000';
        container.style.backgroundColor = 'white';
        container.style.padding = '30px';
        container.style.borderRadius = '12px';
        container.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
        container.style.textAlign = 'center';
        container.style.minWidth = '300px';

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

        // Title
        const title = document.createElement('h2');
        title.textContent = 'Continue with Google';
        title.style.margin = '0 0 20px 0';
        title.style.color = '#333';
        container.appendChild(title);

        // Button container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.margin = '20px 0';
        container.appendChild(buttonContainer);

        // Close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.style.position = 'absolute';
        closeButton.style.top = '10px';
        closeButton.style.right = '15px';
        closeButton.style.background = 'none';
        closeButton.style.border = 'none';
        closeButton.style.fontSize = '20px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.color = '#666';
        container.appendChild(closeButton);

        // Render Google Sign-In button
        window.google.accounts.id.renderButton(buttonContainer, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'rectangular',
          text: 'continue_with',
          onSuccess: (response: any) => {
            document.body.removeChild(backdrop);
            document.body.removeChild(container);
            this.handleAutoAuth(response, resolve);
          },
          onError: (error: any) => {
            document.body.removeChild(backdrop);
            document.body.removeChild(container);
            resolve({ success: false, error: error.message || 'Authentication failed' });
          }
        });

        // Close handlers
        const closeModal = () => {
          document.body.removeChild(backdrop);
          document.body.removeChild(container);
          resolve({ success: false, error: 'Authentication cancelled' });
        };

        closeButton.onclick = closeModal;
        backdrop.onclick = closeModal;

        // Auto-close after 60 seconds
        setTimeout(() => {
          if (document.body.contains(container)) {
            closeModal();
          }
        }, 60000);
      });
    } catch (error) {
      console.error('Google authentication error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  }

  // Handle sign up
  private async handleSignUp(response: any, resolve: (result: any) => void) {
    try {
      const { credential } = response;

      const apiResponse = await fetch(`${this.baseURL}/auth/google-signup`, {
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
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', this.token || '');
          localStorage.setItem('user', JSON.stringify(this.user));
        }
        
        resolve({ success: true, user: this.user, isNewUser: true });
      } else {
        resolve({ success: false, error: data.message });
      }
    } catch (error) {
      console.error('Sign up error:', error);
      resolve({ success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' });
    }
  }

  // Handle sign in
  private async handleSignIn(response: any, resolve: (result: any) => void) {
    try {
      const { credential } = response;

      const apiResponse = await fetch(`${this.baseURL}/auth/google-signin`, {
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
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', this.token || '');
          localStorage.setItem('user', JSON.stringify(this.user));
        }
        
        resolve({ success: true, user: this.user });
      } else {
        resolve({ success: false, error: data.message });
      }
    } catch (error) {
      console.error('Sign in error:', error);
      resolve({ success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' });
    }
  }

  // Handle auto authentication
  private async handleAutoAuth(response: any, resolve: (result: any) => void) {
    try {
      const { credential } = response;

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
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', this.token || '');
          localStorage.setItem('user', JSON.stringify(this.user));
        }
        
        resolve({ success: true, user: this.user, isNewUser: data.message.includes('registered') });
      } else {
        resolve({ success: false, error: data.message });
      }
    } catch (error) {
      console.error('Auto auth error:', error);
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
