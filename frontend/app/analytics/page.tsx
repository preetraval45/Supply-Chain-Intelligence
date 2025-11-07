'use client'

import { AnalyticsDashboard } from '../components/AnalyticsDashboard'

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Analytics & Insights
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Comprehensive supply chain metrics and performance indicators powered by big data
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">1TB+</div>
                <div className="text-sm text-blue-100">Data Processed Daily</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm text-blue-100">Data Sources</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">Real-time</div>
                <div className="text-sm text-blue-100">Updates</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnalyticsDashboard />

        {/* Additional Insights */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ROI Calculator */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">ROI Impact Calculator</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm text-gray-600">Annual Logistics Cost</span>
                <span className="text-lg font-bold text-gray-900">$50M</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm text-gray-600">Disruptions Prevented</span>
                <span className="text-lg font-bold text-blue-600">142</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm text-gray-600">Avg Cost per Disruption</span>
                <span className="text-lg font-bold text-gray-900">$87,000</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm text-gray-600">Time Saved (Hours)</span>
                <span className="text-lg font-bold text-gray-900">3,420</span>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Total Savings</span>
                  <span className="text-2xl font-bold text-green-600">$12.4M</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">24.8% improvement in efficiency</div>
              </div>
            </div>
          </div>

          {/* Global Coverage */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Global Coverage</h3>
            <div className="space-y-3">
              {[
                { region: 'North America', ports: 45, routes: 234, status: 'Excellent' },
                { region: 'Europe', ports: 67, routes: 412, status: 'Good' },
                { region: 'Asia Pacific', ports: 89, routes: 678, status: 'Excellent' },
                { region: 'Middle East', ports: 23, routes: 156, status: 'Good' },
                { region: 'Latin America', ports: 34, routes: 201, status: 'Fair' }
              ].map((area) => (
                <div key={area.region} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">{area.region}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      area.status === 'Excellent' ? 'bg-green-100 text-green-700' :
                      area.status === 'Good' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {area.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{area.ports} Ports Monitored</span>
                    <span>{area.routes} Active Routes</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Sources */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Sources & Integration</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Satellite Imagery', count: '15 satellites', icon: '🛰️' },
              { name: 'IoT Sensors', count: '50,000+ devices', icon: '📡' },
              { name: 'Weather APIs', count: '3 providers', icon: '🌦️' },
              { name: 'News Feeds', count: '100+ sources', icon: '📰' },
              { name: 'Shipping Data', count: '500+ carriers', icon: '🚢' },
              { name: 'Port Systems', count: '200+ ports', icon: '⚓' },
              { name: 'Traffic Data', count: 'Global coverage', icon: '🚦' },
              { name: 'Social Media', count: 'Real-time', icon: '💬' },
              { name: 'Financial Data', count: '20+ markets', icon: '💹' },
              { name: 'Government APIs', count: '50+ countries', icon: '🏛️' }
            ].map((source) => (
              <div key={source.name} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl mb-2">{source.icon}</div>
                <div className="font-semibold text-gray-900 text-sm">{source.name}</div>
                <div className="text-xs text-gray-500 mt-1">{source.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-2xl font-bold mb-6">System Performance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">99.9%</div>
              <div className="text-sm text-blue-100 mt-1">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">&lt;2s</div>
              <div className="text-sm text-blue-100 mt-1">Avg Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-sm text-blue-100 mt-1">Requests/min</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">1.2PB</div>
              <div className="text-sm text-blue-100 mt-1">Total Data Storage</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
