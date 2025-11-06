'use client'

import { useState, useEffect } from 'react'
import { CpuChipIcon, ChartBarIcon, BellAlertIcon } from '@heroicons/react/24/outline'

interface Agent {
  name: string
  status: 'active' | 'idle' | 'error'
  lastActivity: string
  tasksCompleted: number
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

export function AgentStatus() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      name: 'Prediction Agent',
      status: 'active',
      lastActivity: 'Analyzing satellite imagery',
      tasksCompleted: 1247,
      icon: CpuChipIcon,
    },
    {
      name: 'Optimization Agent',
      status: 'active',
      lastActivity: 'Recalculating routes',
      tasksCompleted: 892,
      icon: ChartBarIcon,
    },
    {
      name: 'Alert Agent',
      status: 'idle',
      lastActivity: 'Monitoring events',
      tasksCompleted: 2341,
      icon: BellAlertIcon,
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setAgents((prev) =>
        prev.map((agent) => ({
          ...agent,
          tasksCompleted: agent.tasksCompleted + Math.floor(Math.random() * 3),
        }))
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-500',
      idle: 'bg-gray-400',
      error: 'bg-red-500',
    }
    return colors[status as keyof typeof colors] || colors.idle
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">AI Agent Status</h2>
        <p className="text-sm text-gray-500 mt-1">Multi-agent orchestration</p>
      </div>
      <div className="divide-y divide-gray-200">
        {agents.map((agent) => {
          const Icon = agent.icon
          return (
            <div key={agent.name} className="p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 rounded-lg p-2">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-semibold text-gray-900">{agent.name}</h3>
                    <div className="flex items-center space-x-2">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor(agent.status)}`} />
                      <span className="text-xs text-gray-500 capitalize">{agent.status}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{agent.lastActivity}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Tasks completed</span>
                    <span className="font-semibold text-gray-700">{agent.tasksCompleted}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
