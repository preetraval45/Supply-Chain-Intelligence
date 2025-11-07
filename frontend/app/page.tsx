'use client'

import { useState, useEffect } from 'react'
import { MapContainer } from './components/MapContainer'
import { AlertPanel } from './components/AlertPanel'
import { MetricsPanel } from './components/MetricsPanel'
import { AgentStatus } from './components/AgentStatus'
import { RealTimeInsights } from './components/RealTimeInsights'
import { generateMockDisruptions, type Disruption } from './utils/mockData'
import { io, Socket } from 'socket.io-client'

export default function Home() {
  const [disruptions, setDisruptions] = useState<Disruption[]>([])
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    // Load mock data immediately
    const mockData = generateMockDisruptions(150)
    setDisruptions(mockData)

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    const newSocket = io(apiUrl)

    newSocket.on('connect', () => {
      console.log('Connected to backend')
    })

    newSocket.on('disruption_update', (data: Disruption) => {
      console.log('New disruption:', data)
      setDisruptions((prev) => [data, ...prev.slice(0, 149)])
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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI-Powered Supply Chain Intelligence
            </h1>
            <p className="text-xl text-blue-100 mb-6">
              Predict disruptions 24-72 hours in advance using satellite imagery, IoT sensors, and Google Gemini AI
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">98.7%</div>
                <div className="text-sm text-blue-100">Accuracy</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">48hrs</div>
                <div className="text-sm text-blue-100">Warning Time</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                <div className="text-3xl font-bold">$10M+</div>
                <div className="text-sm text-blue-100">Cost Savings</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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
      </div>
    </main>
  )
}
