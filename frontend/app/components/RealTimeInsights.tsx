'use client'

import { useState, useEffect } from 'react'

interface InsightMetric {
  label: string
  value: string
  change: string
  trend: 'up' | 'down' | 'stable'
  icon: string
}

export function RealTimeInsights({ disruptions }: { disruptions: any[] }) {
  const [metrics, setMetrics] = useState<InsightMetric[]>([])

  useEffect(() => {
    // Calculate real-time metrics from disruption data
    const criticalCount = disruptions.filter(d => d.severity === 'critical').length
    const highCount = disruptions.filter(d => d.severity === 'high').length

    // Calculate average port wait time (simulated)
    const avgWaitTime = Math.floor(Math.random() * 20) + 25 // 25-45 hours

    // Active weather events
    const weatherEvents = Math.floor(Math.random() * 5) + 3 // 3-8 events

    // Vessels in transit
    const vesselsInTransit = 847 + Math.floor(Math.random() * 100) - 50 // ~800-900

    // Customs delays
    const customsDelays = Math.floor(Math.random() * 30) + 45 // 45-75

    // Container rates trend
    const containerRate = '$' + (2400 + Math.floor(Math.random() * 200)).toLocaleString()

    // Fuel price
    const fuelPrice = '$' + (580 + Math.floor(Math.random() * 40)).toFixed(2)

    // CO2 emissions today
    const co2Emissions = (1200 + Math.floor(Math.random() * 200)).toLocaleString() + ' tons'

    const newMetrics: InsightMetric[] = [
      {
        label: 'Avg Port Wait Time',
        value: `${avgWaitTime}hrs`,
        change: avgWaitTime > 35 ? '+12%' : '-5%',
        trend: avgWaitTime > 35 ? 'up' : 'down',
        icon: '⏱️'
      },
      {
        label: 'Vessels In Transit',
        value: vesselsInTransit.toLocaleString(),
        change: '+23',
        trend: 'up',
        icon: '🚢'
      },
      {
        label: 'Active Weather Events',
        value: weatherEvents.toString(),
        change: weatherEvents > 5 ? '+2' : '-1',
        trend: weatherEvents > 5 ? 'up' : 'down',
        icon: '🌦️'
      },
      {
        label: 'Customs Delays',
        value: `${customsDelays} ports`,
        change: customsDelays > 60 ? '+8' : '-4',
        trend: customsDelays > 60 ? 'up' : 'down',
        icon: '📋'
      },
      {
        label: 'Container Rate (TEU)',
        value: containerRate,
        change: '+3.2%',
        trend: 'up',
        icon: '💰'
      },
      {
        label: 'Fuel Price/MT',
        value: fuelPrice,
        change: '-1.8%',
        trend: 'down',
        icon: '⛽'
      },
      {
        label: 'CO2 Emissions Today',
        value: co2Emissions,
        change: '-15%',
        trend: 'down',
        icon: '🌍'
      },
      {
        label: 'Critical Disruptions',
        value: criticalCount.toString(),
        change: criticalCount > 50 ? '+' + (criticalCount - 50) : '-' + (50 - criticalCount),
        trend: criticalCount > 50 ? 'up' : 'down',
        icon: '🔴'
      }
    ]

    setMetrics(newMetrics)
  }, [disruptions])

  // Update metrics every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        return prev.map(metric => {
          // Randomly update some values slightly
          if (Math.random() > 0.7) {
            const currentValue = parseInt(metric.value.replace(/[^0-9]/g, ''))
            if (!isNaN(currentValue)) {
              const change = Math.floor(Math.random() * 5) - 2
              const newValue = currentValue + change
              return {
                ...metric,
                value: metric.value.includes('$')
                  ? '$' + newValue.toLocaleString()
                  : metric.value.includes('hrs')
                    ? newValue + 'hrs'
                    : metric.value.includes('tons')
                      ? newValue.toLocaleString() + ' tons'
                      : metric.value.includes('ports')
                        ? newValue + ' ports'
                        : newValue.toLocaleString()
              }
            }
          }
          return metric
        })
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Real-Time Market Intelligence</h2>
          <p className="text-sm text-gray-400 mt-1">
            Live updates every 5 seconds • Global supply chain metrics
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-green-900/30 text-green-400 px-3 py-1.5 rounded-lg border border-green-600">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold">LIVE</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg p-4 border border-gray-600 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">{metric.icon}</span>
                  <p className="text-xs text-gray-300 font-medium">{metric.label}</p>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
                <div className="flex items-center space-x-1">
                  <span
                    className={`text-xs font-semibold ${
                      metric.trend === 'up'
                        ? 'text-red-600'
                        : metric.trend === 'down'
                        ? 'text-green-600'
                        : 'text-gray-600'
                    }`}
                  >
                    {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'} {metric.change}
                  </span>
                  <span className="text-xs text-gray-400">vs yesterday</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Predictive Alerts Section */}
      <div className="mt-6 bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-700 rounded-lg p-4">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center">
          <span className="text-lg mr-2">⚡</span>
          Predictive Alerts - Next 24-72 Hours
        </h3>
        <div className="space-y-2">
          <div className="flex items-start space-x-3 bg-gray-900/50 rounded-lg p-3 border border-gray-700">
            <span className="text-xl">🌀</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">High Probability: Port Congestion</p>
              <p className="text-xs text-gray-300">Port of Shanghai - Expected in 36 hours • Confidence: 87%</p>
              <p className="text-xs text-blue-400 mt-1">Recommended: Reroute via Ningbo-Zhoushan (+8hrs, saves $15K)</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 bg-gray-900/50 rounded-lg p-3 border border-gray-700">
            <span className="text-xl">🌊</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Weather Impact: Tropical Storm Delta</p>
              <p className="text-xs text-gray-300">Caribbean routes - ETA 48 hours • Affects 124 shipments</p>
              <p className="text-xs text-blue-400 mt-1">Recommended: Delay departure by 72hrs or use Panama alternate route</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 bg-gray-900/50 rounded-lg p-3 border border-gray-700">
            <span className="text-xl">📈</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Cost Opportunity: Fuel Price Drop</p>
              <p className="text-xs text-gray-300">Singapore bunker fuel - Expected 5% decrease in 24hrs</p>
              <p className="text-xs text-blue-400 mt-1">Recommended: Delay refueling, potential savings: $28K per vessel</p>
            </div>
          </div>
        </div>
      </div>

      {/* Market Intelligence */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-xs font-bold text-blue-900 mb-2">Top Performing Routes</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-700">Shanghai → LA</span>
              <span className="text-xs font-semibold text-green-600">98.2% On-time</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-700">Rotterdam → NY</span>
              <span className="text-xs font-semibold text-green-600">97.8% On-time</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-700">Singapore → Dubai</span>
              <span className="text-xs font-semibold text-green-600">96.5% On-time</span>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="text-xs font-bold text-red-900 mb-2">High Risk Corridors</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-700">Suez Canal</span>
              <span className="text-xs font-semibold text-red-600">High Congestion</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-700">South China Sea</span>
              <span className="text-xs font-semibold text-orange-600">Weather Alert</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-700">Horn of Africa</span>
              <span className="text-xs font-semibold text-yellow-600">Security Risk</span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-xs font-bold text-green-900 mb-2">Cost Savings Today</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-700">Route Optimization</span>
              <span className="text-xs font-semibold text-green-600">$847K</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-700">Fuel Efficiency</span>
              <span className="text-xs font-semibold text-green-600">$523K</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-700">Avoided Delays</span>
              <span className="text-xs font-semibold text-green-600">$1.2M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
