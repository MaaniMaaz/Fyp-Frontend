# 🔍 Debug 500 Error - Step by Step

## 🚀 **Step 1: Test Backend Connection**

1. **Check if backend is running**:
   ```bash
   curl http://localhost:3001/api/auth/test
   ```
   **Expected**: `{"success":true,"message":"Backend is working"}`

## 🔍 **Step 2: Check Backend Logs**

1. **Look at the terminal where backend is running**
2. **Try authentication again**
3. **Look for these log messages**:
   - `Processing test authentication...`
   - `Test auth data: { email: "...", name: "...", picture: "..." }`
   - Any error messages

## 🧪 **Step 3: Test Authentication Directly**

1. **Open browser console** (F12)
2. **Try authentication**
3. **Check the response** in Network tab
4. **Look for detailed error message**

## 🔧 **Step 4: Common Issues & Solutions**

### **Issue 1: Backend Not Running**
- **Solution**: Start backend with `npm run dev`

### **Issue 2: Database Connection**
- **Error**: MongoDB connection failed
- **Solution**: Check MongoDB URI in .env file

### **Issue 3: Environment Variables**
- **Error**: GOOGLE_CLIENT_ID not found
- **Solution**: Create .env file with correct values

### **Issue 4: Code Error**
- **Error**: Syntax or runtime error
- **Solution**: Check backend logs for specific error

## 🚀 **Step 5: Quick Test**

1. **Restart backend**:
   ```bash
   cd Fyp-Backend-main
   npm run dev
   ```

2. **Test authentication**:
   - Go to `http://localhost:3000`
   - Click "Continue with Google"
   - Enter email and name when prompted
   - Check backend logs for detailed error

## 📋 **What to Look For**

✅ **Backend logs show**:
- `Processing test authentication...`
- `Test auth data: { ... }`

❌ **If you see**:
- `MongoDB connection error`
- `GOOGLE_CLIENT_ID not found`
- `Syntax error`
- `Module not found`

## 🎯 **Expected Flow**

1. **Frontend sends**: Test token + user data
2. **Backend logs**: "Processing test authentication..."
3. **Backend processes**: User data
4. **Backend returns**: Success with JWT token

**Follow these steps and let me know what error messages you see in the backend logs!**
