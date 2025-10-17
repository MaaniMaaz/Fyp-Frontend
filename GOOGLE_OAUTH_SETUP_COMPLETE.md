# Complete Google OAuth Setup Guide for TaskMind

## Overview
This guide will help you set up Google OAuth authentication for TaskMind, enabling users to sign up and sign in with their Google accounts. The system will automatically detect whether a user is new (signup) or existing (signin) based on their email.

## Prerequisites
1. Google Cloud Platform account
2. Access to Google Cloud Console
3. Node.js and npm installed
4. MongoDB database (local or cloud)

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: "TaskMind"
4. Click "Create"

## Step 2: Enable Google Identity Services

1. In the Google Cloud Console, go to "APIs & Services" → "Library"
2. Search for "Google Identity Services API" 
3. Click on it and press "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client IDs"
3. Choose "Web application"
4. Add authorized origins:
   - `http://localhost:3000` (for frontend development)
   - `http://localhost:3001` (for backend development)
   - `https://yourdomain.com` (for production)
5. Add authorized redirect URIs:
   - `http://localhost:3000`
   - `https://yourdomain.com`
6. Click "Create"
7. Copy the Client ID and Client Secret

## Step 4: Backend Configuration

### Create .env file in Fyp-Backend-main/
```bash
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/taskmind

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-actual-client-id-here
GOOGLE_CLIENT_SECRET=your-actual-client-secret-here

# Server Configuration
PORT=3001
NODE_ENV=development
```

### Install Dependencies
```bash
cd Fyp-Backend-main
npm install
```

### Start Backend Server
```bash
npm run dev
```

## Step 5: Frontend Configuration

### Create .env.local file in Fyp-Frontend-main/
```bash
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-actual-client-id-here

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Install Dependencies
```bash
cd Fyp-Frontend-main
npm install
```

### Start Frontend Server
```bash
npm run dev
```

## Step 6: How the Authentication Works

### User Flow:
1. **New User**: 
   - Clicks "Continue with Google" or "Sign up with Google"
   - Google OAuth popup appears
   - User authorizes TaskMind
   - Backend creates new user account
   - User is redirected to onboarding

2. **Existing User**:
   - Clicks "Sign in with Google"
   - Google OAuth popup appears
   - User authorizes TaskMind
   - Backend verifies existing user
   - User is redirected to dashboard

3. **Auto-Detection**:
   - User clicks "Continue with Google"
   - System automatically detects if user exists
   - If new: creates account and goes to onboarding
   - If existing: signs in and goes to dashboard

### Backend Endpoints:
- `POST /api/auth/google` - Auto-detect signup/signin
- `POST /api/auth/google-signup` - Explicit signup
- `POST /api/auth/google-signin` - Explicit signin
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - Logout

### Frontend Components:
- `AuthPage` - Main authentication page with options
- `LoginPage` - Dedicated login page
- `SignUpPage` - Dedicated signup page
- `GoogleSignInButton` - Reusable Google auth button
- `AuthContext` - Authentication state management

## Step 7: Testing the Setup

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Click "Continue with Google"
4. Complete Google OAuth flow
5. Verify user is created in database
6. Test sign out functionality

## Step 8: Production Deployment

### Environment Variables for Production:
```bash
# Backend (.env)
GOOGLE_CLIENT_ID=your-production-client-id
GOOGLE_CLIENT_SECRET=your-production-client-secret
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production

# Frontend (.env.local)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-production-client-id
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

### Google Console Configuration:
1. Add production domains to authorized origins
2. Add production domains to authorized redirect URIs
3. Update OAuth consent screen if needed

## Security Features

1. **JWT Tokens**: Secure authentication tokens
2. **Email Validation**: Users must use valid Google accounts
3. **Database Verification**: Only registered users can sign in
4. **Token Verification**: Backend verifies Google tokens
5. **Secure Storage**: Tokens stored in localStorage (consider httpOnly cookies for production)

## Troubleshooting

### Common Issues:

1. **"Invalid client ID"**:
   - Check that GOOGLE_CLIENT_ID matches in both frontend and backend
   - Verify the client ID is correct in Google Console

2. **"Popup blocked"**:
   - Allow popups for localhost in browser settings
   - Try using redirect flow instead of popup

3. **"User not found"**:
   - Check database connection
   - Verify user was created during signup

4. **CORS errors**:
   - Ensure backend allows requests from frontend domain
   - Check that API_URL is correct

5. **Token verification failed**:
   - Verify JWT_SECRET is the same across restarts
   - Check that tokens are being stored correctly

### Debug Steps:
1. Check browser console for JavaScript errors
2. Check backend logs for authentication errors
3. Verify environment variables are loaded
4. Test API endpoints directly with Postman
5. Check Google Console for OAuth errors

## Additional Features

The authentication system supports:
- User profile management
- Settings updates
- Family account linking
- Role-based access control
- Session management
- Secure logout

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check that both servers are running
5. Review Google Console for any configuration issues

The system is now ready for users to authenticate with their Google accounts!

