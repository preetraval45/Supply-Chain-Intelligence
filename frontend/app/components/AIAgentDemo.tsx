'use client'

import { useState, useEffect } from 'react'

interface AgentActivity {
  agent: string
  action: string
  timestamp: string
  status: 'processing' | 'completed' | 'analyzing'
  details: string
}

export function AIAgentDemo() {
  const [activities, setActivities] = useState<AgentActivity[]>([])
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  useEffect(() => {
    // Simulate AI agent activities
    const interval = setInterval(() => {
      const agents = [
        'Prediction Agent', 'Optimization Agent', 'Alert Agent', 'Weather Analysis Agent',
        'Port Congestion Monitor', 'Route Planning Agent', 'Inventory Manager Agent',
        'Customs & Compliance Agent', 'Risk Assessment Agent', 'Cost Optimizer Agent',
        'Vessel Tracking Agent', 'Supply Chain Coordinator'
      ]
      const actions = [
        { action: 'Analyzing satellite imagery', details: 'Processing 15 satellite images from Port of Shanghai' },
        { action: 'Processing IoT sensor data', details: 'Analyzing temperature and delay metrics from 50 sensors' },
        { action: 'Running Gemini AI analysis', details: 'Multimodal analysis of weather patterns and news data' },
        { action: 'Calculating alternative routes', details: 'Computing optimal paths using Dijkstra algorithm' },
        { action: 'Optimizing inventory allocation', details: 'Redistributing cargo across 3 regional warehouses' },
        { action: 'Generating stakeholder alerts', details: 'Preparing notifications for 12 affected parties' },
        { action: 'Updating risk scores', details: 'Recalculating risk metrics for 25 active routes' },
        { action: 'GPU processing complete', details: 'Processed batch of 10 images in 2.3 seconds (40x speedup)' },
        { action: 'Monitoring tropical storm', details: 'Tracking hurricane Delta, ETA 36 hours to Caribbean routes' },
        { action: 'Port wait time analysis', details: 'Shanghai: 48hrs, LA/LB: 72hrs, Singapore: 24hrs' },
        { action: 'Customs documentation check', details: 'Verifying HS codes for 234 shipments through EU borders' },
        { action: 'Vessel position update', details: 'Tracking 847 vessels across Pacific and Atlantic corridors' },
        { action: 'Cost reduction identified', details: 'Alternative route saves $12,400 on fuel costs' },
        { action: 'Inventory rebalancing', details: 'Moving 500 units from LA warehouse to Dallas hub' },
        { action: 'Coordination update sent', details: 'Syncing 5 agents on Shanghai congestion response' }
      ]

      const randomAgent = agents[Math.floor(Math.random() * agents.length)]
      const randomAction = actions[Math.floor(Math.random() * actions.length)]

      const newActivity: AgentActivity = {
        agent: randomAgent,
        action: randomAction.action,
        timestamp: new Date().toLocaleTimeString(),
        status: Math.random() > 0.7 ? 'processing' : Math.random() > 0.5 ? 'analyzing' : 'completed',
        details: randomAction.details
      }

      setActivities(prev => [newActivity, ...prev.slice(0, 19)])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const agentStats = [
    {
      name: 'Prediction Agent',
      description: 'Analyzes satellite imagery + IoT data + Gemini AI',
      icon: '🔮',
      metrics: { accuracy: '98.7%', predictions: 1247, avgTime: '2.3s' },
      color: 'blue'
    },
    {
      name: 'Optimization Agent',
      description: 'Calculates alternative routes and inventory optimization',
      icon: '⚡',
      metrics: { routes: 342, saved: '$2.4M', efficiency: '94.2%' },
      color: 'green'
    },
    {
      name: 'Alert Agent',
      description: 'Coordinates notifications to stakeholders',
      icon: '🔔',
      metrics: { alerts: 856, delivered: '99.8%', avgDelay: '0.8s' },
      color: 'orange'
    },
    {
      name: 'Weather Analysis Agent',
      description: 'Tracks storms, fog, and climate impact on routes',
      icon: '🌦️',
      metrics: { storms: 23, forecast: '7-day', accuracy: '96.4%' },
      color: 'blue'
    },
    {
      name: 'Port Congestion Monitor',
      description: 'Real-time monitoring of 200+ global ports',
      icon: '⚓',
      metrics: { ports: 200, avgWait: '28hrs', alerts: 145 },
      color: 'red'
    },
    {
      name: 'Route Planning Agent',
      description: 'Dynamic route planning with traffic optimization',
      icon: '🗺️',
      metrics: { routes: 500, optimized: 387, saved: '24hrs' },
      color: 'purple'
    },
    {
      name: 'Inventory Manager Agent',
      description: 'Manages stock across warehouses globally',
      icon: '📦',
      metrics: { warehouses: 12, rebalanced: 4500, efficiency: '97%' },
      color: 'indigo'
    },
    {
      name: 'Customs & Compliance Agent',
      description: 'Ensures regulatory compliance across borders',
      icon: '📋',
      metrics: { checks: 2340, passed: '99.2%', saved: '$890K' },
      color: 'teal'
    },
    {
      name: 'Risk Assessment Agent',
      description: 'Evaluates geopolitical and economic risks',
      icon: '⚠️',
      metrics: { risks: 89, high: 12, mitigated: '94%' },
      color: 'yellow'
    },
    {
      name: 'Cost Optimizer Agent',
      description: 'Minimizes costs across fuel, labor, and storage',
      icon: '💰',
      metrics: { analyzed: 5670, saved: '$4.2M', avgSave: '18%' },
      color: 'green'
    },
    {
      name: 'Vessel Tracking Agent',
      description: 'Real-time GPS tracking of 800+ vessels',
      icon: '🚢',
      metrics: { vessels: 847, tracked: '99.9%', updates: '30s' },
      color: 'cyan'
    },
    {
      name: 'Supply Chain Coordinator',
      description: 'Orchestrates all agents and manages workflows',
      icon: '🎯',
      metrics: { tasks: 12450, coordinated: 11, uptime: '99.98%' },
      color: 'pink'
    }
  ]

  return (
    <div id="agents" className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Agents in Action</h2>
          <p className="text-sm text-gray-500 mt-1">
            12 autonomous agents powered by Google Gemini & ADK
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg">
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium">12 Agents Active</span>
        </div>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {agentStats.map((agent) => (
          <div
            key={agent.name}
            onClick={() => setSelectedAgent(selectedAgent === agent.name ? null : agent.name)}
            className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
              selectedAgent === agent.name
                ? `border-${agent.color}-500 bg-${agent.color}-50`
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-3xl">{agent.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                <p className="text-xs text-gray-500">{agent.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {Object.entries(agent.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className={`text-lg font-bold text-${agent.color}-600`}>{value}</div>
                  <div className="text-xs text-gray-500 capitalize">{key}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Live Activity Feed */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <svg className="h-4 w-4 mr-2 text-green-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
          </svg>
          Live Activity Stream
        </h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {activity.agent}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      activity.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : activity.status === 'processing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{activity.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.details}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">How It Works</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-700">
          <div>
            <strong className="text-blue-600">Core Prediction Agents:</strong> The Prediction Agent analyzes satellite imagery using NVIDIA L4 GPU,
            processes IoT sensor data, and uses Google Gemini for multimodal intelligence. Weather Analysis Agent tracks storms and climate patterns.
          </div>
          <div>
            <strong className="text-green-600">Optimization & Planning:</strong> Route Planning and Optimization Agents calculate alternative shipping routes,
            while the Inventory Manager and Cost Optimizer balance stock levels and minimize expenses across the network.
          </div>
          <div>
            <strong className="text-purple-600">Coordination & Monitoring:</strong> The Supply Chain Coordinator orchestrates all 12 agents,
            while specialized agents monitor ports, vessels, customs, and risks. Alert Agent ensures stakeholders receive timely notifications.
          </div>
        </div>
      </div>
    </div>
  )
}
