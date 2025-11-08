'use client'

import { AIAgentDemo } from '../components/AIAgentDemo'

export default function AgentsPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI Agent Network
            </h1>
            <p className="text-sm text-blue-200 mb-6">
              12 specialized AI agents working 24/7
            </p>

            <div className="flex justify-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-3xl font-bold">12</div>
                <div className="text-sm text-blue-100">Active Agents</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-blue-100">Monitoring</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
                <div className="text-3xl font-bold">99.98%</div>
                <div className="text-sm text-blue-100">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <AIAgentDemo />

        {/* Agent Architecture */}
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">⚙️</span>
            How Our AI Agents Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-l-4 border-blue-500 pl-6 bg-gray-700/30 rounded-r-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">📡</span>
                <h3 className="text-xl font-semibold text-white">1. Data Collection</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Agents continuously collect data from multiple sources including satellite imagery,
                sensor networks, weather systems, news feeds, and shipping data. Over 1TB processed daily.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6 bg-gray-700/30 rounded-r-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🧠</span>
                <h3 className="text-xl font-semibold text-white">2. Intelligent Analysis</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Advanced AI algorithms analyze multimodal data (images, text, sensor readings)
                to identify patterns, predict disruptions, and optimize operations in real-time.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-6 bg-gray-700/30 rounded-r-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">⚡</span>
                <h3 className="text-xl font-semibold text-white">3. Action & Alerts</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Agents automatically notify stakeholders, recommend alternative routes,
                and optimize supply chain operations with 99.8% reliability and instant response.
              </p>
            </div>
          </div>
        </div>

        {/* Agent Capabilities by Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Prediction & Analysis */}
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-xl p-6 border border-blue-700/50 hover:border-blue-600 transition-all">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-3">🔮</span>
              <h3 className="text-xl font-bold text-white">Prediction & Analysis</h3>
            </div>
            <ul className="space-y-2">
              {[
                'Disruption forecasting 24-72hrs ahead',
                'Weather pattern recognition',
                'Port congestion detection',
                'Geopolitical risk assessment',
                'Demand forecasting',
                'Historical trend analysis'
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <svg className="h-5 w-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Optimization & Routing */}
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 rounded-xl p-6 border border-purple-700/50 hover:border-purple-600 transition-all">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-3">⚡</span>
              <h3 className="text-xl font-bold text-white">Optimization & Routing</h3>
            </div>
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
                  <svg className="h-5 w-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Monitoring & Tracking */}
          <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 rounded-xl p-6 border border-green-700/50 hover:border-green-600 transition-all">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-3">🚢</span>
              <h3 className="text-xl font-bold text-white">Monitoring & Tracking</h3>
            </div>
            <ul className="space-y-2">
              {[
                'Real-time vessel tracking',
                'Port status monitoring',
                'Inventory level alerts',
                'Customs clearance tracking',
                'Equipment health monitoring',
                'Supply chain visibility'
              ].map((item, i) => (
                <li key={i} className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-2xl p-8 text-white border border-blue-500">
          <h2 className="text-3xl font-bold mb-6 text-center">Agent Performance Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-4xl font-bold mb-2">12,450</div>
              <div className="text-sm text-blue-100">Tasks Coordinated Daily</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-4xl font-bold mb-2">98.7%</div>
              <div className="text-sm text-blue-100">Prediction Accuracy</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-4xl font-bold mb-2">$4.2M</div>
              <div className="text-sm text-blue-100">Cost Savings/Month</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-4xl font-bold mb-2">99.98%</div>
              <div className="text-sm text-blue-100">System Uptime</div>
            </div>
          </div>
        </div>

        {/* Agent Coordination */}
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">🔗</span>
            Agent Coordination & Communication
          </h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Our 12 specialized agents work together as a coordinated network, sharing insights
            and collaborating on complex decisions. Each agent focuses on its specific domain
            while contributing to the overall supply chain intelligence system.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-700/50 rounded-xl p-5 border border-gray-600 hover:border-gray-500 transition-all">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <span className="text-xl">🔄</span>
                Real-Time Synchronization
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Agents share data and insights instantly, ensuring all decisions are based on
                the most current information across the entire supply chain network.
              </p>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-5 border border-gray-600 hover:border-gray-500 transition-all">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <span className="text-xl">🎯</span>
                Intelligent Task Distribution
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                The coordinator agent automatically assigns tasks to the most appropriate
                specialized agent based on expertise and current workload.
              </p>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-5 border border-gray-600 hover:border-gray-500 transition-all">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <span className="text-xl">⚖️</span>
                Consensus Decision Making
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                For critical decisions, multiple agents contribute their analysis to reach
                a consensus recommendation with higher confidence levels.
              </p>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-5 border border-gray-600 hover:border-gray-500 transition-all">
              <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
                <span className="text-xl">📈</span>
                Continuous Learning
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Agents learn from each other's successes and challenges, continuously
                improving their performance and expanding their capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
