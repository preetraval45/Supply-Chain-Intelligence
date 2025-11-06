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

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Live Disruption Map</h2>
        <p className="text-sm text-gray-500 mt-1">
          {disruptions.length} active disruption{disruptions.length !== 1 ? 's' : ''} detected
        </p>
      </div>
      <div ref={mapContainer} className="w-full h-[500px]" />
    </div>
  )
}
