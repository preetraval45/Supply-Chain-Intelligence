'use client'

import { useState, useEffect } from 'react'
import { Navbar } from './Navbar'
import { AIChatbot } from './AIChatbot'
import { generateMockDisruptions } from '../utils/mockData'
import { io, Socket } from 'socket.io-client'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(true)
  const [disruptions, setDisruptions] = useState<any[]>([])

  useEffect(() => {
    // Generate large mock dataset - 500 disruptions
    const mockData = generateMockDisruptions(500)
    setDisruptions(mockData)

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

    newSocket.on('disruption_update', (data: any) => {
      setDisruptions((prev) => [data, ...prev.slice(0, 499)])
    })

    setSocket(newSocket)

    // Fetch backend data
    fetch(`${apiUrl}/api/disruptions`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setDisruptions((prev) => [...data, ...prev.slice(0, 400)])
        }
      })
      .catch((err) => console.log('Using mock data'))

    // Simulate real-time updates every 15 seconds
    const interval = setInterval(() => {
      const newDisruption = generateMockDisruptions(1)[0]
      setDisruptions((prev) => [newDisruption, ...prev.slice(0, 499)])
    }, 15000)

    return () => {
      newSocket.close()
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <Navbar
        isConnected={isConnected}
        activeAgents={12}
        totalDisruptions={disruptions.length}
      />
      {children}
      <AIChatbot disruptions={disruptions} />
    </>
  )
}
