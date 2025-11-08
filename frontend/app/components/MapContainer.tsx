'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

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

interface MapContainerProps {
  disruptions: Disruption[]
}

export function MapContainer({ disruptions }: MapContainerProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const markers = useRef<mapboxgl.Marker[]>([])

  useEffect(() => {
    if (!mapContainer.current) return

    // Initialize map (use free demo token or user's token)
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoiZGVtbyIsImEiOiJjazl3MXptdGswMDBoM2VwbjdqOXVvcjNzIn0.demo'

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [0, 20],
      zoom: 2,
    })

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    return () => {
      map.current?.remove()
    }
  }, [])

  useEffect(() => {
    if (!map.current) return

    // Clear existing markers
    markers.current.forEach((marker) => marker.remove())
    markers.current = []

    // Add new markers for disruptions
    disruptions.forEach((disruption) => {
      const el = document.createElement('div')
      el.className = 'marker'

      const color = {
        low: '#22c55e',
        medium: '#f59e0b',
        high: '#ef4444',
        critical: '#dc2626',
      }[disruption.severity]

      el.style.backgroundColor = color
      el.style.width = '20px'
      el.style.height = '20px'
      el.style.borderRadius = '50%'
      el.style.border = '2px solid white'
      el.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)'
      el.style.cursor = 'pointer'

      const marker = new mapboxgl.Marker(el)
        .setLngLat(disruption.location)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="p-2">
              <h3 class="font-bold text-sm">${disruption.type}</h3>
              <p class="text-xs text-gray-600 mt-1">${disruption.description}</p>
              <div class="mt-2 text-xs">
                <div>Severity: <span class="font-semibold">${disruption.severity}</span></div>
                <div>Confidence: <span class="font-semibold">${(disruption.confidence * 100).toFixed(0)}%</span></div>
                <div>Affected Routes: <span class="font-semibold">${disruption.affectedRoutes}</span></div>
              </div>
            </div>
          `)
        )
        .addTo(map.current!)

      markers.current.push(marker)
    })
  }, [disruptions])

  const criticalCount = disruptions.filter(d => d.severity === 'critical').length
  const highCount = disruptions.filter(d => d.severity === 'high').length
  const mediumCount = disruptions.filter(d => d.severity === 'medium').length
  const lowCount = disruptions.filter(d => d.severity === 'low').length

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
      {/* Header with Purpose Explanation */}
      <div className="p-5 border-b border-gray-700 bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <span className="text-3xl">🌍</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Global Disruption Tracker</h2>
                <p className="text-xs text-blue-300 mt-0.5">Real-time supply chain intelligence worldwide</p>
              </div>
            </div>
            <div className="bg-gray-900/60 rounded-lg p-3 border border-gray-600 mt-3">
              <div className="flex items-start gap-2">
                <span className="text-lg mt-0.5">💡</span>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-white mb-1">What you're seeing:</p>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Each dot represents a live disruption event (port delays, weather, strikes, etc.).
                    Click any marker to see details. Monitor high-risk zones affecting your supply routes.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-4 flex items-center space-x-2 bg-green-900/30 text-green-400 px-3 py-1.5 rounded-lg border border-green-600 h-fit">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold">LIVE</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          <div className="bg-gray-900/60 rounded-lg p-3 border border-red-700/50">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
              <span className="text-[10px] font-semibold text-red-400 uppercase">Critical</span>
            </div>
            <div className="text-2xl font-bold text-white">{criticalCount}</div>
            <div className="text-[10px] text-gray-400">Immediate action needed</div>
          </div>
          <div className="bg-gray-900/60 rounded-lg p-3 border border-orange-700/50">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
              <span className="text-[10px] font-semibold text-orange-400 uppercase">High</span>
            </div>
            <div className="text-2xl font-bold text-white">{highCount}</div>
            <div className="text-[10px] text-gray-400">Monitor closely</div>
          </div>
          <div className="bg-gray-900/60 rounded-lg p-3 border border-yellow-700/50">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <span className="text-[10px] font-semibold text-yellow-400 uppercase">Medium</span>
            </div>
            <div className="text-2xl font-bold text-white">{mediumCount}</div>
            <div className="text-[10px] text-gray-400">Watch for changes</div>
          </div>
          <div className="bg-gray-900/60 rounded-lg p-3 border border-green-700/50">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              <span className="text-[10px] font-semibold text-green-400 uppercase">Low</span>
            </div>
            <div className="text-2xl font-bold text-white">{lowCount}</div>
            <div className="text-[10px] text-gray-400">Minimal impact</div>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <div ref={mapContainer} className="w-full h-[500px]" />
    </div>
  )
}
