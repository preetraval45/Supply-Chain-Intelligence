'use client'

import { useState } from 'react'

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

export default function RoutesPage() {
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const routes: Route[] = [
    { id: '1', name: 'Pacific Express', origin: 'Shanghai', destination: 'Los Angeles', distance: '6,500 nm', duration: '14 days', status: 'active', vessels: 12, cargo: '45,000 TEU', reliability: 94 },
    { id: '2', name: 'Atlantic Bridge', origin: 'Rotterdam', destination: 'New York', distance: '3,200 nm', duration: '8 days', status: 'optimal', vessels: 8, cargo: '32,000 TEU', reliability: 98 },
    { id: '3', name: 'Silk Road Maritime', origin: 'Singapore', destination: 'Hamburg', distance: '8,500 nm', duration: '21 days', status: 'delayed', vessels: 15, cargo: '67,000 TEU', reliability: 87 },
    { id: '4', name: 'Trans-Pacific Line', origin: 'Hong Kong', destination: 'Long Beach', distance: '6,700 nm', duration: '15 days', status: 'active', vessels: 10, cargo: '41,000 TEU', reliability: 92 },
    { id: '5', name: 'Nordic Route', origin: 'Busan', destination: 'Seattle', distance: '5,400 nm', duration: '12 days', status: 'optimal', vessels: 6, cargo: '28,000 TEU', reliability: 96 },
    { id: '6', name: 'Mediterranean Express', origin: 'Shanghai', destination: 'Genoa', distance: '9,800 nm', duration: '24 days', status: 'disrupted', vessels: 9, cargo: '38,000 TEU', reliability: 78 },
    { id: '7', name: 'Americas Corridor', origin: 'Santos', destination: 'Miami', distance: '4,200 nm', duration: '10 days', status: 'active', vessels: 5, cargo: '19,000 TEU', reliability: 90 },
    { id: '8', name: 'Middle East Gateway', origin: 'Dubai', destination: 'Rotterdam', distance: '6,100 nm', duration: '16 days', status: 'optimal', vessels: 7, cargo: '31,000 TEU', reliability: 95 }
  ]

  const filteredRoutes = filterStatus === 'all'
    ? routes
    : routes.filter(r => r.status === filterStatus)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-100 text-green-700 border-green-300'
      case 'active': return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'delayed': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'disrupted': return 'bg-red-100 text-red-700 border-red-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-12">
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
                <div className="text-3xl font-bold">93%</div>
                <div className="text-sm text-blue-100">Avg Reliability</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Routes ({routes.length})
            </button>
            <button
              onClick={() => setFilterStatus('optimal')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'optimal'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Optimal ({routes.filter(r => r.status === 'optimal').length})
            </button>
            <button
              onClick={() => setFilterStatus('active')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'active'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Active ({routes.filter(r => r.status === 'active').length})
            </button>
            <button
              onClick={() => setFilterStatus('delayed')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'delayed'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Delayed ({routes.filter(r => r.status === 'delayed').length})
            </button>
            <button
              onClick={() => setFilterStatus('disrupted')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterStatus === 'disrupted'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Disrupted ({routes.filter(r => r.status === 'disrupted').length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Routes List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredRoutes.map((route) => (
              <div
                key={route.id}
                onClick={() => setSelectedRoute(route)}
                className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all hover:shadow-xl ${
                  selectedRoute?.id === route.id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{route.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {route.origin} → {route.destination}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(route.status)}`}>
                    {getStatusBadge(route.status)}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">Distance</div>
                    <div className="font-semibold text-gray-900">{route.distance}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Duration</div>
                    <div className="font-semibold text-gray-900">{route.duration}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Vessels</div>
                    <div className="font-semibold text-gray-900">{route.vessels} active</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Reliability</div>
                    <div className="font-semibold text-gray-900">{route.reliability}%</div>
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
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              {selectedRoute ? (
                <>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Route Details</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-700">Route Name</div>
                      <div className="text-lg text-gray-900">{selectedRoute.name}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-700">Origin Port</div>
                      <div className="text-lg text-gray-900">{selectedRoute.origin}</div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-700">Destination Port</div>
                      <div className="text-lg text-gray-900">{selectedRoute.destination}</div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Performance Metrics</div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Distance</span>
                          <span className="font-semibold">{selectedRoute.distance}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Avg Duration</span>
                          <span className="font-semibold">{selectedRoute.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Active Vessels</span>
                          <span className="font-semibold">{selectedRoute.vessels}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Cargo</span>
                          <span className="font-semibold">{selectedRoute.cargo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Reliability Score</span>
                          <span className="font-semibold">{selectedRoute.reliability}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="text-sm font-semibold text-gray-700 mb-2">AI Recommendations</div>
                      <div className="bg-blue-50 rounded-lg p-3 text-sm text-gray-700">
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
                <div className="text-center text-gray-500 py-8">
                  <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
