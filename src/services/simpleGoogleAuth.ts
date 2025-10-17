// Simple Google OAuth that avoids COOP issues
class SimpleGoogleAuth {
  private baseURL: string;
  private token: string | null;
  private user: any;
  private googleClientId: string;

  constructor() {
    this.baseURL = 'http://localhost:3001/api';
    this.token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    this.user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null;
    this.googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '73187296567-61gjtjifqhghbpq2kcq917tthgo16i1a.apps.googleusercontent.com';
  }

  // Load Google OAuth script once
  private loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.google) {
        resolve();
        return;
      }

      // Check if script already exists
      const existingScript = document.querySelector('script[src*="accounts.google.com/gsi/client"]');
      if (existingScript) {
        // Wait for it to load
        const checkLoaded = setInterval(() => {
          if (window.google) {
            clearInterval(checkLoaded);
            resolve();
          }
        }, 100);
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
            callback: () => {} // We'll handle this in the button
          });
          resolve();
        } else {
          reject(new Error('Google OAuth failed to load'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load Google OAuth script'));
      document.head.appendChild(script);
    });
  }

  // Sign up with Google
  async signUpWithGoogle(): Promise<{ success: boolean; user?: any; error?: string; isNewUser?: boolean }> {
    try {
      await this.loadGoogleScript();
      
      return new Promise((resolve) => {
        // Create a simple modal
        const modal = this.createModal('Sign up with Google');
        
        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.margin = '20px 0';
        modal.content.appendChild(buttonContainer);

        // Render Google Sign-In button directly
        window.google.accounts.id.renderButton(buttonContainer, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'rectangular',
          text: 'signup_with',
          onSuccess: (response: any) => {
            this.closeModal(modal);
            this.handleSignUp(response, resolve);
          },
          onError: (error: any) => {
            this.closeModal(modal);
            resolve({ success: false, error: error.message || 'Sign up failed' });
          }
        });

        // Set up modal close handler
        modal.closeHandler = () => {
          this.closeModal(modal);
          resolve({ success: false, error: 'Sign up cancelled' });
        };
      });
    } catch (error) {
      console.error('Google sign-up error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  }

  // Sign in with Google
  async signInWithGoogle(): Promise<{ success: boolean; user?: any; error?: string }> {
    try {
      await this.loadGoogleScript();
      
      return new Promise((resolve) => {
        // Create a simple modal
        const modal = this.createModal('Sign in with Google');
        
        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.margin = '20px 0';
        modal.content.appendChild(buttonContainer);

        // Render Google Sign-In button directly
        window.google.accounts.id.renderButton(buttonContainer, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'rectangular',
          text: 'signin_with',
          onSuccess: (response: any) => {
            this.closeModal(modal);
            this.handleSignIn(response, resolve);
          },
          onError: (error: any) => {
            this.closeModal(modal);
            resolve({ success: false, error: error.message || 'Sign in failed' });
          }
        });

        // Set up modal close handler
        modal.closeHandler = () => {
          this.closeModal(modal);
          resolve({ success: false, error: 'Sign in cancelled' });
        };
      });
    } catch (error) {
      console.error('Google sign-in error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  }

  // Auto-detect signup or signin
  async authenticateWithGoogle(): Promise<{ success: boolean; user?: any; error?: string; isNewUser?: boolean }> {
    try {
      await this.loadGoogleScript();
      
      return new Promise((resolve) => {
        // Create a simple modal
        const modal = this.createModal('Continue with Google');
        
        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.style.margin = '20px 0';
        modal.content.appendChild(buttonContainer);

        // Render Google Sign-In button directly
        window.google.accounts.id.renderButton(buttonContainer, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'rectangular',
          text: 'continue_with',
          onSuccess: (response: any) => {
            this.closeModal(modal);
            this.handleAutoAuth(response, resolve);
          },
          onError: (error: any) => {
            this.closeModal(modal);
            resolve({ success: false, error: error.message || 'Authentication failed' });
          }
        });

        // Set up modal close handler
        modal.closeHandler = () => {
          this.closeModal(modal);
          resolve({ success: false, error: 'Authentication cancelled' });
        };
      });
    } catch (error) {
      console.error('Google authentication error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
    }
  }

  // Create modal
  private createModal(title: string) {
    const backdrop = document.createElement('div');
    backdrop.style.cssText = `
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

    const content = document.createElement('div');
    content.style.cssText = `
      background: white;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      text-align: center;
      min-width: 300px;
      position: relative;
    `;

    const titleEl = document.createElement('h2');
    titleEl.textContent = title;
    titleEl.style.cssText = `
      margin: 0 0 20px 0;
      color: #333;
      font-size: 24px;
    `;
    content.appendChild(titleEl);

    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
      position: absolute;
      top: 10px;
      right: 15px;
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #666;
    `;

    backdrop.appendChild(content);
    document.body.appendChild(backdrop);

    return {
      backdrop,
      content,
      closeButton,
      closeHandler: null as (() => void) | null
    };
  }

  // Close modal
  private closeModal(modal: any) {
    if (modal.closeButton.onclick) {
      modal.closeButton.onclick = null;
    }
    if (modal.backdrop.onclick) {
      modal.backdrop.onclick = null;
    }
    if (document.body.contains(modal.backdrop)) {
      document.body.removeChild(modal.backdrop);
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
const simpleGoogleAuth = new SimpleGoogleAuth();

export default simpleGoogleAuth;