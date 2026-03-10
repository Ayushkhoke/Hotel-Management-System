# AI Receptionist Setup Guide

## 🤖 Overview
The AI Receptionist feature uses Google's Gemini AI to provide intelligent, conversational assistance for hotel bookings, room information, and customer queries.

## 📋 Prerequisites
1. **Google Gemini API Key** - Get a free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Local Server Running** - Ensure your backend server is running on `http://localhost:4000`

## ⚙️ Setup Instructions

### Step 1: Get Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the generated API key

### Step 2: Configure Backend Environment
1. Navigate to the `server` folder:
   ```bash
   cd server
   ```

2. Create a `.env` file if it doesn't exist:
   ```bash
   # Windows (PowerShell)
   New-Item -Path .env -ItemType File
   
   # Or simply create it manually
   ```

3. Add your Gemini API key to `.env`:
   ```env
   # Required: Google Gemini API Key(s)
   GEMINI_KEYS=your_api_key_here
   
   # Optional: Add multiple keys separated by commas for load balancing
   # GEMINI_KEYS=key1,key2,key3
   
   # Other existing environment variables
   PORT=4000
   MONGO_URL=your_mongodb_connection_string
   # ... rest of your config
   ```

### Step 3: Configure Frontend API URL
1. Open `frontend/src/services/apis.jsx`

2. **For Local Development**, ensure this line is UNCOMMENTED:
   ```javascript
   const BASE_URL="http://localhost:4000/api/v1"
   ```

3. **For Production**, comment out localhost and use your deployed URL:
   ```javascript
   // const BASE_URL="http://localhost:4000/api/v1"
   const BASE_URL="https://your-deployed-backend.com/api/v1"
   ```

### Step 4: Start Both Servers

**Backend Server:**
```bash
cd server
npm install  # If not already done
npm start    # or: node index.js
```

**Frontend Server:**
```bash
cd frontend
npm install  # If not already done
npm run dev  # or: npm start
```

### Step 5: Test the AI Receptionist
1. Open your browser to `http://localhost:5173` (or your frontend port)
2. Navigate to the Dashboard
3. Find the **AI Receptionist** section
4. Try asking: *"I want to book a room"* or *"What rooms are available?"*

## ✅ Verification Checklist

- [ ] Gemini API key added to `server/.env`
- [ ] `GEMINI_KEYS` environment variable is set correctly
- [ ] Backend server running on `http://localhost:4000`
- [ ] Frontend `BASE_URL` points to `http://localhost:4000/api/v1`
- [ ] Frontend server is running
- [ ] AI Receptionist section appears in the dashboard
- [ ] Test message receives a response (not an error)

## 🔧 Troubleshooting

### Error: "Request failed with status code 404"
**Cause:** Frontend cannot find the AI endpoint on the backend.

**Solutions:**
1. ✅ Verify backend server is running: `http://localhost:4000`
2. ✅ Check `frontend/src/services/apis.jsx` has localhost URL uncommented
3. ✅ Ensure `server/routes/aiRoutes.js` exists and is imported in `server/index.js`
4. ✅ Restart both frontend and backend servers

### Error: "AI is not configured yet. Please add GEMINI_KEYS..."
**Cause:** Missing or invalid Gemini API key.

**Solutions:**
1. ✅ Check `server/.env` file exists and has `GEMINI_KEYS=your_key`
2. ✅ Verify the API key is valid (no extra spaces or quotes)
3. ✅ Restart the backend server after adding the key

### Error: "Unable to reach the AI service..."
**Cause:** Network/connection issue between frontend and backend.

**Solutions:**
1. ✅ Verify backend is running: Open `http://localhost:4000` in browser
2. ✅ Check CORS configuration allows frontend origin
3. ✅ Test API directly: 
   ```bash
   # PowerShell
   Invoke-RestMethod -Uri "http://localhost:4000/api/v1/aireceptionist/ask-ai" `
     -Method POST `
     -ContentType "application/json" `
     -Body '{"chat":[{"role":"user","text":"Hello"}]}'
   ```

### Error: "AI quota exceeded..."
**Cause:** Gemini API free tier rate limit reached.

**Solutions:**
1. ✅ Wait for quota reset (usually 1 minute)
2. ✅ Add multiple API keys in `.env`: `GEMINI_KEYS=key1,key2,key3`
3. ✅ Upgrade to Gemini API paid plan for higher limits

### AI Response is Slow
**Cause:** First request or network latency.

**Tips:**
- First request may take 2-3 seconds (AI model initialization)
- Subsequent requests are typically faster
- Consider upgrading to Gemini Pro for better performance

## 🎯 Best Practices

1. **Multiple API Keys**: Add 2-3 Gemini keys for automatic failover
2. **Environment Variables**: Never commit `.env` file to version control
3. **Error Monitoring**: Check browser console and server logs for issues
4. **Testing**: Test AI endpoint separately before integrating

## 📚 API Endpoints

### Ask AI Receptionist
- **URL**: `POST /api/v1/aireceptionist/ask-ai`
- **Body**: 
  ```json
  {
    "chat": [
      {"role": "user", "text": "I want to book a room"},
      {"role": "ai", "text": "Sure! Let me help..."},
      {"role": "user", "text": "What's available?"}
    ]
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "reply": "We have several rooms available..."
  }
  ```

## 🔐 Security Notes

- Keep your Gemini API keys confidential
- Add `.env` to `.gitignore`
- Use environment variables for all sensitive data
- Rotate API keys periodically
- Monitor API usage in Google AI Studio

## 📞 Support

If you continue experiencing issues:
1. Check server console logs for detailed errors
2. Check browser console (F12) for frontend errors
3. Verify all setup steps are completed
4. Test API endpoint directly using curl/Postman

---

**Made with ❤️ for seamless hotel management**
