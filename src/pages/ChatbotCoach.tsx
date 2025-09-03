import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { demoCourses } from '@/data/demoData';
import Button from '@/components/Button';
import { Send, MessageCircle, ArrowRight } from 'lucide-react';

const ChatbotCoach = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const course = demoCourses.find(c => c.id === courseId);
  const [messages, setMessages] = useState<Array<{
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>>([
    {
      id: '1',
      type: 'assistant' as const,
      content: `Hello! I'm your pre-quiz coach for "${course?.title}". I'm here to help you prepare for the quiz by answering any questions you might have about the course content. What would you like to know?`,
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h2>
          <Link to="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const suggestedQuestions = course.faq.slice(0, 4).map(faq => faq.question);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    // Find relevant FAQ answer
    const relevantFAQ = course.faq.find(faq => 
      faq.question.toLowerCase().includes(inputMessage.toLowerCase()) ||
      inputMessage.toLowerCase().includes(faq.question.toLowerCase().split(' ')[0])
    );

    const assistantResponse = {
      id: (Date.now() + 1).toString(),
      type: 'assistant' as const,
      content: relevantFAQ 
        ? relevantFAQ.answer 
        : "I understand your question. Based on the course content, I'd recommend reviewing the relevant slides. If you have specific questions about the material, feel free to ask!",
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage, assistantResponse]);
    setInputMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to={`/courses/${course.id}`} className="text-corporate-primary hover:text-corporate-secondary">
                ← Back to Course
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <MessageCircle className="h-5 w-5 text-corporate-primary" />
              <span className="text-sm text-gray-600">Pre-Quiz Coach</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">Pre-Quiz Coach</h1>
            <p className="text-gray-600">Ask me anything about the course content before taking the quiz</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-gradient-corporate text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Suggested Questions */}
          <div className="p-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Suggested questions:</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(question)}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full hover:bg-blue-100 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask a question about the course..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-corporate-primary focus:border-transparent"
              />
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link to={`/courses/${course.id}`}>
            <Button variant="outline">Back to Course</Button>
          </Link>
          <Link to={`/courses/${course.id}/quiz`}>
            <Button>
              Proceed to Quiz
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChatbotCoach;
