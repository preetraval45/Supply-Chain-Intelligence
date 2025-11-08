'use client'

import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from 'chart.js'
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
)

type TimeRange = '24h' | '7d' | '30d' | '90d'

interface AnalyticsData {
  disruptionTypes: { [key: string]: number }
  severityDistribution: { [key: string]: number }
  weeklyTrends: number[]
  regionalImpact: { [key: string]: number }
  costImpact: { [key: string]: number }
  predictionAccuracy: number[]
  keyMetrics: {
    totalDisruptions: number
    avgResolutionTime: number
    costImpact: number
    predictionAccuracy: number
  }
}

const generateAnalyticsData = (timeRange: TimeRange): AnalyticsData => {
  const ranges = {
    '24h': { disruptions: 12, days: 1, multiplier: 1 },
    '7d': { disruptions: 65, days: 7, multiplier: 1.5 },
    '30d': { disruptions: 280, days: 30, multiplier: 2 },
    '90d': { disruptions: 850, days: 90, multiplier: 2.5 },
  }

  const range = ranges[timeRange]

  return {
    disruptionTypes: {
      'Port Congestion': Math.floor(range.disruptions * 0.30),
      'Weather Events': Math.floor(range.disruptions * 0.25),
      'Equipment Failure': Math.floor(range.disruptions * 0.18),
      'Geopolitical': Math.floor(range.disruptions * 0.15),
      'Labor Issues': Math.floor(range.disruptions * 0.07),
      'Cyber Incident': Math.floor(range.disruptions * 0.05),
    },
    severityDistribution: {
      Critical: Math.floor(range.disruptions * 0.12),
      High: Math.floor(range.disruptions * 0.23),
      Medium: Math.floor(range.disruptions * 0.38),
      Low: Math.floor(range.disruptions * 0.27),
    },
    weeklyTrends: Array.from({ length: range.days <= 7 ? range.days : 7 }, (_, i) =>
      Math.floor(Math.random() * 45 + 20 + i * 3 * range.multiplier)
    ),
    regionalImpact: {
      'Asia Pacific': Math.floor(range.disruptions * 0.45),
      'Americas': Math.floor(range.disruptions * 0.32),
      'Europe': Math.floor(range.disruptions * 0.18),
      'Africa': Math.floor(range.disruptions * 0.05),
    },
    costImpact: {
      'Port Operations': Math.floor(1200 * range.multiplier),
      'Transportation': Math.floor(850 * range.multiplier),
      'Inventory': Math.floor(620 * range.multiplier),
      'Labor': Math.floor(440 * range.multiplier),
    },
    predictionAccuracy: Array.from({ length: 12 }, (_, i) =>
      85 + Math.random() * 12 + (i > 6 ? 2 : 0)
    ),
    keyMetrics: {
      totalDisruptions: range.disruptions,
      avgResolutionTime: Math.floor(32 - range.multiplier * 3),
      costImpact: Math.floor(4100 * range.multiplier),
      predictionAccuracy: 98.7,
    },
  }
}

const MetricCard = ({
  label,
  value,
  unit = '',
  trend = null,
  icon = null
}: {
  label: string
  value: string | number
  unit?: string
  trend?: number | null
  icon?: React.ReactNode
}) => {
  const isPositive = trend === null ? false : trend > 0

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{label}</p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {value}
            {unit && <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">{unit}</span>}
          </h3>
        </div>
        {icon && <div className="text-3xl">{icon}</div>}
      </div>

      {trend !== null && (
        <div className="flex items-center gap-2">
          <span className={`text-sm font-semibold ${isPositive ? 'text-red-500' : 'text-green-500'}`}>
            {isPositive ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}%
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-xs">vs last period</span>
        </div>
      )}
    </div>
  )
}

const ChartContainer = ({
  title,
  children,
  className = ''
}: {
  title: string
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
      <div className={`relative ${className}`}>
        {children}
      </div>
    </div>
  )
}

export function AdvancedAnalytics() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d')
  const [data, setData] = useState<AnalyticsData>(generateAnalyticsData('7d'))
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    setData(generateAnalyticsData(timeRange))
  }, [timeRange])

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setDarkMode(isDark)

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark')
      setDarkMode(isDark)
    })

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: darkMode ? '#e5e7eb' : '#374151',
          font: { size: 12 },
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
        titleColor: darkMode ? '#f3f4f6' : '#111827',
        bodyColor: darkMode ? '#d1d5db' : '#374151',
        borderColor: darkMode ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        titleFont: { size: 13, weight: 'bold' as const },
        bodyFont: { size: 12 },
        cornerRadius: 8,
      },
    },
  }

  const textColor = darkMode ? '#e5e7eb' : '#6b7280'
  const gridColor = darkMode ? '#374151' : '#e5e7eb'

  // Pie Chart Data
  const pieChartData = {
    labels: Object.keys(data.disruptionTypes),
    datasets: [
      {
        data: Object.values(data.disruptionTypes),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(248, 113, 113, 0.8)',
          'rgba(252, 165, 165, 0.8)',
          'rgba(254, 199, 199, 0.8)',
          'rgba(254, 226, 226, 0.8)',
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(251, 146, 60)',
          'rgb(248, 113, 113)',
          'rgb(252, 165, 165)',
          'rgb(254, 199, 199)',
          'rgb(254, 226, 226)',
        ],
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    ],
  }

  // Doughnut Chart Data
  const doughnutChartData = {
    labels: Object.keys(data.severityDistribution),
    datasets: [
      {
        data: Object.values(data.severityDistribution),
        backgroundColor: [
          'rgba(239, 68, 68, 0.9)',
          'rgba(249, 115, 22, 0.9)',
          'rgba(251, 191, 36, 0.9)',
          'rgba(34, 197, 94, 0.9)',
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(249, 115, 22)',
          'rgb(251, 191, 36)',
          'rgb(34, 197, 94)',
        ],
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    ],
  }

  // Line Chart Data (Weekly Trends)
  const weeklyTrendsDays = timeRange === '24h'
    ? Array.from({ length: data.weeklyTrends.length }, (_, i) => `${i}h`)
    : Array.from({ length: data.weeklyTrends.length }, (_, i) => `Day ${i + 1}`)

  const lineChartData = {
    labels: weeklyTrendsDays,
    datasets: [
      {
        label: 'Daily Disruptions',
        data: data.weeklyTrends,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true,
        filler: {
          propagate: true,
        },
      },
    ],
  }

  const lineChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: textColor, font: { size: 11 } },
        grid: { color: gridColor, drawBorder: false },
      },
      x: {
        ticks: { color: textColor, font: { size: 11 } },
        grid: { display: false, drawBorder: false },
      },
    },
  }

  // Bar Chart Data (Regional Impact)
  const regionalBarData = {
    labels: Object.keys(data.regionalImpact),
    datasets: [
      {
        label: 'Disruptions by Region',
        data: Object.values(data.regionalImpact),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(249, 115, 22, 0.8)',
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(139, 92, 246)',
          'rgb(236, 72, 153)',
          'rgb(249, 115, 22)',
        ],
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(249, 115, 22, 1)',
        ],
      },
    ],
  }

  const barChartOptions = {
    ...chartOptions,
    indexAxis: 'y' as const,
    scales: {
      x: {
        beginAtZero: true,
        ticks: { color: textColor, font: { size: 11 } },
        grid: { color: gridColor, drawBorder: false },
      },
      y: {
        ticks: { color: textColor, font: { size: 11 } },
        grid: { display: false, drawBorder: false },
      },
    },
  }

  // Bar Chart Data (Cost Impact)
  const costBarData = {
    labels: Object.keys(data.costImpact),
    datasets: [
      {
        label: 'Cost Impact ($K)',
        data: Object.values(data.costImpact),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        borderRadius: 8,
        hoverBackgroundColor: 'rgba(34, 197, 94, 1)',
      },
    ],
  }

  const costBarChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: textColor, font: { size: 11 } },
        grid: { color: gridColor, drawBorder: false },
      },
      x: {
        ticks: { color: textColor, font: { size: 11 } },
        grid: { display: false, drawBorder: false },
      },
    },
  }

  // Line Chart Data (Prediction Accuracy Trend)
  const predictionAccuracyData = {
    labels: Array.from({ length: data.predictionAccuracy.length }, (_, i) => `Week ${i + 1}`),
    datasets: [
      {
        label: 'Prediction Accuracy (%)',
        data: data.predictionAccuracy,
        borderColor: 'rgba(168, 85, 247, 1)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        borderWidth: 3,
        pointRadius: 5,
        pointBackgroundColor: 'rgba(168, 85, 247, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const predictionChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: false,
        min: 80,
        max: 100,
        ticks: { color: textColor, font: { size: 11 } },
        grid: { color: gridColor, drawBorder: false },
      },
      x: {
        ticks: { color: textColor, font: { size: 11 } },
        grid: { display: false, drawBorder: false },
      },
    },
  }

  return (
    <div className="space-y-4">
      {/* Compact Header with Time Range */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-800/50 rounded-lg p-4 border border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-300">Real-time analytics</span>
        </div>

        {/* Time Range Selector */}
        <div className="flex gap-2 bg-gray-800 rounded-lg p-1.5 shadow-lg border border-gray-700">
          {(['24h', '7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-all ${
                timeRange === range
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Cards - Compact */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard
          label="Total Disruptions"
          value={data.keyMetrics.totalDisruptions}
          trend={-8.3}
          icon="🚨"
        />
        <MetricCard
          label="Avg Resolution Time"
          value={data.keyMetrics.avgResolutionTime}
          unit="hrs"
          trend={-12.5}
          icon="⏱️"
        />
        <MetricCard
          label="Cost Impact"
          value={`$${data.keyMetrics.costImpact}`}
          unit="K"
          trend={5.2}
          icon="💰"
        />
        <MetricCard
          label="Prediction Accuracy"
          value={data.keyMetrics.predictionAccuracy}
          unit="%"
          trend={2.1}
          icon="🎯"
        />
      </div>

      {/* Charts Grid - Compact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Pie Chart - Disruption Types */}
        <ChartContainer title="Disruption Types" className="h-[300px]">
          <Pie data={pieChartData} options={chartOptions} />
        </ChartContainer>

        {/* Doughnut Chart - Severity Distribution */}
        <ChartContainer title="Severity Levels" className="h-[300px]">
          <Doughnut data={doughnutChartData} options={chartOptions} />
        </ChartContainer>

        {/* Line Chart - Weekly Trends */}
        <ChartContainer title={`${timeRange === '24h' ? 'Hourly' : 'Daily'} Trends`} className="lg:col-span-2 h-[280px]">
          <Line data={lineChartData} options={lineChartOptions} />
        </ChartContainer>

        {/* Bar Chart - Regional Impact */}
        <ChartContainer title="Regional Impact" className="h-[280px]">
          <Bar data={regionalBarData} options={barChartOptions} />
        </ChartContainer>

        {/* Bar Chart - Cost Impact */}
        <ChartContainer title="Cost Impact" className="h-[280px]">
          <Bar data={costBarData} options={costBarChartOptions} />
        </ChartContainer>

        {/* Line Chart - Prediction Accuracy Trend */}
        <ChartContainer title="AI Prediction Accuracy" className="lg:col-span-2 h-[280px]">
          <Line data={predictionAccuracyData} options={predictionChartOptions} />
        </ChartContainer>
      </div>

    </div>
  )
}
