# Google OAuth Setup Guide

## Prerequisites
1. Google Cloud Platform account
2. Access to Google Cloud Console

## Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "TaskMind"
4. Click "Create"

## Step 2: Enable Google+ API
1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google+ API" 
3. Click on it and press "Enable"

## Step 3: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized origins:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
5. Click "Create"

## Step 4: Update Environment Variables

### Backend (.env file)
```bash
GOOGLE_CLIENT_ID=your-actual-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-client-secret-here
```

### Frontend (authService.ts)
```typescript
this.googleClientId = 'your-actual-client-id-here';
```

## Step 5: Test the Integration
1. Start both frontend and backend servers
2. Click "Sign in with Google" button
3. Google OAuth popup should appear
4. Complete the sign-in process
5. User should be redirected to dashboard

## Troubleshooting
- **400/401 errors**: Check that Google Client ID is correct
- **Popup blocked**: Ensure popups are allowed for localhost
- **Redirect errors**: Verify authorized origins in Google Console

## Security Notes
- Never commit real credentials to version control
- Use environment variables for all sensitive data
- Regularly rotate OAuth credentials
- Monitor OAuth usage in Google Console
