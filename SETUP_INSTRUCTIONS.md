# TaskMind Authentication Setup Instructions

## Your Google OAuth Credentials
- **Client ID**: `73187296567-l327mh1ogrqvogj5tmcbte5p2ul5nnku.apps.googleusercontent.com`
- **Client Secret**: `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`

## Backend Setup (Fyp-Backend-main/)

### 1. Create .env file
Create a `.env` file in the `Fyp-Backend-main/` directory with the following content:

```bash
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/taskmind

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random-taskmind-2024

# Google OAuth Configuration
GOOGLE_CLIENT_ID=73187296567-l327mh1ogrqvogj5tmcbte5p2ul5nnku.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# Server Configuration
PORT=3001
NODE_ENV=development
```

### 2. Install Dependencies
```bash
cd Fyp-Backend-main
npm install
```

### 3. Start Backend Server
```bash
npm run dev
```

## Frontend Setup (Fyp-Frontend-main/)

### 1. Create .env.local file
Create a `.env.local` file in the `Fyp-Frontend-main/` directory with the following content:

```bash
# Google OAuth Configuration
NEXT_PUBLIC_GOOGLE_CLIENT_ID=73187296567-l327mh1ogrqvogj5tmcbte5p2ul5nnku.apps.googleusercontent.com

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 2. Install Dependencies
```bash
cd Fyp-Frontend-main
npm install
```

### 3. Start Frontend Server
```bash
npm run dev
```

## Testing the Authentication

1. **Start both servers**:
   - Backend: `http://localhost:3001`
   - Frontend: `http://localhost:3000`

2. **Test the flow**:
   - Navigate to `http://localhost:3000`
   - Click "Continue with Google"
   - Complete Google OAuth flow
   - Verify user authentication works

## Google Console Configuration

Make sure your Google OAuth application has these settings:

### Authorized JavaScript Origins:
- `http://localhost:3000`
- `http://localhost:3001`

### Authorized Redirect URIs:
- `http://localhost:3000`
- `http://localhost:3001`

## Features Available

✅ **Auto-detection**: Automatically detects if user is new or existing
✅ **Sign Up**: New users are registered in the database
✅ **Sign In**: Existing users are authenticated
✅ **User Validation**: Only registered users can sign in
✅ **Secure Tokens**: JWT tokens for authentication
✅ **Profile Management**: User profile updates
✅ **Logout**: Secure logout functionality

## Troubleshooting

If you encounter issues:

1. **Check environment variables**: Ensure both .env files are created correctly
2. **Verify Google Console**: Make sure authorized origins include localhost
3. **Check console logs**: Look for any JavaScript or network errors
4. **Database connection**: Ensure MongoDB is running
5. **Port conflicts**: Make sure ports 3000 and 3001 are available

The authentication system is now ready to use with your Google OAuth credentials!

