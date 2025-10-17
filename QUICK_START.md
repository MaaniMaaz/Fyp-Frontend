# Quick Start Guide for TaskMind Authentication

## 🚀 Get Everything Running in 5 Minutes

### Step 1: Start MongoDB (Choose One)

#### Option A: Quick Docker Setup
```bash
# Install Docker Desktop first, then run:
docker run -d -p 27017:27017 --name taskmind-mongo mongo:latest
```

#### Option B: MongoDB Atlas (Cloud - No Installation)
1. Go to https://cloud.mongodb.com
2. Create free account
3. Create cluster
4. Get connection string
5. Update `.env` file with Atlas connection string

#### Option C: Local Installation
- Windows: Download from https://www.mongodb.com/try/download/community
- macOS: `brew install mongodb-community`
- Linux: Follow official MongoDB installation guide

### Step 2: Backend Setup

1. **Create .env file** in `Fyp-Backend-main/`:
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

2. **Start Backend**:
```bash
cd Fyp-Backend-main
npm install
npm run dev
```

### Step 3: Frontend Setup

1. **Create .env.local file** in `Fyp-Frontend-main/`:
```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=73187296567-l327mh1ogrqvogj5tmcbte5p2ul5nnku.apps.googleusercontent.com
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

2. **Start Frontend**:
```bash
cd Fyp-Frontend-main
npm install
npm run dev
```

### Step 4: Test Authentication

1. Open browser to `http://localhost:3000`
2. Click "Continue with Google"
3. Complete Google OAuth flow
4. ✅ Success! You're authenticated

## 🔧 Current Status

✅ **Fixed Issues**:
- localStorage SSR error resolved
- Google OAuth credentials configured
- Backend handles MongoDB connection gracefully

✅ **Features Working**:
- Google OAuth authentication
- User registration and login
- JWT token management
- Auto-detection of new vs existing users

## 🎯 What Happens Now

1. **New Users**: Automatically registered and redirected to onboarding
2. **Existing Users**: Signed in and redirected to dashboard
3. **Data Persistence**: User data saved to MongoDB (if connected)
4. **Fallback Mode**: Works without MongoDB (data not persisted)

## 🚨 If You Still See Errors

### Frontend Issues:
- Clear browser cache and refresh
- Check browser console for JavaScript errors
- Ensure ports 3000 and 3001 are available

### Backend Issues:
- Check if MongoDB is running
- Verify .env file is created correctly
- Look at backend terminal for error messages

### Google OAuth Issues:
- Verify Google Console settings include localhost:3000
- Check that your Client ID is correct
- Ensure Google Identity Services API is enabled

## 📞 Need Help?

The system is now configured with your Google OAuth credentials and should work immediately. The main requirement is having MongoDB running for data persistence.

**Quick Test**: Even without MongoDB, you can test the OAuth flow - it will just use in-memory storage.
