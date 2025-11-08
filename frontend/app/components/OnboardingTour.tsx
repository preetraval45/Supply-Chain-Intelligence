'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface TourStep {
  id: string;
  title: string;
  description: string;
  target?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  highlightPadding?: number;
}

interface TourContextType {
  currentStep: number;
  isActive: boolean;
  startTour: () => void;
  skipTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  completeTour: () => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

const TOUR_STEPS: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to CODE RUN',
    description: 'Discover how to leverage AI agents to automate your disruption monitoring and enhance your analytical capabilities. Let us guide you through the key features!',
    target: undefined,
    position: 'bottom',
  },
  {
    id: 'agents',
    title: 'AI Agents',
    description: 'Deploy intelligent AI agents to continuously monitor and analyze disruptions. Each agent specializes in different aspects of your business operations.',
    target: 'agents-nav',
    position: 'bottom',
    highlightPadding: 8,
  },
  {
    id: 'map',
    title: 'Disruption Map',
    description: 'Visualize disruptions geographically. See real-time data on your interactive map showing impact areas and severity levels.',
    target: 'map-section',
    position: 'bottom',
    highlightPadding: 8,
  },
  {
    id: 'alerts',
    title: 'Alert System',
    description: 'Stay informed with intelligent alerts. Configure notification preferences to get updates when critical disruptions occur.',
    target: 'alerts-section',
    position: 'bottom',
    highlightPadding: 8,
  },
  {
    id: 'analytics',
    title: 'Analytics Dashboard',
    description: 'Dive deep into comprehensive analytics. Track metrics, trends, and patterns to make data-driven decisions.',
    target: 'analytics-nav',
    position: 'bottom',
    highlightPadding: 8,
  },
  {
    id: 'darkmode',
    title: 'Dark Mode',
    description: 'Toggle between light and dark themes for optimal viewing comfort at any time of day.',
    target: 'darkmode-toggle',
    position: 'left',
    highlightPadding: 6,
  },
  {
    id: 'shortcuts',
    title: 'Keyboard Shortcuts',
    description: 'Speed up your workflow with keyboard shortcuts. Press "?" to see all available shortcuts anytime.',
    target: 'shortcuts-button',
    position: 'left',
    highlightPadding: 6,
  },
];

export const OnboardingTourProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [hasSeenTour, setHasSeenTour] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('coderun_tour_completed');
    if (!saved) {
      setHasSeenTour(false);
      setIsActive(true);
    }
  }, []);

  const startTour = useCallback(() => {
    setCurrentStep(0);
    setIsActive(true);
    localStorage.removeItem('coderun_tour_completed');
  }, []);

  const skipTour = useCallback(() => {
    setIsActive(false);
    setCurrentStep(0);
    localStorage.setItem('coderun_tour_completed', 'true');
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const completeTour = useCallback(() => {
    setIsActive(false);
    setCurrentStep(0);
    localStorage.setItem('coderun_tour_completed', 'true');
  }, []);

  const value: TourContextType = {
    currentStep,
    isActive,
    startTour,
    skipTour,
    nextStep,
    prevStep,
    completeTour,
  };

  return (
    <TourContext.Provider value={value}>
      {children}
      {isActive && <OnboardingOverlay />}
    </TourContext.Provider>
  );
};

export const useTour = (): TourContextType => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within OnboardingTourProvider');
  }
  return context;
};

interface HighlightBox {
  top: number;
  left: number;
  width: number;
  height: number;
}

const OnboardingOverlay: React.FC = () => {
  const { currentStep, nextStep, prevStep, skipTour } = useTour();
  const [highlightBox, setHighlightBox] = useState<HighlightBox>({ top: 0, left: 0, width: 0, height: 0 });
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const step = TOUR_STEPS[currentStep];

  useEffect(() => {
    const updateHighlight = () => {
      if (step.target) {
        const element = document.getElementById(step.target);
        if (element) {
          const rect = element.getBoundingClientRect();
          const padding = step.highlightPadding || 8;

          setHighlightBox({
            top: rect.top - padding,
            left: rect.left - padding,
            width: rect.width + padding * 2,
            height: rect.height + padding * 2,
          });

          calculateTooltipPosition(rect);
        }
      } else {
        setHighlightBox({ top: 0, left: 0, width: 0, height: 0 });
        setTooltipPosition({
          top: window.innerHeight / 2 - 100,
          left: window.innerWidth / 2 - 150,
        });
      }
    };

    const calculateTooltipPosition = (rect: DOMRect) => {
      const padding = 20;
      const tooltipWidth = 320;
      const tooltipHeight = 200;
      let top = rect.top - tooltipHeight - padding;
      let left = rect.left + rect.width / 2 - tooltipWidth / 2;

      if (top < padding) {
        top = rect.bottom + padding;
      }

      if (left < padding) {
        left = padding;
      } else if (left + tooltipWidth > window.innerWidth - padding) {
        left = window.innerWidth - tooltipWidth - padding;
      }

      setTooltipPosition({ top, left });
    };

    updateHighlight();
    window.addEventListener('resize', updateHighlight);
    return () => window.removeEventListener('resize', updateHighlight);
  }, [currentStep, step]);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const isLastStep = currentStep === TOUR_STEPS.length - 1;

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 z-40 transition-colors duration-300"
        style={{
          backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(2px)',
        }}
      />

      {/* Highlight Circle */}
      {step.target && (
        <div
          className="fixed z-50 transition-all duration-300"
          style={{
            top: highlightBox.top,
            left: highlightBox.left,
            width: highlightBox.width,
            height: highlightBox.height,
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)',
            borderRadius: '8px',
            border: '2px solid rgba(59, 130, 246, 0.5)',
            pointerEvents: 'none',
          }}
        >
          {/* Animated pulse ring */}
          <div
            className="absolute inset-0 rounded-lg animate-pulse"
            style={{
              border: '2px solid rgba(59, 130, 246, 0.8)',
              animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            }}
          />
        </div>
      )}

      {/* Tooltip Card */}
      <div
        className="fixed z-50 w-80 transition-all duration-300"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
        }}
      >
        <div
          className={`relative rounded-xl shadow-2xl border backdrop-blur-sm ${
            isDarkMode
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-slate-200'
          }`}
        >
          {/* Arrow pointer */}
          <div
            className={`absolute w-4 h-4 transform rotate-45 ${
              isDarkMode ? 'bg-slate-800 border-t border-l border-slate-700' : 'bg-white border-t border-l border-slate-200'
            }`}
            style={{
              top: step.target ? '-8px' : 'auto',
              left: step.target ? '50%' : 'auto',
              marginLeft: step.target ? '-8px' : 'auto',
            }}
          />

          {/* Content */}
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <h3
                className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}
              >
                {step.title}
              </h3>
              <button
                onClick={skipTour}
                className={`p-1 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'hover:bg-slate-700 text-slate-400 hover:text-slate-200'
                    : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
                aria-label="Close tour"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Description */}
            <p
              className={`text-sm leading-relaxed mb-5 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              {step.description}
            </p>

            {/* Progress Indicator */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-1">
                {TOUR_STEPS.map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index <= currentStep
                        ? 'w-4 bg-gradient-to-r from-blue-500 to-blue-600'
                        : isDarkMode
                          ? 'w-2 bg-slate-600'
                          : 'w-2 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span
                className={`text-xs font-semibold ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                {currentStep + 1} of {TOUR_STEPS.length}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={skipTour}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isDarkMode
                    ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
                Skip
              </button>

              <div className="flex-1" />

              {currentStep > 0 && (
                <button
                  onClick={prevStep}
                  className="p-2 rounded-lg transition-colors bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white"
                  aria-label="Previous step"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
              )}

              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
              >
                {isLastStep ? (
                  <>
                    Let's go
                    <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </>
                ) : (
                  <>
                    Next
                    <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx global>{`
        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.8);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }
      `}</style>
    </>
  );
};

// TourButton Component - Use this to manually trigger the tour
export const TourButton: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { startTour } = useTour();

  return (
    <button
      onClick={startTour}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl ${className}`}
      title="Start product tour"
    >
      <span>Help</span>
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );
};

export default OnboardingTourProvider;
