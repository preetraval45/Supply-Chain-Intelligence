'use client'

import { useState, useEffect } from 'react'
import { MapContainer } from './components/MapContainer'
import { AlertPanel } from './components/AlertPanel'
import { MetricsPanel } from './components/MetricsPanel'
import { AgentStatus } from './components/AgentStatus'
import { RealTimeInsights } from './components/RealTimeInsights'
import { ToastContainer, useToast } from './components/ToastNotification'
import { KeyboardShortcuts } from './components/KeyboardShortcuts'
import { ExportDropdown } from './components/ExportData'
import { generateMockDisruptions, type Disruption } from './utils/mockData'
import { io, Socket } from 'socket.io-client'

export default function Home() {
  const [disruptions, setDisruptions] = useState<Disruption[]>([])
  const [socket, setSocket] = useState<Socket | null>(null)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const { toasts, removeToast, success, error, info } = useToast()

  useEffect(() => {
    // Load mock data immediately
    const mockData = generateMockDisruptions(500)
    setDisruptions(mockData)
    info('System initialized with 500+ disruptions', 3000)

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    const newSocket = io(apiUrl)

    newSocket.on('connect', () => {
      console.log('Connected to backend')
      success('Connected to real-time data stream', 3000)
    })

    newSocket.on('disruption_update', (data: Disruption) => {
      console.log('New disruption:', data)
      setDisruptions((prev) => [data, ...prev.slice(0, 499)])
      if (data.severity === 'critical') {
        error(`Critical disruption: ${data.location}`, 5000)
      }
    })

    setSocket(newSocket)

    // Fetch backend data
    fetch(`${apiUrl}/api/disruptions`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setDisruptions((prev) => [...data, ...prev.slice(0, 100)])
        }
      })
      .catch((err) => console.log('Using mock data'))

    return () => {
      newSocket.close()
    }
  }, [])

  return (
    <main className="min-h-screen bg-gray-900">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Keyboard Shortcuts */}
      <KeyboardShortcuts />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI-Powered Supply Chain Intelligence
            </h1>
            <p className="text-xl text-blue-100 dark:text-blue-200 mb-6">
              Predict disruptions 24-72 hours in advance with real-time monitoring and intelligent analytics
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">98.7%</div>
                <div className="text-sm text-blue-100 dark:text-blue-200">Accuracy</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">48hrs</div>
                <div className="text-sm text-blue-100 dark:text-blue-200">Warning Time</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">$10M+</div>
                <div className="text-sm text-blue-100 dark:text-blue-200">Cost Savings</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* View Toggle & Export */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setShowAnalytics(false)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                !showAnalytics
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setShowAnalytics(true)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                showAnalytics
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Analytics
            </button>
          </div>
          <ExportDropdown
            data={disruptions.map(d => ({
              location: `${d.location[0]}, ${d.location[1]}`,
              type: d.type,
              severity: d.severity,
              confidence: d.confidence,
              affectedRoutes: d.affectedRoutes,
              description: d.description,
              timestamp: new Date(d.timestamp).toLocaleString()
            }))}
            filename={`supply-chain-disruptions-${new Date().toISOString().split('T')[0]}`}
            title="Supply Chain Disruptions Report"
          />
        </div>

        {/* Conditional View */}
        {showAnalytics ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Advanced Analytics Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Full analytics dashboard with Chart.js visualizations coming soon. Export functionality is available above.
            </p>
          </div>
        ) : (
          <>
            {/* Real-Time Insights Panel */}
            <RealTimeInsights disruptions={disruptions} />

            {/* Dashboard Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Map */}
              <div className="lg:col-span-2 space-y-6">
                <MapContainer disruptions={disruptions} />
                <MetricsPanel />
              </div>

              {/* Right Column - Alerts & Agent Status */}
              <div className="space-y-6">
                <AgentStatus />
                <AlertPanel disruptions={disruptions} />
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
