"use client"

import { useEffect } from 'react'

export default function AuthCallback() {
  useEffect(() => {
    // Get the authorization code from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');

    if (error) {
      // Handle error
      window.opener?.postMessage({
        type: 'GOOGLE_AUTH_ERROR',
        error: error
      }, window.location.origin);
      window.close();
    } else if (code && state === 'auth') {
      // Exchange code for token (simplified approach)
      // In a real implementation, you'd exchange this code for an ID token
      // For now, we'll send a mock token to demonstrate the flow
      
      window.opener?.postMessage({
        type: 'GOOGLE_AUTH_SUCCESS',
        credential: 'mock-google-token-from-code-' + code
      }, window.location.origin);
      window.close();
    } else {
      // No code received
      window.opener?.postMessage({
        type: 'GOOGLE_AUTH_ERROR',
        error: 'No authorization code received'
      }, window.location.origin);
      window.close();
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Completing authentication...</h2>
        <p className="text-gray-600">Please wait while we complete your Google sign-in.</p>
      </div>
    </div>
  );
}
