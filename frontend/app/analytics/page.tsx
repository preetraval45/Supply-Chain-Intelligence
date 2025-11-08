'use client'

import { AdvancedAnalytics } from '../components/AdvancedAnalytics'

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      {/* Compact Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Analytics & Insights
              </h1>
              <p className="text-sm text-gray-300 mt-1">Real-time supply chain intelligence</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
                <div className="text-2xl font-bold text-blue-400">1TB+</div>
                <div className="text-xs text-gray-300">Data/Day</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
                <div className="text-2xl font-bold text-purple-400">50+</div>
                <div className="text-xs text-gray-300">Sources</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20">
                <div className="text-2xl font-bold text-green-400">Live</div>
                <div className="text-xs text-gray-300">Updates</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Compact */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Advanced Analytics Dashboard */}
        <AdvancedAnalytics />

        {/* Compact Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
          {/* ROI Calculator - Compact */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-700 hover:border-green-600 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-green-500/20 p-2 rounded">
                <svg className="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">ROI Impact</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Disruptions Prevented</span>
                <span className="font-bold text-blue-400">142</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Time Saved</span>
                <span className="font-bold text-white">3,420hrs</span>
              </div>
              <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-lg p-3 mt-2 border border-green-500/30">
                <div className="text-xs text-gray-400">Total Savings</div>
                <div className="text-2xl font-bold text-green-400">$12.4M</div>
                <div className="text-xs text-gray-400 mt-1">24.8% efficiency gain</div>
              </div>
            </div>
          </div>

          {/* System Performance */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-700 hover:border-blue-600 transition-all">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-blue-500/20 p-2 rounded">
                <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Performance</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center bg-gray-700/50 rounded p-2">
                <div className="text-xl font-bold text-green-400">99.9%</div>
                <div className="text-xs text-gray-400">Uptime</div>
              </div>
              <div className="text-center bg-gray-700/50 rounded p-2">
                <div className="text-xl font-bold text-blue-400">&lt;2s</div>
                <div className="text-xs text-gray-400">Response</div>
              </div>
              <div className="text-center bg-gray-700/50 rounded p-2">
                <div className="text-xl font-bold text-purple-400">10K+</div>
                <div className="text-xs text-gray-400">Req/min</div>
              </div>
              <div className="text-center bg-gray-700/50 rounded p-2">
                <div className="text-xl font-bold text-pink-400">1.2PB</div>
                <div className="text-xs text-gray-400">Storage</div>
              </div>
            </div>
          </div>

          {/* Global Coverage - Compact */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-700 hover:border-indigo-600 transition-all md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-indigo-500/20 p-2 rounded">
                <svg className="h-5 w-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Global Coverage</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
              {[
                { region: 'N. America', ports: 45, routes: 234, status: 'Excellent', color: 'green' },
                { region: 'Europe', ports: 67, routes: 412, status: 'Good', color: 'blue' },
                { region: 'Asia Pacific', ports: 89, routes: 678, status: 'Excellent', color: 'green' },
                { region: 'Middle East', ports: 23, routes: 156, status: 'Good', color: 'blue' },
                { region: 'Lat. America', ports: 34, routes: 201, status: 'Fair', color: 'yellow' }
              ].map((area) => (
                <div key={area.region} className="bg-gray-700/50 rounded p-2 border border-gray-600 hover:border-gray-500 transition-colors">
                  <div className="text-xs font-semibold text-white mb-1">{area.region}</div>
                  <div className={`text-xs px-2 py-0.5 rounded-full font-medium inline-block ${
                    area.color === 'green' ? 'bg-green-500/20 text-green-400' :
                    area.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {area.status}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{area.ports} ports • {area.routes} routes</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Sources - Compact Grid */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-4 mt-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">Data Sources & Integration</h2>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-3">
            {[
              { name: 'Satellite', count: '15', icon: '🛰️', color: 'blue' },
              { name: 'IoT', count: '50K+', icon: '📡', color: 'green' },
              { name: 'Weather', count: '3', icon: '🌦️', color: 'indigo' },
              { name: 'News', count: '100+', icon: '📰', color: 'orange' },
              { name: 'Shipping', count: '500+', icon: '🚢', color: 'teal' },
              { name: 'Ports', count: '200+', icon: '⚓', color: 'blue' },
              { name: 'Traffic', count: 'Global', icon: '🚦', color: 'yellow' },
              { name: 'Social', count: 'Live', icon: '💬', color: 'pink' },
              { name: 'Finance', count: '20+', icon: '💹', color: 'green' },
              { name: 'Gov', count: '50+', icon: '🏛️', color: 'purple' }
            ].map((source) => (
              <div key={source.name} className="bg-gray-700/30 rounded-lg p-2 text-center hover:bg-gray-700/50 transition-all border border-gray-600 hover:scale-105">
                <div className="text-2xl mb-1">{source.icon}</div>
                <div className="text-xs font-semibold text-white">{source.name}</div>
                <div className="text-xs text-gray-400">{source.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
