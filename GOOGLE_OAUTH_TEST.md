# 🧪 Google OAuth Test Checklist

## ✅ **Before Testing - Complete Setup**

### **1. Create New OAuth 2.0 Client ID**
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com/)
- [ ] Select project: `Ai-Phycologist`
- [ ] Go to: APIs & Services → Credentials
- [ ] Create new OAuth 2.0 Client ID
- [ ] Application type: Web application
- [ ] Name: `TaskMind-Fresh`

### **2. Configure Origins & Redirects**
- [ ] **Authorized JavaScript origins**:
  ```
  http://localhost:3000
  http://localhost:3001
  http://127.0.0.1:3000
  http://127.0.0.1:3001
  ```
- [ ] **Authorized redirect URIs**:
  ```
  http://localhost:3000
  http://localhost:3001
  http://127.0.0.1:3000
  http://127.0.0.1:3001
  ```

### **3. Update Environment Variables**
- [ ] **Backend `.env`**:
  ```bash
  GOOGLE_CLIENT_ID=YOUR_NEW_CLIENT_ID
  GOOGLE_CLIENT_SECRET=YOUR_NEW_CLIENT_SECRET
  ```
- [ ] **Frontend `.env.local`**:
  ```bash
  NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_NEW_CLIENT_ID
  ```

### **4. Wait for Propagation**
- [ ] **Wait 5-10 minutes** for Google changes to propagate

## 🚀 **Testing Steps**

### **Step 1: Start Servers**
```bash
# Backend
cd Fyp-Backend-main
npm run dev

# Frontend (new terminal)
cd Fyp-Frontend-main
npm run dev
```

### **Step 2: Test Authentication**
1. **Go to**: `http://localhost:3000`
2. **Click**: "Continue with Google"
3. **Expected**: Modal opens with Google button
4. **Click**: Google button
5. **Expected**: Google OAuth popup/flow
6. **Complete**: Google authentication
7. **Expected**: User authenticated and redirected

### **Step 3: Check Results**
- [ ] **No COOP errors** in browser console
- [ ] **No CORS errors** in browser console
- [ ] **No 403 errors** in browser console
- [ ] **User data saved** to database
- [ ] **JWT token generated**
- [ ] **User redirected** to dashboard

## 🔍 **Troubleshooting**

### **If Still Getting COOP Errors:**
1. **Clear browser cache** completely
2. **Try incognito/private mode**
3. **Check browser console** for specific errors
4. **Verify Client ID** matches in both frontend and backend

### **If Getting CORS Errors:**
1. **Verify origins** in Google Console match exactly
2. **Check no trailing slashes** in URLs
3. **Wait longer** for Google changes to propagate
4. **Try different browser**

### **If Getting 403 Errors:**
1. **Verify Client ID** is correct
2. **Check Google Console** configuration
3. **Ensure APIs are enabled**
4. **Verify redirect URIs**

## 📋 **Success Indicators**

✅ **Modal opens** with Google button
✅ **Google button renders** properly
✅ **OAuth flow starts** when clicked
✅ **No browser console errors**
✅ **Authentication completes** successfully
✅ **User data appears** in dashboard
✅ **Database shows** new user record

## 🎯 **Expected Flow**

1. **Click button** → Modal opens
2. **Click Google button** → OAuth flow starts
3. **Complete Google auth** → Redirect back to app
4. **User authenticated** → Dashboard loads
5. **Database updated** → User record created

**Follow this checklist step by step and the Google OAuth should work perfectly!**
