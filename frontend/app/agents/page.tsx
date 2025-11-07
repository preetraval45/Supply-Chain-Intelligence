'use client'

import { AIAgentDemo } from '../components/AIAgentDemo'

export default function AgentsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI Agent Network
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Three specialized AI agents working 24/7 to protect your supply chain
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">3</div>
                <div className="text-sm text-blue-100">Active Agents</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-blue-100">Monitoring</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">Real-time</div>
                <div className="text-sm text-blue-100">Analysis</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AIAgentDemo />

        {/* Agent Architecture */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How Our AI Agents Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Data Collection</h3>
              <p className="text-sm text-gray-600">
                Agents continuously collect data from satellite imagery, IoT sensors, weather APIs,
                news sources, and shipping manifests. Over 1TB of data processed daily.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. AI Analysis</h3>
              <p className="text-sm text-gray-600">
                Google Gemini 1.5 Pro analyzes multimodal data (images, text, sensor readings)
                using NVIDIA L4 GPU acceleration for 40x faster processing.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Action & Alerts</h3>
              <p className="text-sm text-gray-600">
                Agents automatically notify stakeholders, reroute shipments, and optimize
                supply chain operations in real-time with 99.8% reliability.
              </p>
            </div>
          </div>
        </div>

        {/* Agent Capabilities */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Prediction Agent Capabilities</h3>
            <ul className="space-y-2">
              {[
                'Satellite imagery analysis (10m resolution)',
                'Weather pattern recognition',
                'Port congestion detection',
                'Geopolitical risk assessment',
                'Machine learning trend analysis',
                'Historical data correlation'
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Optimization Agent Capabilities</h3>
            <ul className="space-y-2">
              {[
                'Dynamic route optimization',
                'Multi-modal transport planning',
                'Cost-benefit analysis',
                'Real-time traffic monitoring',
                'Fuel efficiency optimization',
                'Carbon footprint reduction'
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <svg className="h-5 w-5 text-purple-600 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Google Gemini 1.5 Pro', icon: '🤖', desc: 'Multimodal AI' },
              { name: 'NVIDIA L4 GPU', icon: '⚡', desc: '40x Faster Processing' },
              { name: 'TensorFlow', icon: '🧠', desc: 'ML Framework' },
              { name: 'Cloud Run', icon: '☁️', desc: 'Serverless' },
              { name: 'Python FastAPI', icon: '🚀', desc: 'Backend' },
              { name: 'PostgreSQL', icon: '🐘', desc: 'Database' },
              { name: 'Socket.IO', icon: '🔌', desc: 'Real-time' },
              { name: 'Next.js', icon: '▲', desc: 'Frontend' }
            ].map((tech) => (
              <div key={tech.name} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-2">{tech.icon}</div>
                <div className="font-semibold text-gray-900 text-sm">{tech.name}</div>
                <div className="text-xs text-gray-500 mt-1">{tech.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
