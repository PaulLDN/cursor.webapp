# 🤖 Free AI Chatbot Setup Guide

Your pre-quiz chatbot coach now supports **FREE AI models** through Groq! No payment required! 🎉

## 🆓 Option 1: FREE - Groq AI (Recommended)

### What is Groq?
Groq provides **FREE access** to powerful open-source AI models like:
- **Llama 3.1 70B** - Very capable, fast responses
- **Mixtral 8x7B** - Great for educational content
- **Gemma 7B** - Efficient and quick

### How to Get Free API Key:

1. **Visit Groq Console:**
   - Go to: https://console.groq.com/

2. **Create Free Account:**
   - Sign up with Google/GitHub or email
   - **No credit card required!** ✨

3. **Generate API Key:**
   - Click "API Keys" in the left sidebar
   - Click "Create API Key"
   - Give it a name like "Corporate Training Bot"
   - Copy the key (starts with `gsk_`)

4. **Add to Your App:**
   - Open `backend/config.env`
   - Replace:
     ```
     GROQ_API_KEY=your-groq-api-key-here
     ```
   - With:
     ```
     GROQ_API_KEY=gsk_YOUR_ACTUAL_KEY_HERE
     ```

5. **Restart Backend:**
   ```bash
   cd backend
   node src/server.js
   ```

### Free Tier Limits:
- **30 requests/minute** (plenty for your use case!)
- **14,400 requests/day**
- **Unlimited** usage within limits
- **No expiration** - truly free forever!

---

## 💳 Option 2: Paid - OpenAI (Backup)

If you already have OpenAI credits or want to use GPT models:

1. **Get API Key:**
   - Visit: https://platform.openai.com/api-keys
   - Create account (requires payment method)
   - Generate API key

2. **Add to Config:**
   - Open `backend/config.env`
   - Replace:
     ```
     OPENAI_API_KEY=your-openai-api-key-here
     ```
   - With your actual key

3. **Pricing:**
   - GPT-3.5-Turbo: ~$0.002/1K tokens
   - Very affordable for student chatbot use

---

## 🔄 How the Priority Works:

The chatbot tries APIs in this order:

```
1. Groq (FREE) ➡️ 
2. OpenAI (Paid) ➡️ 
3. Intelligent Fallback (Built-in)
```

Even with **NO API keys**, the chatbot still works using our intelligent fallback system with course-specific responses!

---

## ✅ Testing Your Setup:

1. **Start the backend:**
   ```bash
   cd backend
   node src/server.js
   ```

2. **Start the frontend:**
   ```bash
   npm run dev
   ```

3. **Test the Chatbot:**
   - Login as a student
   - Open any course (GDPR or Cybersecurity)
   - Click "Pre-Quiz Coach"
   - Ask: "What are the key concepts?"

4. **Check Console Logs:**
   - If using Groq, you'll see: `✅ Groq AI (FREE) - User: ...`
   - If using OpenAI, you'll see: `OpenAI Chat - User: ...`
   - If using fallback, you'll see: `Intelligent Fallback - User: ...`

---

## 🎯 Recommended Model Comparison:

| Provider | Model | Speed | Quality | Cost | Best For |
|----------|-------|-------|---------|------|----------|
| **Groq** | Llama 3.1 70B | ⚡⚡⚡ Super Fast | ⭐⭐⭐⭐ Excellent | 🆓 FREE | **Educational chatbots** |
| Groq | Mixtral 8x7B | ⚡⚡⚡ Very Fast | ⭐⭐⭐⭐ Great | 🆓 FREE | Technical Q&A |
| OpenAI | GPT-3.5-Turbo | ⚡⚡ Fast | ⭐⭐⭐⭐⭐ Excellent | 💰 ~$0.002/1K | High accuracy needs |
| OpenAI | GPT-4 | ⚡ Moderate | ⭐⭐⭐⭐⭐ Best | 💰💰 ~$0.03/1K | Complex reasoning |

**Recommendation:** Use **Groq with Llama 3.1 70B** - it's FREE, fast, and perfect for educational chatbots!

---

## 🚀 Alternative FREE Options:

If Groq doesn't work for you, here are other free alternatives:

### Hugging Face Inference API (FREE Tier)
- Models: Various open-source models
- Signup: https://huggingface.co/
- Free tier: Limited requests/day

### Cohere (FREE Trial)
- Models: Command, Command-Light
- Signup: https://dashboard.cohere.com/
- Free tier: 100 requests/minute

### Together AI (FREE Credits)
- Models: Llama 2, Mistral, etc.
- Signup: https://api.together.xyz/
- Free tier: $25 credit to start

---

## 📝 Example Chatbot Interactions:

**Student:** "What are the key concepts I should focus on?"

**AI Response (Groq):**
> "Great question! For GDPR Compliance, here are the key concepts:
> 
> 🔑 **Core Principles:**
> • Lawfulness, fairness and transparency
> • Purpose limitation and data minimization
> • Accuracy and storage limitation
> 
> 📋 **Essential Topics:**
> • Understanding personal data
> • Legal basis for processing
> • Individual rights (access, rectification, erasure)
> 
> Would you like me to explain any of these in more detail?"

---

## 🔧 Troubleshooting:

### "Groq API error"
- ✅ Check your API key is correct in `config.env`
- ✅ Verify you're not hitting rate limits (30 req/min)
- ✅ App will automatically fall back to OpenAI or intelligent responses

### "OpenAI API error"
- ✅ Check your API key and billing
- ✅ App will fall back to intelligent responses

### Chatbot still works without any API key!
- ✅ Yes! The intelligent fallback system provides course-specific responses
- ✅ It's built-in and requires no setup

---

## 🎓 Pro Tips:

1. **Use Groq for development** (FREE, fast)
2. **Keep OpenAI as backup** for production (if needed)
3. **Intelligent fallback** always works as last resort
4. **Monitor usage** in Groq console to stay within limits
5. **Test with real questions** to ensure quality responses

---

## 📊 Current Implementation:

```javascript
Priority Order:
1. Groq API (llama-3.1-70b-versatile) - FREE ✨
2. OpenAI API (gpt-3.5-turbo) - Paid 💰
3. Intelligent Fallback - Always works ✅
```

**Model Used:** Llama 3.1 70B (via Groq)
- **Parameters:** 70 billion
- **Context Window:** 8,192 tokens
- **Speed:** ~500 tokens/second
- **Cost:** FREE! 🎉

---

## 🎉 You're All Set!

Your chatbot is now configured with FREE AI models. Students can get intelligent help preparing for quizzes without any costs to you!

**Questions?** Check the console logs to see which AI provider is being used for each request.

Happy Training! 🚀

