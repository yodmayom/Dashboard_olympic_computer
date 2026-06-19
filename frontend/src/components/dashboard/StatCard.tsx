'use client';

import React, { useEffect, useRef, useState } from 'react';

// ============================================================
// Color Variant Gradients
// ============================================================
const COLOR_GRADIENTS: Record<string, string> = {
  indigo: 'linear-gradient(135deg, #6366f1, #818cf8)',
  violet: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
  emerald: 'linear-gradient(135deg, #10b981, #34d399)',
  amber: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
  rose: 'linear-gradient(135deg, #f43f5e, #fb7185)',
  sky: 'linear-gradient(135deg, #0ea5e9, #38bdf8)',
};

// ============================================================
// Props
// ============================================================
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  trend?: { value: number; isPositive: boolean };
  color: 'indigo' | 'violet' | 'emerald' | 'amber' | 'rose' | 'sky';
}

// ============================================================
// StatCard Component
// ============================================================
export default function StatCard({ icon, label, value, trend, color }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Count-up animation from 0 → target value
  useEffect(() => {
    if (value === 0) {
      setDisplayValue(0);
      return;
    }

    const duration = 1200; // ms
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [value]);

  const gradient = COLOR_GRADIENTS[color] ?? COLOR_GRADIENTS.indigo;

  return (
    <div className="glass-card p-5 flex items-start gap-4">
      {/* Icon Container */}
      <div
        className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl text-white"
        style={{ background: gradient }}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-surface-500 truncate">{label}</p>
        <div className="flex items-end gap-2 mt-1">
          <span className="text-2xl font-bold tracking-tight text-foreground">
            {displayValue.toLocaleString()}
          </span>

          {/* Trend Indicator */}
          {trend && (
            <span
              className={`inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md mb-0.5 ${
                trend.isPositive
                  ? 'bg-success-50 text-success-600 dark:bg-[rgba(34,197,94,0.15)] dark:text-[#4ade80]'
                  : 'bg-danger-50 text-danger-600 dark:bg-[rgba(239,68,68,0.15)] dark:text-[#f87171]'
              }`}
            >
              {/* Arrow SVG */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className={trend.isPositive ? '' : 'rotate-180'}
              >
                <path
                  d="M6 2.5V9.5M6 2.5L3 5.5M6 2.5L9 5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {trend.value}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
