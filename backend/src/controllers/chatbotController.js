const OpenAI = require('openai');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @desc    Chat with AI assistant
// @route   POST /api/chatbot/chat
// @access  Private
const chatWithAI = async (req, res) => {
  try {
    const { message, courseId, context } = req.body;
    const { user } = req;

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors.array()
      });
    }

    // Create context-aware system prompt
    let systemPrompt = `You are an intelligent AI assistant for a corporate training platform. You help students with their learning by answering questions about courses, providing explanations, and offering guidance.

Your role:
- Answer questions about course content, concepts, and materials
- Provide clear, educational explanations
- Help students understand complex topics
- Offer study tips and learning strategies
- Be encouraging and supportive
- If you don't know something, admit it and suggest where to find the information

Guidelines:
- Keep responses concise but comprehensive
- Use examples when helpful
- Ask clarifying questions if needed
- Maintain a professional but friendly tone
- Focus on educational value`;

    // Add course-specific context if provided
    if (courseId && context) {
      systemPrompt += `\n\nCurrent course context:
- Course: ${context.courseTitle || 'Unknown'}
- Topic: ${context.currentTopic || 'General'}
- User's role: ${user.role}

Use this context to provide more relevant and personalized responses.`;
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;

    // Log the interaction for monitoring
    console.log(`AI Chat - User: ${user.email}, Course: ${courseId || 'General'}, Message: ${message.substring(0, 100)}...`);

    res.json({
      success: true,
      data: {
        message: aiResponse,
        timestamp: new Date().toISOString(),
        courseId: courseId || null
      }
    });

  } catch (error) {
    console.error('AI Chat error:', error);
    
    // Handle specific OpenAI errors
    if (error.code === 'insufficient_quota') {
      return res.status(503).json({
        success: false,
        message: 'AI service temporarily unavailable. Please try again later.'
      });
    }
    
    if (error.code === 'invalid_api_key') {
      return res.status(500).json({
        success: false,
        message: 'AI service configuration error. Please contact support.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to process your message. Please try again.'
    });
  }
};

module.exports = {
  chatWithAI
};
