'use client'

import { useEffect, useState } from 'react'

interface KeyboardShortcutsProps {
  onSearch?: () => void
  onCloseChatbot?: () => void
  onFocusChatbot?: () => void
}

export function KeyboardShortcuts({ onSearch, onCloseChatbot, onFocusChatbot }: KeyboardShortcutsProps) {
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K for search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onSearch?.()
      }

      // ESC to close modals
      if (e.key === 'Escape') {
        onCloseChatbot?.()
        setShowHelp(false)
      }

      // / to focus chatbot
      if (e.key === '/' && !isInputFocused()) {
        e.preventDefault()
        onFocusChatbot?.()
      }

      // ? to show keyboard shortcuts help
      if (e.key === '?' && !isInputFocused()) {
        e.preventDefault()
        setShowHelp(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onSearch, onCloseChatbot, onFocusChatbot])

  const isInputFocused = () => {
    const activeElement = document.activeElement
    return activeElement?.tagName === 'INPUT' ||
           activeElement?.tagName === 'TEXTAREA' ||
           activeElement?.getAttribute('contenteditable') === 'true'
  }

  return (
    <>
      {/* Keyboard Shortcuts Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Keyboard Shortcuts</h3>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 mb-2">Navigation</h4>
                <ShortcutItem
                  keys={['Cmd', 'K']}
                  description="Open search"
                />
                <ShortcutItem
                  keys={['/']}
                  description="Focus chatbot"
                />
                <ShortcutItem
                  keys={['Esc']}
                  description="Close modal"
                />
                <ShortcutItem
                  keys={['?']}
                  description="Show shortcuts"
                />
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700 mb-2">Quick Actions</h4>
                <ShortcutItem
                  keys={['↑', '↓']}
                  description="Navigate lists"
                />
                <ShortcutItem
                  keys={['Enter']}
                  description="Select item"
                />
                <ShortcutItem
                  keys={['Tab']}
                  description="Next field"
                />
                <ShortcutItem
                  keys={['Shift', 'Tab']}
                  description="Previous field"
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Press <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">?</kbd> anytime to toggle this help
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ShortcutItem({ keys, description }: { keys: string[], description: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{description}</span>
      <div className="flex gap-1">
        {keys.map((key, i) => (
          <kbd
            key={i}
            className="px-2 py-1 bg-gray-100 rounded text-xs font-mono border border-gray-300"
          >
            {key}
          </kbd>
        ))}
      </div>
    </div>
  )
}
