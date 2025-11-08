'use client'

import { AdvancedAnalytics } from '../components/AdvancedAnalytics'

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-16 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Analytics & Insights
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Comprehensive supply chain metrics powered by AI and real-time data analysis
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-6 border border-white/20">
                <div className="text-4xl font-bold text-blue-400">1TB+</div>
                <div className="text-sm text-gray-300 mt-2">Data Processed Daily</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-6 border border-white/20">
                <div className="text-4xl font-bold text-purple-400">50+</div>
                <div className="text-sm text-gray-300 mt-2">Data Sources</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-8 py-6 border border-white/20">
                <div className="text-4xl font-bold text-green-400">Real-time</div>
                <div className="text-sm text-gray-300 mt-2">Updates</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Advanced Analytics Dashboard */}
        <div className="mb-12">
          <AdvancedAnalytics />
        </div>

        {/* Additional Insights - Improved Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* ROI Calculator */}
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
            <div className="flex items-center mb-6">
              <div className="bg-green-500/20 p-3 rounded-lg mr-4">
                <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">ROI Impact Calculator</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Annual Logistics Cost</span>
                <span className="text-xl font-bold text-white">$50M</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Disruptions Prevented</span>
                <span className="text-xl font-bold text-blue-400">142</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Avg Cost per Disruption</span>
                <span className="text-xl font-bold text-white">$87,000</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-700">
                <span className="text-gray-400">Time Saved (Hours)</span>
                <span className="text-xl font-bold text-white">3,420</span>
              </div>
              <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-xl p-6 mt-6 border border-green-500/30">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-300">Total Savings</span>
                  <span className="text-3xl font-bold text-green-400">$12.4M</span>
                </div>
                <div className="text-sm text-gray-400 mt-2">24.8% improvement in efficiency</div>
              </div>
            </div>
          </div>

          {/* Global Coverage */}
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-700">
            <div className="flex items-center mb-6">
              <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                <svg className="h-8 w-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white">Global Coverage</h3>
            </div>
            <div className="space-y-4">
              {[
                { region: 'North America', ports: 45, routes: 234, status: 'Excellent', color: 'green' },
                { region: 'Europe', ports: 67, routes: 412, status: 'Good', color: 'blue' },
                { region: 'Asia Pacific', ports: 89, routes: 678, status: 'Excellent', color: 'green' },
                { region: 'Middle East', ports: 23, routes: 156, status: 'Good', color: 'blue' },
                { region: 'Latin America', ports: 34, routes: 201, status: 'Fair', color: 'yellow' }
              ].map((area) => (
                <div key={area.region} className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-white text-lg">{area.region}</span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      area.color === 'green' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      area.color === 'blue' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {area.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{area.ports} Ports Monitored</span>
                    <span>{area.routes} Active Routes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="bg-gray-800 rounded-xl shadow-2xl p-8 mb-12 border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Data Sources & Integration</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { name: 'Satellite Imagery', count: '15 satellites', icon: '🛰️', gradient: 'from-blue-500 to-cyan-500' },
              { name: 'IoT Sensors', count: '50,000+ devices', icon: '📡', gradient: 'from-green-500 to-emerald-500' },
              { name: 'Weather APIs', count: '3 providers', icon: '🌦️', gradient: 'from-indigo-500 to-purple-500' },
              { name: 'News Feeds', count: '100+ sources', icon: '📰', gradient: 'from-orange-500 to-red-500' },
              { name: 'Shipping Data', count: '500+ carriers', icon: '🚢', gradient: 'from-teal-500 to-cyan-500' },
              { name: 'Port Systems', count: '200+ ports', icon: '⚓', gradient: 'from-blue-600 to-indigo-600' },
              { name: 'Traffic Data', count: 'Global coverage', icon: '🚦', gradient: 'from-yellow-500 to-orange-500' },
              { name: 'Social Media', count: 'Real-time', icon: '💬', gradient: 'from-pink-500 to-rose-500' },
              { name: 'Financial Data', count: '20+ markets', icon: '💹', gradient: 'from-green-600 to-teal-600' },
              { name: 'Government APIs', count: '50+ countries', icon: '🏛️', gradient: 'from-purple-600 to-indigo-600' }
            ].map((source) => (
              <div key={source.name} className={`bg-gradient-to-br ${source.gradient} bg-opacity-10 rounded-xl p-6 text-center hover:scale-105 transition-transform border border-gray-700`}>
                <div className="text-4xl mb-3">{source.icon}</div>
                <div className="font-semibold text-white text-sm mb-1">{source.name}</div>
                <div className="text-xs text-gray-400">{source.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 rounded-xl shadow-2xl p-10 text-white border border-gray-700">
          <h2 className="text-3xl font-bold mb-8 text-center">System Performance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-400 mb-2">99.9%</div>
              <div className="text-sm text-gray-300">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-400 mb-2">&lt;2s</div>
              <div className="text-sm text-gray-300">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-400 mb-2">10K+</div>
              <div className="text-sm text-gray-300">Requests/min</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-pink-400 mb-2">1.2PB</div>
              <div className="text-sm text-gray-300">Total Data Storage</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
