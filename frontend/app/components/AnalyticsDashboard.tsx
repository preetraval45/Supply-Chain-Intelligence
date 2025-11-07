'use client'

import { useState, useEffect } from 'react'

interface AnalyticsData {
  disruptionsByType: { [key: string]: number }
  disruptionsBySeverity: { [key: string]: number }
  routePerformance: { route: string; onTime: number; delayed: number }[]
  predictionAccuracy: number[]
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData>({
    disruptionsByType: {
      'Port Congestion': 245,
      'Weather': 189,
      'Infrastructure': 134,
      'Labor Strike': 98,
      'Geopolitical': 76,
      'Cyber Security': 45
    },
    disruptionsBySeverity: {
      'Critical': 87,
      'High': 234,
      'Medium': 312,
      'Low': 154
    },
    routePerformance: [
      { route: 'Shanghai → Los Angeles', onTime: 87, delayed: 13 },
      { route: 'Rotterdam → New York', onTime: 92, delayed: 8 },
      { route: 'Singapore → Hamburg', onTime: 78, delayed: 22 },
      { route: 'Hong Kong → Long Beach', onTime: 85, delayed: 15 },
      { route: 'Busan → Seattle', onTime: 90, delayed: 10 }
    ],
    predictionAccuracy: [94.5, 95.2, 96.1, 97.3, 98.7, 97.9, 98.2, 98.7]
  })

  const totalDisruptions = Object.values(data.disruptionsByType).reduce((a, b) => a + b, 0)
  const avgAccuracy = (data.predictionAccuracy.reduce((a, b) => a + b, 0) / data.predictionAccuracy.length).toFixed(1)

  return (
    <div id="analytics" className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
        <p className="text-sm text-gray-500 mt-1">
          Real-time metrics and performance indicators
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <div className="text-3xl font-bold">{totalDisruptions}</div>
          <div className="text-sm opacity-90">Total Disruptions Predicted</div>
          <div className="text-xs opacity-75 mt-1">Last 30 days</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
          <div className="text-3xl font-bold">{avgAccuracy}%</div>
          <div className="text-sm opacity-90">Prediction Accuracy</div>
          <div className="text-xs opacity-75 mt-1">8-week average</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <div className="text-3xl font-bold">$10.2M</div>
          <div className="text-sm opacity-90">Costs Avoided</div>
          <div className="text-xs opacity-75 mt-1">Via early detection</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white">
          <div className="text-3xl font-bold">48hrs</div>
          <div className="text-sm opacity-90">Average Warning Time</div>
          <div className="text-xs opacity-75 mt-1">Before disruption</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Disruptions by Type */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Disruptions by Type</h3>
          <div className="space-y-3">
            {Object.entries(data.disruptionsByType).map(([type, count]) => {
              const percentage = (count / totalDisruptions * 100).toFixed(1)
              return (
                <div key={type}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{type}</span>
                    <span className="font-semibold text-gray-900">{count} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Disruptions by Severity */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Severity Distribution</h3>
          <div className="flex items-end justify-around h-48">
            {Object.entries(data.disruptionsBySeverity).map(([severity, count]) => {
              const maxCount = Math.max(...Object.values(data.disruptionsBySeverity))
              const height = (count / maxCount * 100)
              const colors = {
                Critical: 'bg-red-500',
                High: 'bg-orange-500',
                Medium: 'bg-yellow-500',
                Low: 'bg-green-500'
              }
              return (
                <div key={severity} className="flex flex-col items-center space-y-2">
                  <div className="text-sm font-bold text-gray-900">{count}</div>
                  <div
                    className={`w-16 ${colors[severity as keyof typeof colors]} rounded-t-lg transition-all hover:opacity-80`}
                    style={{ height: `${height}%` }}
                  />
                  <div className="text-xs text-gray-600">{severity}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Route Performance */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Top Routes Performance</h3>
        <div className="space-y-3">
          {data.routePerformance.map((route) => {
            const total = route.onTime + route.delayed
            const onTimePercent = (route.onTime / total * 100).toFixed(1)
            return (
              <div key={route.route} className="bg-white rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900">{route.route}</span>
                  <span className="text-sm font-semibold text-green-600">{onTimePercent}% On-Time</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="flex h-full">
                    <div
                      className="bg-green-500"
                      style={{ width: `${onTimePercent}%` }}
                    />
                    <div
                      className="bg-red-500"
                      style={{ width: `${100 - parseFloat(onTimePercent)}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Prediction Accuracy Trend */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Prediction Accuracy Trend (8 Weeks)</h3>
        <div className="flex items-end justify-between h-32">
          {data.predictionAccuracy.map((accuracy, index) => {
            const height = accuracy - 90 // Scale from 90-100%
            return (
              <div key={index} className="flex flex-col items-center space-y-1">
                <div className="text-xs font-semibold text-gray-900">{accuracy}%</div>
                <div
                  className="w-12 bg-gradient-to-t from-blue-500 to-indigo-600 rounded-t-lg transition-all hover:opacity-80"
                  style={{ height: `${height * 10}%` }}
                />
                <div className="text-xs text-gray-600">W{index + 1}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
