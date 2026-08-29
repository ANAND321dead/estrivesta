import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RotateCcw, StopCircle, ChevronDown, ChevronUp } from 'lucide-react';
import LiveMetrics from '@/components/interview/LiveMetrics';
import AnalysisLoader from '@/components/interview/AnalysisLoader';
import Button from '@/components/shared/Button';

const question = 'Tell me about a challenging project you worked on and how you overcame the technical hurdles. Walk me through the problem, your approach, and the outcome.';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function SessionPage() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(0);
  const [showFullQuestion, setShowFullQuestion] = useState(false);
  const [recording, setRecording] = useState(true);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [lookingAway, setLookingAway] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Timer
  useEffect(() => {
    if (!recording) return;
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [recording]);

  // Camera stream
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        // Continue without camera — the UI still works
      }
    };
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  // Simulate face tracking state — toggles looking away every 4-7 seconds
  useEffect(() => {
    if (!recording) return;
    let timeout;
    const scheduleToggle = () => {
      const delay = 4000 + Math.random() * 3000;
      timeout = setTimeout(() => {
        setLookingAway((v) => !v);
        scheduleToggle();
      }, delay);
    };
    scheduleToggle();
    return () => clearTimeout(timeout);
  }, [recording]);

  const handleStop = () => {
    setRecording(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
    setShowAnalysis(true);
  };

  const handleRetake = () => {
    setSeconds(0);
    setRecording(true);
    setShowAnalysis(false);
    // Restart camera
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {}
    };
    startCamera();
  };

  const timerColor = seconds >= 180 ? 'text-accent-danger' : seconds >= 120 ? 'text-accent-warning' : 'text-white';
  const dotColor = seconds >= 180 ? 'bg-accent-danger' : seconds >= 120 ? 'bg-accent-warning' : 'bg-accent-danger';
  const trackingColor = lookingAway ? '#FFB347' : '#00D4AA';

  return (
    <div className="fixed inset-0 bg-bg-primary flex flex-col overflow-hidden">
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-6 py-3 border-b border-border z-20"
        style={{ background: 'rgba(17,17,24,0.85)', backdropFilter: 'blur(12px)' }}
      >
        {/* Left — question */}
        <div className="flex-1 min-w-0 mr-4">
          <div className="flex items-center gap-2">
            <span className="text-text-muted text-xs font-medium flex-shrink-0">Question:</span>
            <p className={`text-sm text-text-secondary truncate ${showFullQuestion ? 'whitespace-normal' : ''}`}>
              {showFullQuestion ? question : question.slice(0, 80) + '...'}
            </p>
            <button
              onClick={() => setShowFullQuestion(!showFullQuestion)}
              className="text-accent-violet hover:underline text-xs flex-shrink-0"
            >
              {showFullQuestion ? (
                <span className="flex items-center gap-0.5">Show less <ChevronUp className="w-3 h-3" /></span>
              ) : (
                <span className="flex items-center gap-0.5">Show full <ChevronDown className="w-3 h-3" /></span>
              )}
            </button>
          </div>
        </div>

        {/* Right — REC indicator + timer */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className={`w-2.5 h-2.5 rounded-full ${dotColor} animate-pulse`} />
          <span className="text-xs font-semibold text-accent-danger tracking-wide">REC</span>
          <span className={`text-lg font-mono font-semibold ${timerColor} ml-2`}>
            {formatTime(seconds)}
          </span>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 overflow-hidden">
        {/* Left — webcam */}
        <div className="flex flex-col gap-3 lg:w-[65%] h-full">
          {/* Video */}
          <div className="relative flex-1 rounded-[16px] overflow-hidden border-2 border-accent-violet min-h-0" style={{ boxShadow: '0 0 30px rgba(108,99,255,0.25)' }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />

            {/* REC badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent-danger/90 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white text-xs font-semibold tracking-wide">REC</span>
            </div>

            {/* Face tracking overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="rounded-[20%] border-2 transition-colors duration-500"
                style={{
                  width: '32%',
                  height: '60%',
                  borderColor: trackingColor,
                  boxShadow: `0 0 20px ${trackingColor}40`,
                  animation: 'pulseTrack 2s ease-in-out infinite',
                }}
              />
            </div>

            {/* Tracking status label */}
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-md bg-bg-primary/70 backdrop-blur-sm">
              <span className="text-xs font-medium" style={{ color: trackingColor }}>
                {lookingAway ? 'Looking away' : 'Looking at camera'}
              </span>
            </div>
          </div>

          {/* Current question card */}
          <div className="bg-bg-surface border border-border rounded-[12px] p-4 flex-shrink-0">
            <p className="text-text-secondary text-xs mb-1.5 font-medium">Current Question</p>
            <p className="text-white text-sm leading-relaxed">{question}</p>
          </div>
        </div>

        {/* Right — live metrics */}
        <div className="lg:w-[35%] bg-bg-surface border border-border rounded-[16px] p-5 overflow-y-auto flex-shrink-0">
          <LiveMetrics />
        </div>
      </div>

      {/* Bottom bar */}
      <footer
        className="flex items-center justify-between px-6 py-4 border-t border-border z-20"
        style={{ background: 'rgba(17,17,24,0.85)', backdropFilter: 'blur(12px)' }}
      >
        {/* Left — retake */}
        <Button variant="ghost" size="md" icon={<RotateCcw className="w-4 h-4" />} onClick={handleRetake}>
          Retake
        </Button>

        {/* Center — stop */}
        <button
          onClick={handleStop}
          className="inline-flex items-center gap-2 bg-accent-danger text-white font-semibold rounded-[8px] px-8 py-3.5 text-base hover:shadow-[0_0_20px_rgba(255,77,109,0.4)] transition-all duration-200 cursor-pointer"
        >
          <StopCircle className="w-5 h-5" />
          Stop & Analyze
        </button>

        {/* Right — duration hint */}
        <span className="text-text-muted text-xs hidden sm:block">Aim for 90-120 seconds</span>
      </footer>

      {/* Analysis overlay */}
      {showAnalysis && <AnalysisLoader />}

      <style>{`
        @keyframes pulseTrack {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
