'use client'

import { useState, useEffect } from 'react'

interface Route {
  id: string
  name: string
  origin: string
  destination: string
  distance: string
  duration: string
  status: 'active' | 'delayed' | 'disrupted' | 'optimal'
  vessels: number
  cargo: string
  reliability: number
}

interface AgentActivity {
  id: string
  timestamp: Date
  agent: string
  action: string
  route: string
  impact: string
  type: 'positive' | 'negative' | 'neutral'
}

export default function RoutesPage() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [compareMode, setCompareMode] = useState(false)
  const [compareRoutes, setCompareRoutes] = useState<Route[]>([])
  const [agentActivities, setAgentActivities] = useState<AgentActivity[]>([])
  const [liveUpdateEnabled, setLiveUpdateEnabled] = useState(true)

  const initialRoutes: Route[] = [
    { id: '1', name: 'Pacific Express', origin: 'Shanghai', destination: 'Los Angeles', distance: '6,500 nm', duration: '14 days', status: 'active', vessels: 12, cargo: '45,000 TEU', reliability: 94 },
    { id: '2', name: 'Atlantic Bridge', origin: 'Rotterdam', destination: 'New York', distance: '3,200 nm', duration: '8 days', status: 'optimal', vessels: 8, cargo: '32,000 TEU', reliability: 98 },
    { id: '3', name: 'Silk Road Maritime', origin: 'Singapore', destination: 'Hamburg', distance: '8,500 nm', duration: '21 days', status: 'delayed', vessels: 15, cargo: '67,000 TEU', reliability: 87 },
    { id: '4', name: 'Trans-Pacific Line', origin: 'Hong Kong', destination: 'Long Beach', distance: '6,700 nm', duration: '15 days', status: 'active', vessels: 10, cargo: '41,000 TEU', reliability: 92 },
    { id: '5', name: 'Nordic Route', origin: 'Busan', destination: 'Seattle', distance: '5,400 nm', duration: '12 days', status: 'optimal', vessels: 6, cargo: '28,000 TEU', reliability: 96 },
    { id: '6', name: 'Mediterranean Express', origin: 'Shanghai', destination: 'Genoa', distance: '9,800 nm', duration: '24 days', status: 'disrupted', vessels: 9, cargo: '38,000 TEU', reliability: 78 },
    { id: '7', name: 'Americas Corridor', origin: 'Santos', destination: 'Miami', distance: '4,200 nm', duration: '10 days', status: 'active', vessels: 5, cargo: '19,000 TEU', reliability: 90 },
    { id: '8', name: 'Middle East Gateway', origin: 'Dubai', destination: 'Rotterdam', distance: '6,100 nm', duration: '16 days', status: 'optimal', vessels: 7, cargo: '31,000 TEU', reliability: 95 },
    { id: '9', name: 'Arctic Passage', origin: 'Shanghai', destination: 'Hamburg', distance: '7,200 nm', duration: '18 days', status: 'active', vessels: 4, cargo: '22,000 TEU', reliability: 89 },
    { id: '10', name: 'Southern Cross', origin: 'Sydney', destination: 'Los Angeles', distance: '6,900 nm', duration: '16 days', status: 'optimal', vessels: 5, cargo: '26,000 TEU', reliability: 93 },
    { id: '11', name: 'Indian Ocean Route', origin: 'Mumbai', destination: 'Singapore', distance: '2,400 nm', duration: '6 days', status: 'active', vessels: 8, cargo: '34,000 TEU', reliability: 91 },
    { id: '12', name: 'Caribbean Link', origin: 'Houston', destination: 'Cartagena', distance: '1,800 nm', duration: '5 days', status: 'optimal', vessels: 4, cargo: '18,000 TEU', reliability: 97 }
  ]

  const [routes, setRoutes] = useState<Route[]>(initialRoutes)

  // AI Agent names
  const aiAgents = [
    'Prediction Agent',
    'Optimization Agent',
    'Weather Agent',
    'Port Monitor',
    'Route Planner',
    'Risk Assessor',
    'Cost Optimizer',
    'Vessel Tracker'
  ]

  // AI Agent actions with their effects
  const agentActions = [
    { action: 'optimized route', reliabilityChange: [2, 5], vesselChange: [0, 2], type: 'positive' as const },
    { action: 'detected congestion', reliabilityChange: [-3, -1], vesselChange: [0, 0], type: 'negative' as const },
    { action: 'rerouted vessels', reliabilityChange: [1, 3], vesselChange: [-2, 1], type: 'positive' as const },
    { action: 'weather warning issued', reliabilityChange: [-5, -2], vesselChange: [0, 0], type: 'negative' as const },
    { action: 'cleared disruption', reliabilityChange: [3, 6], vesselChange: [1, 3], type: 'positive' as const },
    { action: 'added vessels', reliabilityChange: [1, 2], vesselChange: [1, 4], type: 'positive' as const },
    { action: 'reduced congestion', reliabilityChange: [2, 4], vesselChange: [0, 1], type: 'positive' as const },
    { action: 'port delay detected', reliabilityChange: [-4, -1], vesselChange: [0, 0], type: 'negative' as const },
    { action: 'optimized fuel route', reliabilityChange: [1, 3], vesselChange: [0, 0], type: 'positive' as const },
    { action: 'removed vessels', reliabilityChange: [0, 1], vesselChange: [-3, -1], type: 'neutral' as const },
  ]

  // Simulate AI agent activity
  useEffect(() => {
    if (!liveUpdateEnabled) return

    const interval = setInterval(() => {
      // Random AI agent action every 3-6 seconds
      const randomRoute = routes[Math.floor(Math.random() * routes.length)]
      const randomAgent = aiAgents[Math.floor(Math.random() * aiAgents.length)]
      const randomAction = agentActions[Math.floor(Math.random() * agentActions.length)]

      // Calculate changes
      const reliabilityDelta = Math.floor(
        Math.random() * (randomAction.reliabilityChange[1] - randomAction.reliabilityChange[0] + 1) +
        randomAction.reliabilityChange[0]
      )
      const vesselDelta = Math.floor(
        Math.random() * (randomAction.vesselChange[1] - randomAction.vesselChange[0] + 1) +
        randomAction.vesselChange[0]
      )

      // Update routes
      setRoutes(prevRoutes => prevRoutes.map(route => {
        if (route.id === randomRoute.id) {
          const newReliability = Math.max(65, Math.min(99, route.reliability + reliabilityDelta))
          const newVessels = Math.max(1, route.vessels + vesselDelta)

          // Update status based on reliability
          let newStatus: Route['status'] = 'active'
          if (newReliability >= 95) newStatus = 'optimal'
          else if (newReliability < 80) newStatus = 'disrupted'
          else if (newReliability < 85) newStatus = 'delayed'

          return {
            ...route,
            reliability: newReliability,
            vessels: newVessels,
            status: newStatus
          }
        }
        return route
      }))

      // Add activity log
      const impact = reliabilityDelta > 0
        ? `+${reliabilityDelta}% reliability${vesselDelta !== 0 ? `, ${vesselDelta > 0 ? '+' : ''}${vesselDelta} vessels` : ''}`
        : reliabilityDelta < 0
        ? `${reliabilityDelta}% reliability${vesselDelta !== 0 ? `, ${vesselDelta > 0 ? '+' : ''}${vesselDelta} vessels` : ''}`
        : vesselDelta !== 0
        ? `${vesselDelta > 0 ? '+' : ''}${vesselDelta} vessels`
        : 'monitoring'

      const newActivity: AgentActivity = {
        id: Date.now().toString() + Math.random(),
        timestamp: new Date(),
        agent: randomAgent,
        action: randomAction.action,
        route: randomRoute.name,
        impact: impact,
        type: randomAction.type
      }

      setAgentActivities(prev => [newActivity, ...prev].slice(0, 20)) // Keep last 20 activities
    }, Math.random() * 3000 + 3000) // 3-6 seconds

    return () => clearInterval(interval)
  }, [liveUpdateEnabled, routes])

  const toggleCompareRoute = (route: Route) => {
    if (compareRoutes.find(r => r.id === route.id)) {
      setCompareRoutes(compareRoutes.filter(r => r.id !== route.id))
    } else if (compareRoutes.length < 3) {
      setCompareRoutes([...compareRoutes, route])
    }
  }

  const filteredRoutes = filterStatus === 'all'
    ? routes
    : routes.filter(r => r.status === filterStatus)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-900/30 text-green-400 border-green-600'
      case 'active': return 'bg-blue-900/30 text-blue-400 border-blue-600'
      case 'delayed': return 'bg-yellow-900/30 text-yellow-400 border-yellow-600'
      case 'disrupted': return 'bg-red-900/30 text-red-400 border-red-600'
      default: return 'bg-gray-700/30 text-gray-400 border-gray-600'
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'optimal': return '✓ Optimal'
      case 'active': return '● Active'
      case 'delayed': return '⏱ Delayed'
      case 'disrupted': return '⚠ Disrupted'
      default: return status
    }
  }

  return (
    <main className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Route Management
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Monitor and optimize global shipping routes in real-time
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">{routes.length}</div>
                <div className="text-sm text-blue-100">Active Routes</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">{routes.reduce((sum, r) => sum + r.vessels, 0)}</div>
                <div className="text-sm text-blue-100">Total Vessels</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">{Math.round(routes.reduce((sum, r) => sum + r.reliability, 0) / routes.length)}%</div>
                <div className="text-sm text-blue-100">Avg Reliability</div>
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setCompareMode(!compareMode)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  compareMode
                    ? 'bg-white text-blue-600'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {compareMode ? `Comparing ${compareRoutes.length}/3 Routes` : 'Compare Routes'}
              </button>
              <button
                onClick={() => setLiveUpdateEnabled(!liveUpdateEnabled)}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  liveUpdateEnabled
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${liveUpdateEnabled ? 'bg-white animate-pulse' : 'bg-gray-400'}`} />
                {liveUpdateEnabled ? 'Live Updates ON' : 'Live Updates OFF'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-gray-800 rounded-lg shadow-lg p-4 mb-6 border border-gray-700">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
            >
              All Routes ({routes.length})
            </button>
            <button
              onClick={() => setFilterStatus('optimal')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'optimal'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
            >
              Optimal ({routes.filter(r => r.status === 'optimal').length})
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'active'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
            >
              Active ({routes.filter(r => r.status === 'active').length})
            </button>
            <button
              onClick={() => setFilterStatus('delayed')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'delayed'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
            >
              Delayed ({routes.filter(r => r.status === 'delayed').length})
            </button>
            <button
              onClick={() => setFilterStatus('disrupted')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'disrupted'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
            >
              Disrupted ({routes.filter(r => r.status === 'disrupted').length})
            </button>
          </div>
        </div>

        {/* Route Comparison View */}
        {compareMode && compareRoutes.length > 0 && (
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Route Comparison</h2>
              <button
                onClick={() => setCompareRoutes([])}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-600">
                    <th className="text-left py-3 px-4 font-semibold text-gray-300">Metric</th>
                    {compareRoutes.map(route => (
                      <th key={route.id} className="text-left py-3 px-4 font-semibold text-gray-300">{route.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-400">Route</td>
                    {compareRoutes.map(route => (
                      <td key={route.id} className="py-3 px-4 text-sm text-gray-200">{route.origin} → {route.destination}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-700 bg-gray-700/30">
                    <td className="py-3 px-4 font-medium text-gray-400">Distance</td>
                    {compareRoutes.map(route => (
                      <td key={route.id} className="py-3 px-4 font-semibold text-white">{route.distance}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-400">Duration</td>
                    {compareRoutes.map(route => (
                      <td key={route.id} className="py-3 px-4 font-semibold text-white">{route.duration}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-700 bg-gray-700/30">
                    <td className="py-3 px-4 font-medium text-gray-400">Reliability</td>
                    {compareRoutes.map(route => (
                      <td key={route.id} className="py-3 px-4">
                        <span className={`font-semibold ${route.reliability >= 95 ? 'text-green-600' : route.reliability >= 85 ? 'text-blue-600' : 'text-yellow-600'}`}>
                          {route.reliability}%
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-400">Active Vessels</td>
                    {compareRoutes.map(route => (
                      <td key={route.id} className="py-3 px-4 font-semibold text-white">{route.vessels}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-700 bg-gray-700/30">
                    <td className="py-3 px-4 font-medium text-gray-400">Total Cargo</td>
                    {compareRoutes.map(route => (
                      <td key={route.id} className="py-3 px-4 font-semibold text-white">{route.cargo}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium text-gray-400">Status</td>
                    {compareRoutes.map(route => (
                      <td key={route.id} className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(route.status)}`}>
                          {getStatusBadge(route.status)}
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-blue-900/30">
                    <td className="py-3 px-4 font-medium text-gray-300">AI Recommendation</td>
                    {compareRoutes.map(route => {
                      const bestRoute = compareRoutes.reduce((best, r) => r.reliability > best.reliability ? r : best)
                      return (
                        <td key={route.id} className="py-3 px-4 text-sm">
                          {route.id === bestRoute.id ? (
                            <span className="text-green-600 font-semibold">✓ Best Choice</span>
                          ) : route.reliability >= 90 ? (
                            <span className="text-blue-600">Good Alternative</span>
                          ) : (
                            <span className="text-gray-600">Consider alternatives</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AI Agent Activity Feed */}
        {liveUpdateEnabled && agentActivities.length > 0 && (
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
                Live AI Agent Activity
              </h2>
              <span className="text-sm text-gray-400">{agentActivities.length} recent actions</span>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {agentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className={`p-3 rounded-lg border-l-4 transition-all ${
                    activity.type === 'positive'
                      ? 'bg-green-900/20 border-green-500'
                      : activity.type === 'negative'
                      ? 'bg-red-900/20 border-red-500'
                      : 'bg-blue-900/20 border-blue-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{activity.agent}</span>
                        <span className="text-sm text-gray-300">{activity.action}</span>
                      </div>
                      <div className="text-sm text-gray-200 mt-1">
                        <span className="font-medium">{activity.route}</span>
                        <span className="mx-2">→</span>
                        <span className={`font-semibold ${
                          activity.type === 'positive' ? 'text-green-600' :
                          activity.type === 'negative' ? 'text-red-600' :
                          'text-blue-600'
                        }`}>
                          {activity.impact}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Routes List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredRoutes.map((route) => (
              <div
                key={route.id}
                onClick={() => compareMode ? toggleCompareRoute(route) : setSelectedRoute(route)}
                className={`bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl border border-gray-700 hover:border-gray-600 ${
                  compareMode
                    ? compareRoutes.find(r => r.id === route.id) ? 'ring-2 ring-green-500' : ''
                    : selectedRoute?.id === route.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white">{route.name}</h3>
                      {liveUpdateEnabled && (
                        <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" title="Live updates active"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {route.origin} → {route.destination}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(route.status)}`}>
                    {getStatusBadge(route.status)}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-gray-400">Distance</div>
                    <div className="font-semibold text-white">{route.distance}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Duration</div>
                    <div className="font-semibold text-white">{route.duration}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Vessels</div>
                    <div className="font-semibold text-white">{route.vessels} active</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Reliability</div>
                    <div className="font-semibold text-white">{route.reliability}%</div>
                  </div>
                </div>

                {/* Reliability Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        route.reliability >= 95 ? 'bg-green-500' :
                        route.reliability >= 85 ? 'bg-blue-500' :
                        route.reliability >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${route.reliability}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Route Details Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 sticky top-4 border border-gray-700">
              {selectedRoute ? (
                <>
                  <h3 className="text-xl font-bold text-white mb-4">Route Details</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-400">Route Name</div>
                      <div className="text-lg text-white">{selectedRoute.name}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-400">Origin Port</div>
                      <div className="text-lg text-white">{selectedRoute.origin}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-400">Destination Port</div>
                      <div className="text-lg text-white">{selectedRoute.destination}</div>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-sm font-semibold text-gray-400 mb-2">Performance Metrics</div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Total Distance</span>
                          <span className="font-semibold text-white">{selectedRoute.distance}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Avg Duration</span>
                          <span className="font-semibold text-white">{selectedRoute.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Active Vessels</span>
                          <span className="font-semibold text-white">{selectedRoute.vessels}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Total Cargo</span>
                          <span className="font-semibold text-white">{selectedRoute.cargo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-400">Reliability Score</span>
                          <span className="font-semibold text-white">{selectedRoute.reliability}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-sm font-semibold text-gray-400 mb-2">AI Recommendations</div>
                      <div className="bg-blue-900/30 rounded-lg p-3 text-sm text-gray-200 border border-blue-800">
                        {selectedRoute.status === 'optimal' && '✓ Route is performing optimally. Continue current operations.'}
                        {selectedRoute.status === 'active' && '→ Route is stable. Monitor for weather changes.'}
                        {selectedRoute.status === 'delayed' && '⏱ Consider alternative routes. Expected delay: 2-3 days.'}
                        {selectedRoute.status === 'disrupted' && '⚠ Immediate action required. Reroute recommended.'}
                      </div>
                    </div>
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Optimize Route
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p>Select a route to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
