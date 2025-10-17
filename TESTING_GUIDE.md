# TaskMind Authentication Testing Guide

## 🚀 Quick Test Setup

### Current Status
✅ **SSR localStorage error fixed**
✅ **Mock authentication implemented**
✅ **Backend handles both mock and real Google OAuth**
✅ **Database connection configured**

## 🧪 Testing Steps

### 1. Start Backend Server
```bash
cd Fyp-Backend-main
npm run dev
```

**Expected Output:**
```
✅ MongoDB Connected: aiphycologist.ojalat4.mongodb.net
🚀 TaskMind Backend running on port 3001
```

### 2. Start Frontend Server
```bash
cd Fyp-Frontend-main
npm run dev
```

**Expected Output:**
```
✓ Ready in 5.8s
- Local:        http://localhost:3000
```

### 3. Test Authentication

1. **Open Browser**: Go to `http://localhost:3000`
2. **Click "Continue with Google"**: This will use mock authentication
3. **Expected Result**: 
   - User gets authenticated immediately
   - Redirected to dashboard (or onboarding)
   - User data saved to MongoDB

## 🔧 What's Working Now

### Mock Authentication
- **No Google OAuth popup**: Uses mock data for testing
- **User Registration**: Creates new users in database
- **User Sign In**: Authenticates existing users
- **Auto-Detection**: Automatically determines signup vs signin
- **Data Persistence**: All user data saved to MongoDB Atlas

### Backend Features
- **JWT Tokens**: Secure authentication
- **Database Integration**: MongoDB Atlas connection
- **User Management**: Create, read, update users
- **Profile Updates**: User settings management

### Frontend Features
- **SSR Safe**: No localStorage errors
- **Authentication Context**: Global auth state
- **Multiple Auth Methods**: Sign up, sign in, auto-authenticate
- **Error Handling**: Proper error messages

## 📊 Test Scenarios

### Scenario 1: New User
1. Click "Continue with Google"
2. **Expected**: User registered, redirected to onboarding
3. **Database**: New user record created

### Scenario 2: Existing User
1. Click "Continue with Google" again
2. **Expected**: User signed in, redirected to dashboard
3. **Database**: User record updated

### Scenario 3: Profile Update
1. Sign in as user
2. Update profile settings
3. **Expected**: Changes saved to database

## 🔄 Switching to Real Google OAuth

When you're ready to use real Google OAuth:

1. **Update AuthContext**:
   ```typescript
   import authService from '../services/authService' // Change back to real service
   ```

2. **Update Google Console**:
   - Add `http://localhost:3000` to authorized origins
   - Add `http://localhost:3000` to authorized redirect URIs

3. **Test Real OAuth**:
   - Click "Continue with Google"
   - Complete Google OAuth flow
   - Verify authentication works

## 🐛 Troubleshooting

### If Backend Won't Start:
- Check MongoDB connection string in `.env`
- Verify all environment variables are set
- Check if port 3001 is available

### If Frontend Shows Errors:
- Clear browser cache
- Check browser console for errors
- Verify backend is running on port 3001

### If Authentication Fails:
- Check backend logs for error messages
- Verify database connection
- Test API endpoints directly

## ✅ Success Indicators

**Backend Running:**
```
✅ MongoDB Connected: aiphycologist.ojalat4.mongodb.net
🚀 TaskMind Backend running on port 3001
```

**Frontend Running:**
```
✓ Ready in 5.8s
- Local:        http://localhost:3000
```

**Authentication Working:**
- Click button → Immediate authentication
- User data appears in dashboard
- No console errors

The authentication system is now ready for testing with mock data, and can easily be switched to real Google OAuth when needed!
