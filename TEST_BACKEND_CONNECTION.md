# 🧪 Test Backend Connection

## 🔍 **Debug the 500 Error**

The backend is returning a 500 error. Let's check what's happening.

### **Step 1: Check Backend Logs**

1. **Open terminal** where backend is running
2. **Look for error messages** when you try authentication
3. **Check if MongoDB is connected**

### **Step 2: Test Backend Directly**

Open a new terminal and test the backend:

```bash
curl -X POST http://localhost:3001/api/auth/google \
  -H "Content-Type: application/json" \
  -d '{"googleToken":"test-google-token-123","user":{"email":"test@example.com","name":"Test User"}}'
```

### **Step 3: Check Backend Health**

```bash
curl http://localhost:3001/health
```

## 🔧 **Possible Issues**

### **Issue 1: MongoDB Connection**
- **Error**: Database connection failed
- **Solution**: Check MongoDB URI in .env file

### **Issue 2: Environment Variables**
- **Error**: GOOGLE_CLIENT_ID not found
- **Solution**: Check .env file exists and has correct values

### **Issue 3: Code Error**
- **Error**: Syntax error or runtime error
- **Solution**: Check backend logs for specific error

## 🚀 **Quick Fix**

Let me create a simple test endpoint to check if the backend is working.
