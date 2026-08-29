import { useState, useEffect, useRef } from 'react';
import { Activity, Lightbulb } from 'lucide-react';

const tips = [
  'Look at your camera',
  'Slow down',
  'Use the STAR method',
  'Pause instead of saying um',
];

function CircularGauge({ value, label }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value > 75 ? '#00D4AA' : value >= 50 ? '#FFB347' : '#FF4D6D';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="#1E1E2E" strokeWidth="6" />
          <circle
            cx="40" cy="40" r={radius} fill="none" stroke={color} strokeWidth="6"
            strokeLinecap="round" strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s ease, stroke 0.5s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">{value}%</span>
        </div>
      </div>
      <span className="text-xs text-text-secondary">{label}</span>
    </div>
  );
}

function VolumeBars() {
  const [bars, setBars] = useState([20, 35, 50, 35, 20]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBars((prev) => prev.map(() => Math.random() * 70 + 15));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end justify-center gap-1.5 h-12">
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-2 rounded-full bg-accent-mint transition-all duration-200"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
      <span className="text-xs text-text-secondary text-center">Microphone</span>
    </div>
  );
}

export default function LiveMetrics() {
  const [eyeContact, setEyeContact] = useState(82);
  const [pace, setPace] = useState('good');
  const [fillerCount, setFillerCount] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);
  const lookingAway = useRef(false);

  // Eye contact simulation — changes every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      lookingAway.current = Math.random() > 0.7;
      const base = lookingAway.current ? 45 + Math.random() * 20 : 75 + Math.random() * 20;
      setEyeContact(Math.round(base));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Speech pace simulation — changes every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const r = Math.random();
      if (r > 0.7) setPace('fast');
      else if (r > 0.45) setPace('good');
      else if (r > 0.2) setPace('slow');
      else setPace('good');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Filler words counter — random interval 8-12 seconds
  useEffect(() => {
    let timeout;
    const scheduleNext = () => {
      const delay = 8000 + Math.random() * 4000;
      timeout = setTimeout(() => {
        setFillerCount((c) => c + 1);
        scheduleNext();
      }, delay);
    };
    scheduleNext();
    return () => clearTimeout(timeout);
  }, []);

  // Rotating tips — every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((i) => (i + 1) % tips.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const paceConfig = {
    good: { label: 'Good Pace ✓', variant: 'bg-accent-mint/15 text-accent-mint border-accent-mint/30' },
    fast: { label: 'Too Fast ⚡', variant: 'bg-accent-warning/15 text-accent-warning border-accent-warning/30' },
    slow: { label: 'Too Slow 🐌', variant: 'bg-bg-elevated text-text-muted border-border' },
  };
  const paceInfo = paceConfig[pace];

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-5 h-5 text-accent-violet" />
          <h2 className="text-white text-lg font-bold">Live Analysis</h2>
        </div>
        <p className="text-text-secondary text-xs">AI is analyzing your response in real time</p>
      </div>

      {/* Eye contact gauge */}
      <div className="bg-bg-elevated border border-border rounded-[12px] p-4 flex items-center justify-between">
        <CircularGauge value={eyeContact} label="Eye Contact" />
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs text-text-muted">Status</span>
          <span className={`text-sm font-medium ${eyeContact > 75 ? 'text-accent-mint' : eyeContact >= 50 ? 'text-accent-warning' : 'text-accent-danger'}`}>
            {eyeContact > 75 ? 'On track' : eyeContact >= 50 ? 'Looking away' : 'Needs focus'}
          </span>
        </div>
      </div>

      {/* Speech pace */}
      <div className="bg-bg-elevated border border-border rounded-[12px] p-4">
        <span className="text-xs text-text-secondary block mb-2">Speech Pace</span>
        <span className={`inline-flex items-center px-3 py-1.5 rounded-full border text-sm font-medium ${paceInfo.variant}`}>
          {paceInfo.label}
        </span>
      </div>

      {/* Filler words */}
      <div className="bg-bg-elevated border border-border rounded-[12px] p-4 flex items-center justify-between">
        <div>
          <span className="text-xs text-text-secondary block mb-1">Filler Words</span>
          <span className={`text-3xl font-bold ${fillerCount > 5 ? 'text-accent-danger' : 'text-white'}`}>
            {fillerCount}
          </span>
        </div>
        {fillerCount > 5 && (
          <span className="text-xs text-accent-danger font-medium">Try to pause instead</span>
        )}
      </div>

      {/* Volume meter */}
      <div className="bg-bg-elevated border border-border rounded-[12px] p-4">
        <VolumeBars />
      </div>

      {/* Tips card */}
      <div className="bg-bg-elevated border border-border rounded-[12px] p-4 mt-auto">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-accent-warning" />
          <span className="text-sm font-semibold text-white">Quick Tips</span>
        </div>
        <p key={tipIndex} className="text-sm text-text-secondary" style={{ animation: 'fadeInUp 0.4s ease' }}>
          {tips[tipIndex]}
        </p>
      </div>
    </div>
  );
}
