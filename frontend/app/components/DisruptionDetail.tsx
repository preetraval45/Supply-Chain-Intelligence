'use client'

import { useState } from 'react'

interface DisruptionDetailProps {
  disruption: any
  onClose: () => void
}

export function DisruptionDetail({ disruption, onClose }: DisruptionDetailProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'impact' | 'alternatives' | 'history'>('overview')

  // Generate mock alternative routes
  const alternatives = [
    {
      name: 'Northern Pacific Route',
      distance: '8,450 nm',
      time: '18 days',
      cost: '$12,400',
      savings: '+$2,100',
      delay: '+6 hrs',
      reliability: '96%',
      co2: '245 tons',
      pros: ['Avoids congestion', 'Better weather', 'Lower fuel cost'],
      cons: ['Slightly longer', 'Higher insurance']
    },
    {
      name: 'Southern Express',
      distance: '7,890 nm',
      time: '16 days',
      cost: '$14,200',
      savings: '-$800',
      delay: '-12 hrs',
      reliability: '92%',
      co2: '268 tons',
      pros: ['Faster arrival', 'Direct route'],
      cons: ['Higher cost', 'Weather risk', 'Congestion possible']
    },
    {
      name: 'Multi-Hub Transfer',
      distance: '8,120 nm',
      time: '19 days',
      cost: '$11,900',
      savings: '+$2,600',
      delay: '+18 hrs',
      reliability: '94%',
      co2: '238 tons',
      pros: ['Most cost effective', 'Lowest emissions', 'Flexible timing'],
      cons: ['Multiple stops', 'Longer transit', 'Transfer risk']
    }
  ]

  // Generate historical context
  const historicalData = [
    { date: '2024-02-15', type: 'Port Congestion', duration: '36 hrs', resolved: true },
    { date: '2024-01-28', type: 'Weather Delay', duration: '24 hrs', resolved: true },
    { date: '2023-12-10', type: 'Labor Strike', duration: '72 hrs', resolved: true },
    { date: '2023-11-05', type: 'Port Congestion', duration: '48 hrs', resolved: true }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default: return 'bg-blue-100 text-blue-800 border-blue-300'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl">{disruption.icon || '⚠️'}</span>
                <div>
                  <h2 className="text-2xl font-bold">{disruption.type}</h2>
                  <p className="text-blue-100 text-sm">{disruption.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(disruption.severity)} bg-opacity-90`}>
                  {disruption.severity?.toUpperCase()}
                </span>
                <span className="text-xs text-blue-100">
                  Detected: {new Date().toLocaleString()}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex space-x-1 p-2">
            {(['overview', 'impact', 'alternatives', 'history'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:bg-white hover:bg-opacity-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-240px)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* AI Analysis */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xl">🤖</span>
                  <h3 className="text-sm font-bold text-gray-900">Gemini AI Analysis</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Based on satellite imagery analysis, IoT sensor data from 50+ devices, and real-time news monitoring,
                  this disruption is caused by a combination of <strong>port congestion</strong> (15 vessels waiting)
                  and <strong>adverse weather conditions</strong> (heavy fog reducing visibility to 500m).
                  Historical patterns suggest this will resolve within 24-36 hours, but there's a 67% probability
                  of delays extending to 48 hours if current weather persists.
                </p>
                <div className="mt-3 flex items-center space-x-4">
                  <div className="text-xs">
                    <span className="text-gray-600">Confidence:</span>
                    <span className="ml-1 font-bold text-green-600">87.3%</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-gray-600">Data Sources:</span>
                    <span className="ml-1 font-semibold">Satellite + IoT + News</span>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Affected Vessels</p>
                  <p className="text-2xl font-bold text-blue-600">15</p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Delayed Shipments</p>
                  <p className="text-2xl font-bold text-orange-600">234</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Est. Cost Impact</p>
                  <p className="text-2xl font-bold text-red-600">$1.2M</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Resolution ETA</p>
                  <p className="text-2xl font-bold text-green-600">36hrs</p>
                </div>
              </div>

              {/* Root Cause */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Root Cause Analysis</h3>
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">1️⃣</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Primary: Port Congestion (60%)</p>
                      <p className="text-xs text-gray-600">15 vessels queued, average wait time 48 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">2️⃣</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Secondary: Weather Conditions (30%)</p>
                      <p className="text-xs text-gray-600">Heavy fog, visibility &lt;500m, operations slowed by 40%</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">3️⃣</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Contributing: Labor Shortage (10%)</p>
                      <p className="text-xs text-gray-600">Crane operators at 75% capacity due to flu outbreak</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'impact' && (
            <div className="space-y-6">
              {/* Geographic Impact */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Geographic Impact Radius</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700">Direct Impact (0-100km)</span>
                    <span className="text-sm font-bold text-red-600">12 facilities</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700">Regional Impact (100-500km)</span>
                    <span className="text-sm font-bold text-orange-600">45 facilities</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-700">Global Supply Chain</span>
                    <span className="text-sm font-bold text-yellow-600">200+ routes</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
              </div>

              {/* Stakeholder Notifications */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Stakeholder Notifications</h3>
                <div className="space-y-2">
                  {[
                    { stakeholder: 'Maersk Line', status: 'Notified', time: '2 mins ago', channel: 'Email + SMS' },
                    { stakeholder: 'DHL Logistics', status: 'Acknowledged', time: '5 mins ago', channel: 'Slack' },
                    { stakeholder: 'Port Authority', status: 'Notified', time: '8 mins ago', channel: 'API' },
                    { stakeholder: 'Customs Office', status: 'Pending', time: 'In queue', channel: 'Email' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <div className={`h-2 w-2 rounded-full ${
                          item.status === 'Acknowledged' ? 'bg-green-500' :
                            item.status === 'Notified' ? 'bg-blue-500' : 'bg-yellow-500'
                        }`} />
                        <span className="text-sm font-medium text-gray-900">{item.stakeholder}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-gray-700">{item.status}</p>
                        <p className="text-xs text-gray-500">{item.time} • {item.channel}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Impact */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Financial Impact Breakdown</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Delay Penalties</p>
                    <p className="text-xl font-bold text-red-600">$487K</p>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Storage Fees</p>
                    <p className="text-xl font-bold text-orange-600">$234K</p>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Rerouting Costs</p>
                    <p className="text-xl font-bold text-yellow-600">$342K</p>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <p className="text-xs text-gray-600 mb-1">Opportunity Loss</p>
                    <p className="text-xl font-bold text-purple-600">$187K</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'alternatives' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-blue-900">
                  <strong>AI Recommendation:</strong> Based on cost, time, and reliability factors,
                  we recommend <strong>Multi-Hub Transfer</strong> route. This option provides the best
                  balance of cost savings ($2,600) and reliability (94%), with minimal environmental impact.
                </p>
              </div>

              {alternatives.map((alt, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-base font-bold text-gray-900">{alt.name}</h4>
                      <p className="text-xs text-gray-600">Route Option {index + 1}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      index === 2 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {index === 2 ? '✓ Recommended' : 'Alternative'}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-600">Distance</p>
                      <p className="text-sm font-bold text-gray-900">{alt.distance}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Transit Time</p>
                      <p className="text-sm font-bold text-gray-900">{alt.time}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Cost</p>
                      <p className="text-sm font-bold text-gray-900">{alt.cost}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Reliability</p>
                      <p className="text-sm font-bold text-gray-900">{alt.reliability}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3 pt-3 border-t border-gray-200">
                    <div className={`text-center p-2 rounded ${alt.savings.startsWith('+') ? 'bg-green-50' : 'bg-red-50'}`}>
                      <p className="text-xs text-gray-600">Savings</p>
                      <p className={`text-sm font-bold ${alt.savings.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {alt.savings}
                      </p>
                    </div>
                    <div className="text-center p-2 rounded bg-blue-50">
                      <p className="text-xs text-gray-600">Delay</p>
                      <p className="text-sm font-bold text-blue-600">{alt.delay}</p>
                    </div>
                    <div className="text-center p-2 rounded bg-green-50">
                      <p className="text-xs text-gray-600">CO2</p>
                      <p className="text-sm font-bold text-green-600">{alt.co2}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-semibold text-green-700 mb-1">✓ Pros</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {alt.pros.map((pro, i) => <li key={i}>• {pro}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-red-700 mb-1">✗ Cons</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {alt.cons.map((con, i) => <li key={i}>• {con}</li>)}
                      </ul>
                    </div>
                  </div>

                  <button className="mt-3 w-full bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Select This Route
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-gray-900">
                  <strong>Historical Pattern:</strong> This location has experienced <strong>12 similar disruptions</strong> in
                  the past 6 months. Average resolution time: <strong>32 hours</strong>. Peak disruption times:
                  <strong> Monday 8-10 AM</strong> and <strong>Friday 4-6 PM</strong>.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Recent Disruption History</h3>
                <div className="space-y-3">
                  {historicalData.map((event, i) => (
                    <div key={i} className="flex items-start space-x-3 bg-gray-50 rounded-lg p-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">📅</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-semibold text-gray-900">{event.type}</p>
                          <span className="text-xs text-green-600 font-semibold">✓ Resolved</span>
                        </div>
                        <p className="text-xs text-gray-600">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          {' • '}Duration: {event.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3">Performance Trends</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-2">Average Resolution Time</p>
                    <p className="text-2xl font-bold text-green-600">32 hrs</p>
                    <p className="text-xs text-green-600 mt-1">↓ 12% improvement vs last quarter</p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-2">Disruption Frequency</p>
                    <p className="text-2xl font-bold text-blue-600">2.1/mo</p>
                    <p className="text-xs text-blue-600 mt-1">↑ 8% increase vs last quarter</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
