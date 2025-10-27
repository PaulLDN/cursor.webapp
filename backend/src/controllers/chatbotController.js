const OpenAI = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { validationResult } = require('express-validator');
const db = require('../db/inMemoryDB');

// Initialize Google Gemini AI (FREE with generous limits)
const gemini = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your-gemini-api-key-here'
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// Initialize OpenAI (paid)
const openai = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-openai-api-key-here' 
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null;

// Initialize Groq (FREE alternative - llama-3.1-70b-versatile)
const groq = process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your-groq-api-key-here'
  ? new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1'
    })
  : null;

// Intelligent fallback responses based on course content
const generateFallbackResponse = async (message, courseId, context) => {
  try {
    // Get course data for context-aware responses
    let course = null;
    if (courseId) {
      // Use in-memory database to find course
      course = db.courses.find(c => c._id === courseId || c.id === courseId);
    }

    const lowerMessage = message.toLowerCase();
    
    // GDPR-specific responses
    if (course && course.title.toLowerCase().includes('gdpr')) {
      if (lowerMessage.includes('key concept') || lowerMessage.includes('focus') || lowerMessage.includes('important')) {
        return `Great question! For GDPR Compliance, here are the key concepts you should focus on:

🔑 **Core Principles:**
• Lawfulness, fairness and transparency
• Purpose limitation and data minimization
• Accuracy and storage limitation
• Integrity, confidentiality, and accountability

📋 **Essential Topics:**
• Understanding what constitutes personal data
• Legal basis for processing (consent, contract, legitimate interests)
• Individual rights (access, rectification, erasure, portability)
• Data breach notification requirements
• Data Protection Impact Assessments (DPIAs)

💡 **Study Tips:**
Focus on practical examples and real-world scenarios. Understanding the "why" behind each principle will help you apply them correctly in different situations.`;
      }
      
      if (lowerMessage.includes('personal data') || lowerMessage.includes('what is personal data')) {
        return `Personal data under GDPR is any information relating to an identified or identifiable natural person. This includes:

📊 **Direct Identifiers:**
• Names, addresses, phone numbers
• Email addresses, ID numbers
• Biometric data

🌐 **Indirect Identifiers:**
• IP addresses, cookies
• Location data, online identifiers
• Behavioral data, preferences

🏥 **Special Categories:**
• Health information
• Political opinions, religious beliefs
• Trade union membership
• Genetic and biometric data

**Key Point:** If you can identify someone from the data (directly or indirectly), it's personal data and falls under GDPR protection.`;
      }
      
      if (lowerMessage.includes('principle') || lowerMessage.includes('seven principle')) {
        return `The seven key principles of GDPR are the foundation of data protection:

1. **Lawfulness, fairness and transparency** - Process data legally, fairly, and transparently
2. **Purpose limitation** - Only collect data for specified, legitimate purposes
3. **Data minimisation** - Collect only what's necessary for the purpose
4. **Accuracy** - Keep data accurate and up-to-date
5. **Storage limitation** - Don't keep data longer than necessary
6. **Integrity and confidentiality** - Protect data with appropriate security
7. **Accountability** - Demonstrate compliance with all principles

**Memory Tip:** Think "L-P-D-A-S-I-A" (Lawfulness, Purpose, Data, Accuracy, Storage, Integrity, Accountability)`;
      }
      
      if (lowerMessage.includes('right') || lowerMessage.includes('individual right')) {
        return `GDPR grants individuals several important rights over their personal data:

🔍 **Right of Access** - Get copies of your data
✏️ **Right to Rectification** - Correct inaccurate data
🗑️ **Right to Erasure** - "Right to be forgotten"
⏸️ **Right to Restrict Processing** - Limit how data is used
📤 **Right to Data Portability** - Get your data in a usable format
❌ **Right to Object** - Object to certain types of processing
ℹ️ **Right to Information** - Know how your data is used

**Important:** Organizations must respond to these requests within one month (with possible extension to three months).`;
      }
    }
    
    // Web Security responses
    if (course && course.title.toLowerCase().includes('security')) {
      if (lowerMessage.includes('key concept') || lowerMessage.includes('focus') || lowerMessage.includes('important')) {
        return `For Web Security, focus on these critical concepts:

🔐 **Core Security Principles:**
• Confidentiality, Integrity, Availability (CIA triad)
• Defense in depth
• Least privilege principle
• Fail securely

🛡️ **Common Vulnerabilities (OWASP Top 10):**
• Injection attacks (SQL, NoSQL, LDAP)
• Broken Authentication
• Sensitive Data Exposure
• XML External Entities (XXE)
• Broken Access Control
• Security Misconfiguration
• Cross-Site Scripting (XSS)
• Insecure Deserialization
• Using Components with Known Vulnerabilities
• Insufficient Logging & Monitoring

💡 **Key Defense Strategies:**
• Input validation and sanitization
• Output encoding
• HTTPS everywhere
• Regular security updates
• Security headers implementation`;
      }
      
      if (lowerMessage.includes('https') || lowerMessage.includes('ssl') || lowerMessage.includes('tls')) {
        return `HTTPS and SSL/TLS are fundamental to web security:

🔒 **What is HTTPS?**
HTTPS = HTTP + SSL/TLS encryption
• Encrypts data between browser and server
• Prevents eavesdropping and tampering
• Provides authentication of the server

🛡️ **How SSL/TLS Works:**
1. **Handshake** - Client and server agree on encryption
2. **Certificate Exchange** - Server proves its identity
3. **Key Exchange** - Generate shared secret key
4. **Encrypted Communication** - All data is encrypted

✅ **Best Practices:**
• Use strong cipher suites
• Implement HSTS (HTTP Strict Transport Security)
• Regular certificate renewal
• Perfect Forward Secrecy (PFS)
• Security headers (HSTS, CSP, etc.)`;
      }
      
      if (lowerMessage.includes('sql injection') || lowerMessage.includes('injection')) {
        return `SQL Injection is one of the most dangerous web vulnerabilities:

🎯 **What is SQL Injection?**
When user input is improperly handled in database queries, allowing attackers to execute malicious SQL code.

💥 **Impact:**
• Data theft and manipulation
• Database structure exposure
• Authentication bypass
• Complete system compromise

🛠️ **Common Attack Vectors:**
• Login forms: ' OR '1'='1
• Search boxes: '; DROP TABLE users; --
• URL parameters: ?id=1' UNION SELECT * FROM users --

✅ **Prevention:**
• Use parameterized queries/prepared statements
• Input validation and sanitization
• Least privilege database access
• Web Application Firewall (WAF)
• Regular security testing`;
      }
    }
    
    // General study and quiz preparation responses
    if (lowerMessage.includes('quiz') || lowerMessage.includes('test') || lowerMessage.includes('exam')) {
      return `Here are some effective strategies for quiz preparation:

📚 **Study Approach:**
• Review course materials systematically
• Focus on key concepts and practical applications
• Use active recall techniques (quiz yourself)
• Create mind maps or summaries

⏰ **Time Management:**
• Start studying early, not the night before
• Break study sessions into manageable chunks
• Take regular breaks to maintain focus
• Review difficult topics multiple times

🎯 **Quiz Strategy:**
• Read questions carefully
• Answer easy questions first
• Use process of elimination
• Don't spend too much time on one question
• Review your answers if time permits

💡 **Key Success Factors:**
• Understanding concepts (not just memorization)
• Practical application knowledge
• Attention to detail
• Confidence in your preparation`;
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('confused') || lowerMessage.includes('understand')) {
      return `I'm here to help you understand the course material! Here are some ways I can assist:

🔍 **Specific Questions:**
• Ask about particular concepts or topics
• Request clarification on complex ideas
• Get examples of practical applications

📖 **Study Support:**
• Break down difficult topics into simpler parts
• Provide study tips and strategies
• Suggest focus areas for quiz preparation

💬 **How to Ask:**
• Be specific about what you want to know
• Mention which topic or concept you're asking about
• Ask for examples if something is unclear

**Example questions:**
• "Can you explain [specific concept] in simple terms?"
• "What are some real-world examples of [topic]?"
• "How does [concept A] relate to [concept B]?"

What specific topic would you like help with?`;
    }
    
    // Default response for unrecognized questions
    return `That's an interesting question! While I can provide general guidance, here are some suggestions:

📚 **For Course-Specific Questions:**
• Review the course materials and lessons
• Focus on the key concepts and principles covered
• Look for practical examples and case studies

🎯 **For Quiz Preparation:**
• Identify the main topics and themes
• Practice with similar questions
• Understand the "why" behind concepts, not just the "what"

💡 **General Study Tips:**
• Break complex topics into smaller parts
• Use active recall techniques
• Create connections between different concepts
• Practice explaining concepts in your own words

Is there a specific topic or concept from the course you'd like me to help clarify?`;
    
  } catch (error) {
    console.error('Error generating fallback response:', error);
    return `I'm here to help with your course questions! While I'm having some technical difficulties, I can still provide guidance on:

• Key concepts and principles
• Study strategies and tips
• Quiz preparation techniques
• General course-related questions

What specific topic would you like help with?`;
  }
};

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

    let aiResponse;

    // Try Google Gemini API first (FREE with generous limits)
    if (gemini) {
      try {
        const model = gemini.getGenerativeModel({ model: "gemini-2.0-flash" });
        const chat = model.startChat({
          history: [
            {
              role: "user",
              parts: [{ text: systemPrompt }],
            },
            {
              role: "model",
              parts: [{ text: "Understood. I'm ready to help students with their training courses. I'll provide clear, educational, and supportive responses." }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
          },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        aiResponse = response.text();
        console.log(`✅ Google Gemini AI (FREE) - User: ${user.email}, Course: ${courseId || 'General'}, Message: ${message.substring(0, 100)}...`);
      } catch (geminiError) {
        console.error('Gemini API error, trying Groq:', geminiError.message);
        
        // Try Groq API as second option
        if (groq) {
          try {
            const completion = await groq.chat.completions.create({
              model: "llama-3.1-70b-versatile",
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

            aiResponse = completion.choices[0].message.content;
            console.log(`✅ Groq AI (FREE) - User: ${user.email}, Course: ${courseId || 'General'}, Message: ${message.substring(0, 100)}...`);
          } catch (groqError) {
            console.error('Groq API error, trying OpenAI:', groqError.message);
            
            // Try OpenAI API as third option
            if (openai) {
              try {
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

                aiResponse = completion.choices[0].message.content;
                console.log(`OpenAI Chat - User: ${user.email}, Course: ${courseId || 'General'}, Message: ${message.substring(0, 100)}...`);
              } catch (openaiError) {
                console.error('OpenAI API error, falling back to intelligent responses:', openaiError.message);
                // Fall back to intelligent responses
                aiResponse = await generateFallbackResponse(message, courseId, context);
                console.log(`Fallback Chat - User: ${user.email}, Course: ${courseId || 'General'}, Message: ${message.substring(0, 100)}...`);
              }
            } else {
              // Fall back to intelligent responses
              aiResponse = await generateFallbackResponse(message, courseId, context);
              console.log(`Fallback Chat - User: ${user.email}, Course: ${courseId || 'General'}, Message: ${message.substring(0, 100)}...`);
            }
          }
        } else {
          // Fall back to intelligent responses if Groq not available
          aiResponse = await generateFallbackResponse(message, courseId, context);
          console.log(`Fallback Chat - User: ${user.email}, Course: ${courseId || 'General'}, Message: ${message.substring(0, 100)}...`);
        }
      }
    } else if (groq) {
      // Try Groq if Gemini not available
      try {
        const completion = await groq.chat.completions.create({
          model: "llama-3.1-70b-versatile",
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

        aiResponse = completion.choices[0].message.content;
        console.log(`✅ Groq AI (FREE) - User: ${user.email}, Course: ${courseId || 'General'}, Message: ${message.substring(0, 100)}...`);
      } catch (groqError) {
        console.error('Groq API error, trying OpenAI:', groqError.message);
        
        // Try OpenAI API as second option if available
        if (openai) {
          try {
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

            aiResponse = completion.choices[0].message.content;
            console.log(`OpenAI Chat - User: ${user.email}, Course: ${courseId || 'General'}, Message: ${message.substring(0, 100)}...`);
          } catch (openaiError) {
            console.error('OpenAI API error, falling back to intelligent responses:', openaiError.message);
            // Fall back to intelligent responses
            aiResponse = await generateFallbackResponse(message, courseId, context);
            console.log(`Fallback Chat - User: ${user.email}, Course: ${courseId || 'General'}, Message: ${message.substring(0, 100)}...`);
          }
        } else {
          // Fall back to intelligent responses
          aiResponse = await generateFallbackResponse(message, courseId, context);
          console.log(`Fallback Chat - User: ${user.email}, Course: ${courseId || 'General'}, Message: ${message.substring(0, 100)}...`);
        }
      }
    } else if (openai) {
      // Try OpenAI if Groq not available
      try {
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

        aiResponse = completion.choices[0].message.content;
        console.log(`OpenAI Chat - User: ${user.email}, Course: ${courseId || 'General'}, Message: ${message.substring(0, 100)}...`);
      } catch (openaiError) {
        console.error('OpenAI API error, falling back to intelligent responses:', openaiError.message);
        // Fall back to intelligent responses
        aiResponse = await generateFallbackResponse(message, courseId, context);
        console.log(`Fallback Chat - User: ${user.email}, Course: ${courseId || 'General'}, Message: ${message.substring(0, 100)}...`);
      }
    } else {
      // Use intelligent fallback system
      aiResponse = await generateFallbackResponse(message, courseId, context);
      console.log(`Intelligent Fallback - User: ${user.email}, Course: ${courseId || 'General'}, Message: ${message.substring(0, 100)}...`);
    }

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
    
    // Try to provide a fallback response even on error
    try {
      const fallbackResponse = await generateFallbackResponse(message, courseId, context);
      return res.json({
        success: true,
        data: {
          message: fallbackResponse,
          timestamp: new Date().toISOString(),
          courseId: courseId || null
        }
      });
    } catch (fallbackError) {
      console.error('Fallback response error:', fallbackError);
      
      // Final fallback
      return res.json({
        success: true,
        data: {
          message: `I'm here to help with your course questions! While I'm experiencing some technical difficulties, I can still provide guidance on key concepts, study strategies, and quiz preparation. What specific topic would you like help with?`,
          timestamp: new Date().toISOString(),
          courseId: courseId || null
        }
      });
    }
  }
};

module.exports = {
  chatWithAI
};
