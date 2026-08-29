import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Loader2, CheckCircle } from 'lucide-react';

const steps = [
  { label: 'Transcribing your audio...', delay: 1200 },
  { label: 'Analyzing speech patterns...', delay: 2500 },
  { label: 'Evaluating eye contact...', delay: 3800 },
  { label: 'Scoring content quality...', delay: 5000 },
  { label: 'Generating your feedback...', delay: 6200 },
];

export default function AnalysisLoader() {
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState(0);
  const [progress, setProgress] = useState(0);
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const timers = steps.map((step, index) =>
      setTimeout(() => setCompletedSteps(index + 1), step.delay)
    );

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 100 / 65;
      });
    }, 100);

    // Navigate after all steps complete
    const navTimer = setTimeout(() => {
      setRedirecting(true);
      setTimeout(() => navigate('/results'), 800);
    }, 7000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(navTimer);
      clearInterval(progressInterval);
    };
  }, [navigate]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
      style={{ background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className="relative w-full max-w-[480px] bg-bg-surface border border-border rounded-[16px] p-8"
        style={{ boxShadow: '0 0 60px rgba(108,99,255,0.3), 0 0 0 1px rgba(108,99,255,0.1)' }}
      >
        {/* Shimmer border effect */}
        <div
          className="absolute inset-0 rounded-[16px] pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(0,212,170,0.15))',
            padding: 1,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />

        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <Zap className="w-5 h-5 text-accent-violet" fill="#6C63FF" />
          <span className="text-white font-bold text-lg">InterviewAI</span>
        </div>

        {/* Heading */}
        <h2 className="text-white text-2xl font-bold mb-1">
          {redirecting ? 'Redirecting to your report...' : 'Analyzing your response...'}
        </h2>
        {!redirecting && (
          <p className="text-text-secondary text-sm mb-6">This takes about 30-60 seconds</p>
        )}

        {/* Steps */}
        <div className="flex flex-col gap-3.5 mb-6">
          {steps.map((step, index) => {
            const isDone = index < completedSteps;
            const isPending = index === completedSteps && !redirecting;
            return (
              <div key={index} className="flex items-center gap-3">
                {isDone ? (
                  <CheckCircle className="w-5 h-5 text-accent-mint flex-shrink-0" />
                ) : isPending ? (
                  <Loader2 className="w-5 h-5 text-accent-violet flex-shrink-0 animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-border flex-shrink-0" />
                )}
                <span
                  className={`text-sm transition-colors duration-300 ${
                    isDone ? 'text-text-primary' : isPending ? 'text-text-secondary' : 'text-text-muted'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full bg-bg-elevated overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: 'linear-gradient(90deg, #6C63FF, #00D4AA)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
