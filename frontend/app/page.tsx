'use client'

import { useState, useEffect } from 'react'
import { MapContainer } from './components/MapContainer'
import { AlertPanel } from './components/AlertPanel'
import { MetricsPanel } from './components/MetricsPanel'
import { AgentStatus } from './components/AgentStatus'
import { io, Socket } from 'socket.io-client'

interface Disruption {
  id: string
  type: string
  location: [number, number]
  severity: 'low' | 'medium' | 'high' | 'critical'
  confidence: number
  affectedRoutes: number
  timestamp: string
  description: string
}

export default function Home() {
  const [disruptions, setDisruptions] = useState<Disruption[]>([])
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    const newSocket = io(apiUrl)

    newSocket.on('connect', () => {
      console.log('Connected to backend')
      setIsConnected(true)
    })

    newSocket.on('disconnect', () => {
      console.log('Disconnected from backend')
      setIsConnected(false)
    })

    newSocket.on('disruption_update', (data: Disruption) => {
      console.log('New disruption:', data)
      setDisruptions((prev) => [data, ...prev.slice(0, 49)])
    })

    setSocket(newSocket)

    // Fetch initial data
    fetch(`${apiUrl}/api/disruptions`)
      .then((res) => res.json())
      .then((data) => setDisruptions(data))
      .catch((err) => console.error('Failed to fetch disruptions:', err))

    return () => {
      newSocket.close()
    }
  }, [])

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Global Supply Chain Intelligence Network
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Real-time disruption prediction and optimization
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm text-gray-600">
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
