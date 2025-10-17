# 🔧 Environment Variables Setup

## ✅ **Updated Google OAuth Credentials**

Your new Google OAuth credentials:
- **Client ID**: `73187296567-61gjtjifqhghbpq2kcq917tthgo16i1a.apps.googleusercontent.com`
- **Client Secret**: `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`

## 📁 **Backend Environment File**

Create a file called `.env` in the `Fyp-Backend-main` folder with this content:

```bash
# Database
MONGODB_URI=mongodb+srv://Maani:T38OADJnAE6X87B3@aiphycologist.ojalat4.mongodb.net/taskmind?retryWrites=true&w=majority&appName=Ai-Phycologist

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Google OAuth Credentials (Updated)
GOOGLE_CLIENT_ID=73187296567-61gjtjifqhghbpq2kcq917tthgo16i1a.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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

# YouTube API
YOUTUBE_API_KEY=AIzaSyBfd3yuvHJZE0Xapo9omShEJWuiBkP0pQs

# Server
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 📁 **Frontend Environment File**

Create a file called `.env.local` in the `Fyp-Frontend-main` folder with this content:

```bash
# Google OAuth Client ID (for frontend)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=73187296567-61gjtjifqhghbpq2kcq917tthgo16i1a.apps.googleusercontent.com
```

## 🚀 **After Creating Environment Files**

1. **Save both files**
2. **Restart Backend Server**:
   ```bash
   cd Fyp-Backend-main
   npm run dev
   ```
3. **Restart Frontend Server**:
   ```bash
   cd Fyp-Frontend-main
   npm run dev
   ```

## 🧪 **Test Authentication**

1. **Go to**: `http://localhost:3000`
2. **Click**: "Continue with Google"
3. **Expected**: Modal opens with Google button
4. **Click**: Google button
5. **Expected**: Google OAuth flow works
6. **Complete**: Authentication
7. **Expected**: User authenticated successfully

## ✅ **Success Indicators**

- ✅ **No COOP errors** in browser console
- ✅ **No CORS errors** in browser console
- ✅ **No 403 errors** in browser console
- ✅ **Google OAuth modal** opens properly
- ✅ **Authentication completes** successfully
- ✅ **User data saved** to database

## 🔍 **If Still Having Issues**

1. **Wait 5-10 minutes** for Google changes to propagate
2. **Clear browser cache** completely
3. **Try incognito/private mode**
4. **Check browser console** for specific errors
5. **Verify both servers restarted** after environment changes

**Create these two environment files and restart both servers - the Google OAuth should work perfectly!**
