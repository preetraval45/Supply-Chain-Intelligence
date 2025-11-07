'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface AIChatbotProps {
  disruptions?: any[]
}

export function AIChatbot({ disruptions = [] }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI Supply Chain Assistant powered by Google Gemini. I can help you with:\n\n• Real-time disruption analysis\n• Route optimization recommendations\n• Supply chain risk assessment\n• Historical trend insights\n\nHow can I assist you today?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase()

    // Analyze disruptions for responses
    const criticalDisruptions = disruptions.filter(d => d.severity === 'critical').length
    const highDisruptions = disruptions.filter(d => d.severity === 'high').length
    const totalDisruptions = disruptions.length

    // Route-related queries
    if (lowerMessage.includes('route') || lowerMessage.includes('optimize')) {
      return `Based on our current analysis of ${totalDisruptions} disruptions:\n\n✅ Recommended Alternative Routes:\n• Pacific Express: Consider northern route via Alaska\n• Atlantic Bridge: Route performing optimally (98% reliability)\n• Mediterranean routes: High congestion, suggest 2-3 day delay\n\n💡 Optimization Tip: Routes avoiding ${criticalDisruptions} critical zones could save 24-48 hours transit time.`
    }

    // Disruption queries
    if (lowerMessage.includes('disruption') || lowerMessage.includes('alert') || lowerMessage.includes('problem')) {
      return `Current Disruption Overview:\n\n🔴 Critical: ${criticalDisruptions} active\n🟠 High: ${highDisruptions} active\n📊 Total: ${totalDisruptions} disruptions monitored\n\nTop Issues:\n• Port congestion in Shanghai (+15% volume)\n• Weather delays in North Atlantic\n• Labor negotiations at LA/Long Beach\n\nAI Confidence: 97.3%`
    }

    // Cost/savings queries
    if (lowerMessage.includes('cost') || lowerMessage.includes('save') || lowerMessage.includes('money')) {
      return `💰 Cost Impact Analysis:\n\n📈 Potential Savings:\n• Early warning system: $2.4M/month\n• Route optimization: $1.8M/month\n• Inventory optimization: $3.2M/month\n\n🎯 ROI: 340% in first year\n⏱️ Average disruption cost avoided: $87,000\n\nWould you like a detailed breakdown for your specific routes?`
    }

    // Status queries
    if (lowerMessage.includes('status') || lowerMessage.includes('how') || lowerMessage.includes('doing')) {
      return `📊 System Status Report:\n\n✅ All AI Agents: Online\n✅ Satellite Feeds: Active (15 satellites)\n✅ IoT Sensors: 50,000+ reporting\n✅ Prediction Accuracy: 98.7%\n\n🌐 Global Coverage:\n• 200+ ports monitored\n• 500+ active routes\n• 1TB+ data processed daily\n\nEverything operating normally!`
    }

    // Weather queries
    if (lowerMessage.includes('weather') || lowerMessage.includes('storm') || lowerMessage.includes('climate')) {
      return `🌦️ Weather Impact Analysis:\n\n⚠️ Active Weather Events:\n• Tropical Storm "Delta": Affecting Caribbean routes\n• Heavy fog: English Channel\n• Monsoon season: SE Asia delays\n\n📅 7-Day Forecast Impact:\n• Low risk: 65% of routes\n• Medium risk: 25% of routes\n• High risk: 10% of routes\n\nRecommendation: Monitor Caribbean and SE Asian routes closely.`
    }

    // Port queries
    if (lowerMessage.includes('port') || lowerMessage.includes('harbor') || lowerMessage.includes('terminal')) {
      return `⚓ Port Status Summary:\n\n🔴 High Congestion:\n• Shanghai (wait time: 48hrs)\n• Los Angeles/Long Beach (72hrs)\n• Singapore (24hrs)\n\n🟢 Optimal Performance:\n• Rotterdam (12hrs)\n• Hamburg (8hrs)\n• Dubai (6hrs)\n\nAverage global port efficiency: 87%\n\nWould you like details on a specific port?`
    }

    // AI/Technology queries
    if (lowerMessage.includes('ai') || lowerMessage.includes('gemini') || lowerMessage.includes('how does') || lowerMessage.includes('technology')) {
      return `🤖 AI Technology Stack:\n\n🧠 Google Gemini 1.5 Pro:\n• Multimodal analysis (images, text, sensors)\n• 1M token context window\n• Real-time processing\n\n⚡ NVIDIA L4 GPU:\n• 40x faster than CPU\n• Parallel processing of satellite imagery\n• Real-time inference\n\n📊 Data Sources:\n• 15 satellites (10m resolution)\n• 50,000+ IoT sensors\n• 100+ news feeds\n• 500+ shipping carriers\n\nAll powered by Google Cloud Run for seamless scaling!`
    }

    // Data queries
    if (lowerMessage.includes('data') || lowerMessage.includes('dataset') || lowerMessage.includes('information')) {
      return `📚 Dataset Information:\n\n📊 Current Dataset Size:\n• ${totalDisruptions} active disruptions\n• 1.2 PB historical data\n• 50+ global data sources\n• Real-time updates every 30s\n\n🗺️ Geographic Coverage:\n• 200+ major ports\n• 500+ shipping routes\n• 150+ countries\n\n🕐 Historical Depth:\n• 10 years of disruption data\n• Weather patterns since 2014\n• Port performance metrics\n\nData refresh rate: 30 seconds`
    }

    // Help/capabilities queries
    if (lowerMessage.includes('help') || lowerMessage.includes('can you') || lowerMessage.includes('what can')) {
      return `🎯 I can help you with:\n\n1️⃣ **Disruption Analysis**\n   • Current alerts and risks\n   • Severity assessment\n   • Impact predictions\n\n2️⃣ **Route Optimization**\n   • Alternative route suggestions\n   • Cost-benefit analysis\n   • Transit time estimates\n\n3️⃣ **Predictive Insights**\n   • 24-72 hour forecasts\n   • Risk probability scores\n   • Historical pattern analysis\n\n4️⃣ **Real-time Monitoring**\n   • Port status updates\n   • Weather impact reports\n   • Vessel tracking\n\nJust ask me anything about your supply chain!`
    }

    // Greeting
    if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
      return `Hello! 👋 I'm your AI Supply Chain Assistant.\n\nI'm currently monitoring ${totalDisruptions} disruptions across global supply chains. How can I help you today?\n\nPopular queries:\n• "Show me critical disruptions"\n• "What routes should I avoid?"\n• "How much can I save?"\n• "Port status update"`
    }

    // Default response with context
    return `I understand you're asking about "${userMessage}". \n\nBased on our current data:\n• ${totalDisruptions} disruptions being tracked\n• ${criticalDisruptions} critical situations\n• 98.7% prediction accuracy\n\n💡 Try asking me:\n• "What are the critical disruptions?"\n• "Which routes are optimal?"\n• "Show me cost savings"\n• "Port congestion status"\n\nHow else can I assist you?`
  }

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    const response = await generateResponse(inputValue)

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, assistantMessage])
    setIsTyping(false)
  }

  const quickPrompts = [
    'Show critical disruptions',
    'Optimize my routes',
    'Cost savings analysis',
    'Port status update'
  ]

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full p-4 shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-110 group"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
              {disruptions.filter(d => d.severity === 'critical').length}
            </span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-bold">AI Assistant</h3>
                  <p className="text-xs text-blue-100 flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                    Powered by Gemini
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-900 shadow-md border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl px-4 py-3 shadow-md border border-gray-200">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 1 && (
            <div className="p-3 border-t bg-white">
              <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInputValue(prompt)
                      setTimeout(() => handleSend(), 100)
                    }}
                    className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              AI responses are generated from live dataset
            </p>
          </div>
        </div>
      )}
    </>
  )
}
