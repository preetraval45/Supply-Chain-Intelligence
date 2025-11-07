'use client'

import { useState } from 'react'
import Link from 'next/link'

interface NavbarProps {
  isConnected: boolean
  activeAgents: number
  totalDisruptions: number
}

export function Navbar({ isConnected, activeAgents, totalDisruptions }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Supply Chain Intelligence
              </h1>
              <p className="text-xs text-blue-600 font-medium">AI-Powered Predictions</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link href="/" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors px-4 py-2 rounded-lg text-sm font-medium">
              Dashboard
            </Link>
            <Link href="/agents" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors px-4 py-2 rounded-lg text-sm font-medium">
              AI Agents
            </Link>
            <Link href="/analytics" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors px-4 py-2 rounded-lg text-sm font-medium">
              Analytics
            </Link>
            <Link href="/routes" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors px-4 py-2 rounded-lg text-sm font-medium">
              Routes
            </Link>
          </div>

          {/* Status Indicators */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Connection Status */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1.5">
              <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              <span className="text-xs font-medium text-gray-700">
                {isConnected ? 'Live' : 'Offline'}
              </span>
            </div>

            {/* Active Agents */}
            <div className="flex items-center space-x-2 bg-blue-50 rounded-lg px-3 py-1.5">
              <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              <span className="text-xs font-semibold text-blue-600">
                {activeAgents} Agents
              </span>
            </div>

            {/* Disruptions Count */}
            <div className="flex items-center space-x-2 bg-orange-50 rounded-lg px-3 py-1.5">
              <svg className="h-4 w-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-semibold text-orange-600">
                {totalDisruptions}
              </span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-blue-100 p-2"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link href="/" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-lg text-base font-medium">
              Dashboard
            </Link>
            <Link href="/agents" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-lg text-base font-medium">
              AI Agents
            </Link>
            <Link href="/analytics" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-lg text-base font-medium">
              Analytics
            </Link>
            <Link href="/routes" className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-lg text-base font-medium">
              Routes
            </Link>

            {/* Mobile Status Indicators */}
            <div className="pt-4 space-y-2 border-t border-gray-200 mt-2">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-gray-600">Status:</span>
                <div className="flex items-center space-x-2">
                  <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm font-medium">{isConnected ? 'Live' : 'Offline'}</span>
                </div>
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-gray-600">Active Agents:</span>
                <span className="text-sm font-semibold text-blue-600">{activeAgents}</span>
              </div>
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-gray-600">Alerts:</span>
                <span className="text-sm font-semibold text-orange-600">{totalDisruptions}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
