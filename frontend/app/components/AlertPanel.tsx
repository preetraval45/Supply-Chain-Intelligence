'use client'

import { format } from 'date-fns'
import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/solid'

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

interface AlertPanelProps {
  disruptions: Disruption[]
}

export function AlertPanel({ disruptions }: AlertPanelProps) {
  const getSeverityColor = (severity: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800 border-green-200',
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      critical: 'bg-red-100 text-red-800 border-red-200',
    }
    return colors[severity as keyof typeof colors] || colors.low
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Alerts</h2>
          <span className="text-sm text-gray-500">Last 24 hours</span>
        </div>
      </div>
      <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
        {disruptions.length === 0 ? (
          <div className="p-8 text-center">
            <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-gray-500">No active disruptions</p>
            <p className="text-sm text-gray-400 mt-1">All systems operational</p>
          </div>
        ) : (
          disruptions.map((disruption) => (
            <div key={disruption.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-3">
                <ExclamationTriangleIcon className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      {disruption.type}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded border ${getSeverityColor(
                        disruption.severity
                      )}`}
                    >
                      {disruption.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{disruption.description}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {disruption.affectedRoutes} route{disruption.affectedRoutes !== 1 ? 's' : ''}{' '}
                      affected
                    </span>
                    <span>{format(new Date(disruption.timestamp), 'MMM d, HH:mm')}</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">Confidence</span>
                      <span className="font-semibold text-gray-700">
                        {(disruption.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${disruption.confidence * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
