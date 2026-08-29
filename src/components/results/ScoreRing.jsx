import { useEffect, useState } from 'react';

/**
 * ScoreRing — large animated circular gauge for the ResultsPage.
 * Mirrors the CircularGauge in LiveMetrics but at a larger scale with
 * a two-ring design, gradient stroke, and entrance animation.
 */
export default function ScoreRing({ score = 0, size = 160, label = 'Overall Score', animate = true }) {
  const [displayed, setDisplayed] = useState(animate ? 0 : score);

  // Count-up animation
  useEffect(() => {
    if (!animate) { setDisplayed(score); return; }
    const duration = 1200;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), score);
      setDisplayed(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [score, animate]);

  const radius = size / 2 - 14;
  const circumference = 2 * Math.PI * radius;
  const trackRadius = size / 2 - 24;
  const trackCircumference = 2 * Math.PI * trackRadius;

  // Color based on score threshold
  const color =
    displayed >= 80 ? '#00D4AA' :
    displayed >= 60 ? '#FFB347' :
    '#FF4D6D';

  const gradientId = `scoreRingGrad-${label.replace(/\s/g, '')}`;

  const outerOffset = circumference - (displayed / 100) * circumference;
  const innerOffset = trackCircumference - (displayed / 100) * trackCircumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6C63FF" />
              <stop offset="100%" stopColor={color} />
            </linearGradient>
          </defs>

          {/* Outer track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#1E1E2E"
            strokeWidth="10"
          />
          {/* Outer progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={outerOffset}
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
          />

          {/* Inner track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={trackRadius}
            fill="none"
            stroke="#16161F"
            strokeWidth="6"
          />
          {/* Inner progress (opacity trail) */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={trackRadius}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={trackCircumference}
            strokeDashoffset={innerOffset}
            style={{
              transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1) 0.1s',
              opacity: 0.25,
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <span
            className="font-bold text-white leading-none"
            style={{ fontSize: size * 0.22 }}
          >
            {displayed}
          </span>
          <span
            className="text-text-muted font-medium"
            style={{ fontSize: size * 0.09 }}
          >
            /100
          </span>
        </div>
      </div>

      {/* Label */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-semibold text-text-primary">{label}</span>
        <span
          className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
          style={{
            background: `${color}18`,
            color,
            border: `1px solid ${color}40`,
          }}
        >
          {displayed >= 80 ? 'Excellent' : displayed >= 60 ? 'Good' : 'Needs Work'}
        </span>
      </div>
    </div>
  );
}
