'use client';

import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  showLabel?: boolean;
  className?: string;
}

export default function ProgressBar({
  percentage,
  label,
  showLabel = true,
  className = '',
}: ProgressBarProps) {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    // Delay to trigger CSS transition animation on mount
    const timer = setTimeout(() => {
      setAnimatedWidth(Math.min(Math.max(percentage, 0), 100));
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  /**
   * Determine the fill gradient based on the current percentage:
   * - Below 30%: reddish tones (danger)
   * - 30% – 70%: indigo-to-violet (default theme gradient)
   * - Above 70%: greenish tones (success)
   */
  const getFillStyle = (): React.CSSProperties => {
    if (percentage < 30) {
      return {
        background: 'linear-gradient(90deg, #ef4444, #f97316)',
        width: `${animatedWidth}%`,
      };
    }
    if (percentage > 70) {
      return {
        background: 'linear-gradient(90deg, #22c55e, #10b981)',
        width: `${animatedWidth}%`,
      };
    }
    // Default: primary-to-accent gradient defined in globals.css
    return { width: `${animatedWidth}%` };
  };

  const getPercentageColor = (): string => {
    if (percentage < 30) return 'text-red-500';
    if (percentage > 70) return 'text-green-500';
    return 'text-primary-500';
  };

  return (
    <div className={`w-full ${className}`}>
      {label && showLabel && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-surface-600 dark:text-surface-400">
            {label}
          </span>
          <span className={`text-sm font-bold ${getPercentageColor()}`}>
            {percentage}%
          </span>
        </div>
      )}
      <div className="flex items-center gap-3">
        <div className="progress-bar-container flex-1">
          <div
            className="progress-bar-fill"
            style={getFillStyle()}
          />
        </div>
        {/* Show inline percentage when there is no label row */}
        {(!label || !showLabel) && (
          <span className={`text-xs font-bold min-w-[36px] text-right ${getPercentageColor()}`}>
            {percentage}%
          </span>
        )}
      </div>
    </div>
  );
}
