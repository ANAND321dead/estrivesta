import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap, Download, Share2, RotateCcw, ArrowRight,
  Clock, Mic, Eye, MessageSquare, TrendingUp, Calendar,
} from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import ScoreRing from '@/components/results/ScoreRing';
import ScoreBar from '@/components/results/ScoreBar';
import FeedbackCards from '@/components/results/FeedbackCards';
import TranscriptView from '@/components/results/TranscriptView';

// ─── Mock session result data ────────────────────────────────────────────────
const sessionResult = {
  date: '16 Aug 2025',
  role: 'Software Engineer',
  question: 'Tell me about a challenging project you worked on and how you overcame the technical hurdles.',
  duration: '1:12',
  overallScore: 84,
  subScores: [
    { label: 'Content Quality', score: 88, icon: MessageSquare },
    { label: 'Eye Contact', score: 76, icon: Eye },
    { label: 'Speech Pace', score: 82, icon: Mic },
    { label: 'Clarity & Structure', score: 90, icon: TrendingUp },
    { label: 'Filler Words', score: 68, icon: Mic },
    { label: 'Confidence', score: 79, icon: Zap },
  ],
};

function MetaChip({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2 bg-bg-elevated border border-border rounded-[8px] px-3 py-2">
      <Icon className="w-4 h-4 text-text-muted flex-shrink-0" />
      <span className="text-xs text-text-muted">{label}:</span>
      <span className="text-xs font-semibold text-text-primary">{value}</span>
    </div>
  );
}

export default function ResultsPage() {
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState('feedback');

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const revealClass = (delay = 0) =>
    `transition-all duration-500 ease-out ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`;

  const tabs = [
    { id: 'feedback', label: 'Feedback' },
    { id: 'breakdown', label: 'Score Breakdown' },
    { id: 'transcript', label: 'Transcript' },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />

      <div className="md:ml-[240px] min-h-screen pb-24 md:pb-0">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-8 flex flex-col gap-6">

          {/* ── Header ───────────────────────────────────────────────── */}
          <div
            className={revealClass(0)}
            style={{ transitionDelay: '0ms' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-text-muted text-sm">Session Result</span>
                  <span className="text-text-muted">/</span>
                  <Badge variant="default">{sessionResult.role}</Badge>
                </div>
                <h1 className="text-white text-2xl font-bold">Session Report</h1>
                <p className="text-text-secondary text-sm mt-0.5">{sessionResult.date}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Button variant="ghost" size="sm" icon={<Share2 className="w-4 h-4" />}>
                  Share
                </Button>
                <Button variant="ghost" size="sm" icon={<Download className="w-4 h-4" />}>
                  Export PDF
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={<RotateCcw className="w-4 h-4" />}
                  onClick={() => navigate('/practice')}
                >
                  Practice Again
                </Button>
              </div>
            </div>
          </div>

          {/* ── Session metadata chips ────────────────────────────────── */}
          <div
            className={`${revealClass(50)} flex flex-wrap gap-2`}
            style={{ transitionDelay: '50ms' }}
          >
            <MetaChip icon={Calendar} label="Date" value={sessionResult.date} />
            <MetaChip icon={Clock} label="Duration" value={sessionResult.duration} />
            <MetaChip icon={MessageSquare} label="Role" value={sessionResult.role} />
          </div>

          {/* ── Question card ─────────────────────────────────────────── */}
          <div
            className={`${revealClass(100)} bg-bg-surface border border-border rounded-[12px] p-5 relative overflow-hidden`}
            style={{ transitionDelay: '100ms' }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.04) 0%, transparent 60%)' }}
            />
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-accent-violet rounded-r-full" />
            <div className="relative pl-3">
              <p className="text-text-muted text-xs font-medium mb-1.5 uppercase tracking-wide">Question Asked</p>
              <p className="text-text-primary text-sm leading-relaxed">{sessionResult.question}</p>
            </div>
          </div>

          {/* ── Score ring + sub-score bars ───────────────────────────── */}
          <div
            className={`${revealClass(150)} bg-bg-surface border border-border rounded-[12px] p-6`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Ring */}
              <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-2">
                <ScoreRing
                  score={sessionResult.overallScore}
                  size={168}
                  label="Overall Score"
                  animate={revealed}
                />
                <div className="mt-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-accent-mint" />
                  <span className="text-xs text-accent-mint font-medium">+6 pts from last session</span>
                </div>
              </div>

              {/* Sub-scores */}
              <div className="flex-1 flex flex-col gap-4 w-full">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-white font-bold text-base">Score Breakdown</h2>
                  <span className="text-xs text-text-muted">Out of 100</span>
                </div>
                {sessionResult.subScores.map((item, i) => (
                  <ScoreBar
                    key={item.label}
                    label={item.label}
                    score={item.score}
                    delay={revealed ? i * 80 : 0}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Tabs ─────────────────────────────────────────────────── */}
          <div
            className={revealClass(200)}
            style={{ transitionDelay: '200ms' }}
          >
            {/* Tab pills */}
            <div className="flex gap-1 bg-bg-elevated border border-border rounded-[10px] p-1 w-fit mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-[8px] transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-accent-violet text-white shadow-[0_0_12px_rgba(108,99,255,0.35)]'
                      : 'text-text-secondary hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === 'feedback' && <FeedbackCards />}

            {activeTab === 'breakdown' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sessionResult.subScores.map((item, i) => {
                  const Icon = item.icon;
                  const color =
                    item.score >= 80 ? '#00D4AA' :
                    item.score >= 60 ? '#FFB347' :
                    '#FF4D6D';
                  return (
                    <div
                      key={item.label}
                      className="bg-bg-surface border border-border rounded-[12px] p-5 flex flex-col gap-4 hover:-translate-y-0.5 hover:border-accent-violet/50 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{ background: `${color}18` }}
                        >
                          <Icon className="w-4 h-4" style={{ color }} />
                        </div>
                        <span className="text-3xl font-bold text-white">{item.score}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-primary mb-2">{item.label}</p>
                        <ScoreBar label="" score={item.score} showValue={false} delay={i * 60} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'transcript' && <TranscriptView fillerCount={7} />}
          </div>

          {/* ── CTA banner ────────────────────────────────────────────── */}
          <div
            className={`${revealClass(250)} relative bg-bg-surface border border-border rounded-[12px] p-6 overflow-hidden`}
            style={{ transitionDelay: '250ms' }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.08) 0%, rgba(0,212,170,0.04) 100%)' }}
            />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Keep the momentum going!</h3>
                <p className="text-text-secondary text-sm">Your next session will build on these insights.</p>
              </div>
              <Button
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => navigate('/practice')}
              >
                Start Next Session
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
