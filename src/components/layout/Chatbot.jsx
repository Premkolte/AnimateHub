import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentDots, FaTimes, FaPaperPlane, FaRobot, FaUser, FaTrash } from 'react-icons/fa';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '👋 Hi! I\'m your AI assistant. How can I help you today?', timestamp: new Date() }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChatbot = () => setIsOpen(!isOpen);

  const handleSendMessage = () => {
    if (userMessage.trim() === '') return;

    const newMessage = { sender: 'user', text: userMessage, timestamp: new Date() };
    setMessages(prev => [...prev, newMessage]);
    setUserMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse, timestamp: new Date() }]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (msg) => {
    const lower = msg.toLowerCase();
    if (lower.includes('hello') || lower.includes('hi')) return '✨ Hello! I\'m excited to help you. What would you like to know?';
    if (lower.includes('help')) return '🤝 I\'m here to assist you! You can ask me about features, get support, or just chat.';
    if (lower.includes('thanks')) return '😊 You\'re very welcome! Is there anything else I can help you with?';
    if (lower.includes('bye')) return '👋 Goodbye! Feel free to reach out anytime you need assistance.';
    return '🤔 That\'s an interesting question! I\'m still learning, but I\'d love to help you find the answer.';
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200 && !hasScrolled) setHasScrolled(true);
      else if (window.scrollY <= 200 && hasScrolled) setHasScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed right-6 z-50"
        initial={{ bottom: 24 }}
        animate={{ bottom: hasScrolled ? 96 : 24 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-gradient-to-r from-[#3b82f6] to-[#accefbff] dark:from-purple-600 dark:to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
          onClick={toggleChatbot}
        >
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isOpen ? <FaTimes size={24} /> : <FaCommentDots size={24} />}
          </motion.div>
          {!isOpen && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
        </motion.button>
      </motion.div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#3b82f6] to-[#accefbff] dark:from-purple-600 dark:to-blue-600 p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <FaRobot size={20} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">AI Assistant</h2>
                    <p className="text-xs text-white/80">Always here to help</p>
                  </div>
                </div>

                {/* Clear + Close Buttons */}
                <div className="flex space-x-2">
                  {/* Clear Chat Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      setMessages([
                        { sender: 'bot', text: '👋 Hi! I\'m your AI assistant. How can I help you today?', timestamp: new Date() }
                      ])
                    }
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <FaTrash size={14} />
                  </motion.button>

                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleChatbot}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    <FaTimes size={14} />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 p-4 overflow-y-auto bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50">
              <div className="space-y-4">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end space-x-2 max-w-[75%] ${m.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs ${
                          m.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                            : 'bg-gradient-to-r from-gray-600 to-gray-700'
                        }`}
                      >
                        {m.sender === 'user' ? <FaUser size={12} /> : <FaRobot size={12} />}
                      </div>
                      {/* Bubble */}
                      <div
                        className={`px-4 py-3 rounded-2xl shadow-sm ${
                          m.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-br-md'
                            : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{m.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            m.sender === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                    <div className="flex items-end space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-white">
                        <FaRobot size={12} />
                      </div>
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 rounded-2xl rounded-bl-md">
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                              animate={{ y: [0, -8, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-gray-100/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isTyping}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 bg-gradient-to-r from-[#3b82f6] to-[#accefbff] dark:from-purple-600 dark:to-blue-600 text-white rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleSendMessage}
                  disabled={isTyping || !userMessage.trim()}
                >
                  <FaPaperPlane size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
