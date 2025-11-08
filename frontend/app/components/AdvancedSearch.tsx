'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { format, startOfDay, endOfDay } from 'date-fns'

export interface Filters {
  search: string
  severity: string[]
  type: string[]
  dateRange: {
    start: Date | null
    end: Date | null
  }
  status: string[]
  region: string[]
}

interface AdvancedSearchProps {
  onSearchChange: (query: string, filters: Filters) => void
  data: any[]
}

const SEVERITY_OPTIONS = ['Critical', 'High', 'Medium', 'Low']
const DISRUPTION_TYPES = [
  'Port Congestion',
  'Weather',
  'Geopolitical',
  'Operational',
  'Labor Strike',
  'Technical',
  'Security',
  'Customs',
  'Equipment Failure'
]
const STATUS_OPTIONS = ['Active', 'Resolved', 'Predicted']
const REGION_OPTIONS = [
  'Asia-Pacific',
  'North America',
  'Europe',
  'Middle East',
  'South America',
  'Africa'
]

export function AdvancedSearch({ onSearchChange, data }: AdvancedSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<Filters>({
    search: '',
    severity: [],
    type: [],
    dateRange: { start: null, end: null },
    status: [],
    region: []
  })

  const [isOpen, setIsOpen] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout>()

  // Debounced search handler
  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query)

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }

      debounceTimerRef.current = setTimeout(() => {
        const newFilters = { ...filters, search: query }
        setFilters(newFilters)
        onSearchChange(query, newFilters)
      }, 300)
    },
    [filters, onSearchChange]
  )

  // Handle filter changes
  const handleSeverityChange = (severity: string) => {
    const newSeverity = filters.severity.includes(severity)
      ? filters.severity.filter(s => s !== severity)
      : [...filters.severity, severity]

    const newFilters = { ...filters, severity: newSeverity }
    setFilters(newFilters)
    onSearchChange(filters.search, newFilters)
  }

  const handleTypeChange = (type: string) => {
    const newType = filters.type.includes(type)
      ? filters.type.filter(t => t !== type)
      : [...filters.type, type]

    const newFilters = { ...filters, type: newType }
    setFilters(newFilters)
    onSearchChange(filters.search, newFilters)
  }

  const handleStatusChange = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status]

    const newFilters = { ...filters, status: newStatus }
    setFilters(newFilters)
    onSearchChange(filters.search, newFilters)
  }

  const handleRegionChange = (region: string) => {
    const newRegion = filters.region.includes(region)
      ? filters.region.filter(r => r !== region)
      : [...filters.region, region]

    const newFilters = { ...filters, region: newRegion }
    setFilters(newFilters)
    onSearchChange(filters.search, newFilters)
  }

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : null
    const newFilters = {
      ...filters,
      dateRange: { ...filters.dateRange, start: newDate }
    }
    setFilters(newFilters)
    onSearchChange(filters.search, newFilters)
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : null
    const newFilters = {
      ...filters,
      dateRange: { ...filters.dateRange, end: newDate }
    }
    setFilters(newFilters)
    onSearchChange(filters.search, newFilters)
  }

  const clearAllFilters = () => {
    const clearedFilters: Filters = {
      search: '',
      severity: [],
      type: [],
      dateRange: { start: null, end: null },
      status: [],
      region: []
    }
    setSearchQuery('')
    setFilters(clearedFilters)
    onSearchChange('', clearedFilters)
  }

  const activeFilterCount = [
    ...filters.severity,
    ...filters.type,
    ...filters.status,
    ...filters.region,
    ...(filters.dateRange.start || filters.dateRange.end ? ['date'] : [])
  ].length

  const filteredDataCount = data.filter(item => {
    if (filters.search && !item.description?.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }
    if (filters.severity.length > 0 && !filters.severity.includes(item.severity)) {
      return false
    }
    if (filters.type.length > 0 && !filters.type.includes(item.type)) {
      return false
    }
    if (filters.status.length > 0 && !filters.status.includes(item.status)) {
      return false
    }
    if (filters.region.length > 0 && !filters.region.includes(item.region)) {
      return false
    }
    if (filters.dateRange.start || filters.dateRange.end) {
      const itemDate = new Date(item.timestamp)
      if (filters.dateRange.start && itemDate < startOfDay(filters.dateRange.start)) {
        return false
      }
      if (filters.dateRange.end && itemDate > endOfDay(filters.dateRange.end)) {
        return false
      }
    }
    return true
  }).length

  // Keyboard shortcut handler (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(!isOpen)
        setTimeout(() => searchInputRef.current?.focus(), 100)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const exportResults = (format: 'json' | 'csv') => {
    const filteredResults = data.filter(item => {
      if (filters.search && !item.description?.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }
      if (filters.severity.length > 0 && !filters.severity.includes(item.severity)) {
        return false
      }
      if (filters.type.length > 0 && !filters.type.includes(item.type)) {
        return false
      }
      if (filters.status.length > 0 && !filters.status.includes(item.status)) {
        return false
      }
      if (filters.region.length > 0 && !filters.region.includes(item.region)) {
        return false
      }
      if (filters.dateRange.start || filters.dateRange.end) {
        const itemDate = new Date(item.timestamp)
        if (filters.dateRange.start && itemDate < startOfDay(filters.dateRange.start)) {
          return false
        }
        if (filters.dateRange.end && itemDate > endOfDay(filters.dateRange.end)) {
          return false
        }
      }
      return true
    })

    if (format === 'json') {
      const jsonStr = JSON.stringify(filteredResults, null, 2)
      const blob = new Blob([jsonStr], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `search-results-${Date.now()}.json`
      link.click()
    } else if (format === 'csv') {
      if (filteredResults.length === 0) return

      const keys = Object.keys(filteredResults[0])
      const csv = [
        keys.join(','),
        ...filteredResults.map(item =>
          keys.map(key => {
            const value = item[key]
            return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
          }).join(',')
        )
      ].join('\n')

      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `search-results-${Date.now()}.csv`
      link.click()
    }

    setShowExportMenu(false)
  }

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="relative mb-4">
        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="pl-4 text-gray-400 dark:text-slate-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search disruptions... (Cmd + K)"
            className="flex-1 px-4 py-3 bg-transparent border-none outline-none dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500"
          />

          <div className="pr-3 flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-gray-600 dark:text-slate-400"
              title="Toggle filters"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Keyboard shortcut hint */}
        <div className="absolute right-12 top-3.5 hidden md:block text-xs text-gray-400 dark:text-slate-500 bg-gray-50 dark:bg-slate-700 px-2 py-1 rounded">
          Cmd + K
        </div>
      </div>

      {/* Active Filters Chips */}
      {activeFilterCount > 0 && (
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          {filters.severity.map(severity => (
            <div
              key={`severity-${severity}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border border-red-200 dark:border-red-800 rounded-full text-sm text-red-700 dark:text-red-300 animate-fade-in"
            >
              <span className="font-medium">{severity}</span>
              <button
                onClick={() => handleSeverityChange(severity)}
                className="hover:text-red-900 dark:hover:text-red-100 transition-colors"
              >
                ×
              </button>
            </div>
          ))}

          {filters.type.map(type => (
            <div
              key={`type-${type}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 rounded-full text-sm text-blue-700 dark:text-blue-300 animate-fade-in"
            >
              <span className="font-medium">{type}</span>
              <button
                onClick={() => handleTypeChange(type)}
                className="hover:text-blue-900 dark:hover:text-blue-100 transition-colors"
              >
                ×
              </button>
            </div>
          ))}

          {filters.status.map(status => (
            <div
              key={`status-${status}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800 rounded-full text-sm text-green-700 dark:text-green-300 animate-fade-in"
            >
              <span className="font-medium">{status}</span>
              <button
                onClick={() => handleStatusChange(status)}
                className="hover:text-green-900 dark:hover:text-green-100 transition-colors"
              >
                ×
              </button>
            </div>
          ))}

          {filters.region.map(region => (
            <div
              key={`region-${region}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800 rounded-full text-sm text-purple-700 dark:text-purple-300 animate-fade-in"
            >
              <span className="font-medium">{region}</span>
              <button
                onClick={() => handleRegionChange(region)}
                className="hover:text-purple-900 dark:hover:text-purple-100 transition-colors"
              >
                ×
              </button>
            </div>
          ))}

          {(filters.dateRange.start || filters.dateRange.end) && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-800 rounded-full text-sm text-orange-700 dark:text-orange-300 animate-fade-in">
              <span className="font-medium">
                {filters.dateRange.start && format(filters.dateRange.start, 'MM/dd')}
                {filters.dateRange.start && filters.dateRange.end && ' - '}
                {filters.dateRange.end && format(filters.dateRange.end, 'MM/dd')}
              </span>
              <button
                onClick={() =>
                  setFilters(prev => ({
                    ...prev,
                    dateRange: { start: null, end: null }
                  }))
                }
                className="hover:text-orange-900 dark:hover:text-orange-100 transition-colors"
              >
                ×
              </button>
            </div>
          )}

          <button
            onClick={clearAllFilters}
            className="ml-auto px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border border-gray-200 dark:border-slate-700 rounded-full hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Filter Panel */}
      {isOpen && (
        <div className="mb-4 p-6 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-lg animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Severity Filter */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Severity
              </h3>
              <div className="space-y-2">
                {SEVERITY_OPTIONS.map(severity => (
                  <label key={severity} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.severity.includes(severity)}
                      onChange={() => handleSeverityChange(severity)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {severity}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" clipRule="evenodd" />
                </svg>
                Type
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {DISRUPTION_TYPES.map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.type.includes(type)}
                      onChange={() => handleTypeChange(type)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Status
              </h3>
              <div className="space-y-2">
                {STATUS_OPTIONS.map(status => (
                  <label key={status} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.status.includes(status)}
                      onChange={() => handleStatusChange(status)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {status}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Region Filter */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Region
              </h3>
              <div className="space-y-2">
                {REGION_OPTIONS.map(region => (
                  <label key={region} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.region.includes(region)}
                      onChange={() => handleRegionChange(region)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                      {region}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="space-y-3 lg:col-span-2">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                </svg>
                Date Range
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                    From
                  </label>
                  <input
                    type="date"
                    value={filters.dateRange.start ? format(filters.dateRange.start, 'yyyy-MM-dd') : ''}
                    onChange={handleStartDateChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 block mb-1">
                    To
                  </label>
                  <input
                    type="date"
                    value={filters.dateRange.end ? format(filters.dateRange.end, 'yyyy-MM-dd') : ''}
                    onChange={handleEndDateChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-blue-200 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              Showing <span className="font-bold text-blue-600 dark:text-blue-400">{filteredDataCount}</span> results
              {activeFilterCount > 0 && <span className="text-gray-600 dark:text-gray-400"> ({activeFilterCount} filters applied)</span>}
            </span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors font-medium text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>

          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 shadow-lg z-50 animate-fade-in">
              <button
                onClick={() => exportResults('json')}
                className="w-full text-left px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-sm font-medium first:rounded-t-lg"
              >
                Export as JSON
              </button>
              <button
                onClick={() => exportResults('csv')}
                className="w-full text-left px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-sm font-medium last:rounded-b-lg border-t border-gray-200 dark:border-slate-700"
              >
                Export as CSV
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scale-in {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}
