# 🚀 Fresh Google OAuth 2.0 Setup Guide

## 🔧 **Create New OAuth 2.0 Client ID**

Let's create a completely fresh OAuth client to eliminate any configuration issues.

### **Step 1: Go to Google Cloud Console**

1. **Visit**: [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. **Sign in** with your Google account
3. **Select your project**: `Ai-Phycologist` (or create a new one if needed)

### **Step 2: Enable Google+ API**

1. **Go to**: APIs & Services → Library
2. **Search for**: "Google+ API"
3. **Click**: "Google+ API"
4. **Click**: "Enable" (if not already enabled)

### **Step 3: Create New OAuth 2.0 Client ID**

1. **Go to**: APIs & Services → Credentials
2. **Click**: "Create Credentials" → "OAuth 2.0 Client ID"
3. **Application type**: Select "Web application"
4. **Name**: Enter "TaskMind-Fresh" (or any name you prefer)

### **Step 4: Configure Authorized Origins**

**Authorized JavaScript origins** (add these exactly):
```
http://localhost:3000
http://localhost:3001
http://127.0.0.1:3000
http://127.0.0.1:3001
```

### **Step 5: Configure Authorized Redirect URIs**

**Authorized redirect URIs** (add these exactly):
```
http://localhost:3000
http://localhost:3001
http://127.0.0.1:3000
http://127.0.0.1:3001
```

### **Step 6: Save and Get Credentials**

1. **Click**: "Create"
2. **Copy the Client ID** (you'll need this)
3. **Copy the Client Secret** (you'll need this)

### **Step 7: Update Your Environment Variables**

Update your backend `.env` file with the new credentials:

```bash
# Database
MONGODB_URI=mongodb+srv://Maani:T38OADJnAE6X87B3@aiphycologist.ojalat4.mongodb.net/taskmind?retryWrites=true&w=majority&appName=Ai-Phycologist

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# NEW Google OAuth Credentials
GOOGLE_CLIENT_ID=YOUR_NEW_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_NEW_CLIENT_SECRET_HERE

# YouTube API
YOUTUBE_API_KEY=AIzaSyBfd3yuvHJZE0Xapo9omShEJWuiBkP0pQs

# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### **Step 8: Update Frontend Environment**

Update your frontend `.env.local` file:

```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_NEW_CLIENT_ID_HERE
```

### **Step 9: Update the Auth Service**

I'll update the auth service to use the new client ID from environment variables.

### **Step 10: Test the New Setup**

1. **Restart Backend**:
   ```bash
   cd Fyp-Backend-main
   npm run dev
   ```

2. **Restart Frontend**:
   ```bash
   cd Fyp-Frontend-main
   npm run dev
   ```

3. **Test Authentication**:
   - Go to `http://localhost:3000`
   - Click "Continue with Google"
   - Should work without COOP errors

## 🎯 **Why This Will Work:**

1. **Fresh Configuration**: No cached issues
2. **Proper Origins**: All localhost variants included
3. **Correct Redirect URIs**: Matches your setup
4. **Clean Environment**: New credentials

## ⚠️ **Important Notes:**

- **Wait 5-10 minutes** after creating the OAuth client for changes to propagate
- **Use exact URLs** as shown above (no trailing slashes)
- **Restart both servers** after updating environment variables
- **Clear browser cache** if needed

Let me know the new Client ID and I'll update the auth service for you!
