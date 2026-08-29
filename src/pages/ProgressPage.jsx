import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, TrendingDown, Minus, Calendar, Target,
  Award, Flame, Activity, BarChart2, ArrowRight, Eye, Mic, MessageSquare,
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import Sidebar from '@/components/dashboard/Sidebar';
import StatCard from '@/components/dashboard/StatCard';
import Badge from '@/components/shared/Badge';
import Button from '@/components/shared/Button';

// ─── Mock data ───────────────────────────────────────────────────────────────
const trendData = [
  { label: '15 Jul', score: 58 },
  { label: '22 Jul', score: 63 },
  { label: '29 Jul', score: 60 },
  { label: '05 Aug', score: 68 },
  { label: '08 Aug', score: 72 },
  { label: '10 Aug', score: 72 },
  { label: '12 Aug', score: 76 },
  { label: '14 Aug', score: 79 },
  { label: '16 Aug', score: 84 },
];

const skillData = [
  { subject: 'Content', A: 88 },
  { subject: 'Eye Contact', A: 76 },
  { subject: 'Pace', A: 82 },
  { subject: 'Clarity', A: 90 },
  { subject: 'Fillers', A: 68 },
  { subject: 'Confidence', A: 79 },
];

const barData = [
  { month: 'Jun', sessions: 3 },
  { month: 'Jul', sessions: 5 },
  { month: 'Aug', sessions: 8 },
];

const milestones = [
  { icon: Award, label: 'First 80+ Score', achieved: true, date: '14 Aug' },
  { icon: Flame, label: '5-Day Streak', achieved: true, date: '16 Aug' },
  { icon: Target, label: '10 Sessions', achieved: false, remaining: 2 },
  { icon: TrendingUp, label: 'Score 90+', achieved: false, remaining: null },
];

// ─── Custom tooltip ──────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-elevated border border-border rounded-[8px] px-3 py-2 shadow-lg">
      <p className="text-text-muted text-xs mb-1">{payload[0]?.payload?.label ?? label}</p>
      <p className="text-white text-sm font-semibold">
        Score: <span className="text-accent-violet">{payload[0].value}</span>
      </p>
    </div>
  );
}

function BarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-elevated border border-border rounded-[8px] px-3 py-2 shadow-lg">
      <p className="text-text-muted text-xs mb-1">{label}</p>
      <p className="text-white text-sm font-semibold">
        Sessions: <span className="text-accent-mint">{payload[0].value}</span>
      </p>
    </div>
  );
}

// ─── Skill row ────────────────────────────────────────────────────────────────
function SkillRow({ label, current, previous, icon: Icon }) {
  const diff = current - previous;
  const isUp = diff > 0;
  const isFlat = diff === 0;
  const pct = current;
  const color = current >= 80 ? '#00D4AA' : current >= 60 ? '#FFB347' : '#FF4D6D';

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-border last:border-b-0">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}15` }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-text-primary">{label}</span>
          <div className="flex items-center gap-2">
            {isUp ? (
              <span className="text-xs text-accent-mint font-medium flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" />+{diff}
              </span>
            ) : isFlat ? (
              <span className="text-xs text-text-muted font-medium flex items-center gap-0.5">
                <Minus className="w-3 h-3" />0
              </span>
            ) : (
              <span className="text-xs text-accent-danger font-medium flex items-center gap-0.5">
                <TrendingDown className="w-3 h-3" />{diff}
              </span>
            )}
            <span className="text-sm font-bold text-white w-8 text-right">{current}</span>
          </div>
        </div>
        <div className="h-1.5 bg-bg-elevated rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: `linear-gradient(90deg, #6C63FF, ${color})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function ProgressPage() {
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(false);
  const [period, setPeriod] = useState('3m');

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const revealClass = (delay = 0) =>
    `transition-all duration-500 ease-out ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`;

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />

      <div className="md:ml-[240px] min-h-screen pb-24 md:pb-0">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8 py-8 flex flex-col gap-6">

          {/* ── Header ─────────────────────────────────────────────────── */}
          <div className={revealClass(0)} style={{ transitionDelay: '0ms' }}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-white text-2xl font-bold">Progress Overview</h1>
                <p className="text-text-secondary text-sm mt-0.5">Track your improvement over time</p>
              </div>
              {/* Period selector */}
              <div className="flex gap-1 bg-bg-elevated border border-border rounded-[10px] p-1">
                {['1m', '3m', 'all'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-[8px] transition-all duration-200 ${
                      period === p
                        ? 'bg-accent-violet text-white shadow-[0_0_10px_rgba(108,99,255,0.35)]'
                        : 'text-text-secondary hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {p === 'all' ? 'All time' : p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Stat cards ──────────────────────────────────────────────── */}
          <div
            className={`${revealClass(50)} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`}
            style={{ transitionDelay: '50ms' }}
          >
            <StatCard title="Avg Score" value="74" change="+6 pts" changeType="positive" icon={BarChart2} accentColor="violet" />
            <StatCard title="Sessions Done" value="16" change="+8 this month" changeType="positive" icon={Activity} accentColor="mint" />
            <StatCard title="Current Streak" value="5 days" change="Personal best" changeType="neutral" icon={Flame} accentColor="warning" />
            <StatCard title="Best Score" value="84" change="Aug 16" changeType="positive" icon={Award} accentColor="danger" />
          </div>

          {/* ── Score trend + session frequency ─────────────────────────── */}
          <div
            className={`${revealClass(100)} grid grid-cols-1 lg:grid-cols-3 gap-6`}
            style={{ transitionDelay: '100ms' }}
          >
            {/* Score trend — 2/3 width */}
            <div className="lg:col-span-2 bg-bg-surface border border-border rounded-[12px] p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-white font-bold text-base">Score Trend</h2>
                  <p className="text-text-secondary text-sm mt-0.5">Overall score per session</p>
                </div>
                <Badge variant="success">↑ +26 pts total</Badge>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={trendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="progressGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6C63FF" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#6C63FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2E" vertical={false} />
                  <XAxis dataKey="label" stroke="#555570" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis domain={[40, 100]} stroke="#555570" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6C63FF', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#6C63FF"
                    strokeWidth={2.5}
                    fill="url(#progressGrad)"
                    dot={{ fill: '#6C63FF', stroke: '#F0F0FF', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 7, fill: '#6C63FF', stroke: '#F0F0FF', strokeWidth: 2, style: { filter: 'drop-shadow(0 0 6px rgba(108,99,255,0.6))' } }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Session frequency — 1/3 width */}
            <div className="bg-bg-surface border border-border rounded-[12px] p-6">
              <div className="mb-6">
                <h2 className="text-white font-bold text-base">Sessions / Month</h2>
                <p className="text-text-secondary text-sm mt-0.5">Practice frequency</p>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={barData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2E" vertical={false} />
                  <XAxis dataKey="month" stroke="#555570" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#555570" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip content={<BarTooltip />} cursor={{ fill: 'rgba(108,99,255,0.06)' }} />
                  <Bar dataKey="sessions" fill="#6C63FF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── Skill breakdown + Radar ──────────────────────────────────── */}
          <div
            className={`${revealClass(150)} grid grid-cols-1 lg:grid-cols-2 gap-6`}
            style={{ transitionDelay: '150ms' }}
          >
            {/* Individual skills */}
            <div className="bg-bg-surface border border-border rounded-[12px] p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-bold text-base">Skill Breakdown</h2>
                <span className="text-xs text-text-muted">vs previous session</span>
              </div>
              <SkillRow label="Content Quality" current={88} previous={82} icon={MessageSquare} />
              <SkillRow label="Eye Contact"    current={76} previous={64} icon={Eye} />
              <SkillRow label="Speech Pace"    current={82} previous={80} icon={Mic} />
              <SkillRow label="Clarity"        current={90} previous={88} icon={Activity} />
              <SkillRow label="Filler Words"   current={68} previous={72} icon={Mic} />
              <SkillRow label="Confidence"     current={79} previous={75} icon={Flame} />
            </div>

            {/* Radar chart */}
            <div className="bg-bg-surface border border-border rounded-[12px] p-6">
              <div className="mb-5">
                <h2 className="text-white font-bold text-base">Skills Radar</h2>
                <p className="text-text-secondary text-sm mt-0.5">Overall ability profile</p>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={skillData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                  <PolarGrid stroke="#1E1E2E" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#8888AA', fontSize: 11 }} />
                  <Radar
                    name="Score"
                    dataKey="A"
                    stroke="#6C63FF"
                    fill="#6C63FF"
                    fillOpacity={0.18}
                    strokeWidth={2}
                    dot={{ fill: '#6C63FF', r: 3 }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ── Milestones ──────────────────────────────────────────────── */}
          <div
            className={`${revealClass(200)} bg-bg-surface border border-border rounded-[12px] p-6`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold text-base">Milestones</h2>
              <span className="text-xs text-text-muted">2 of 4 achieved</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {milestones.map((ms, i) => {
                const Icon = ms.icon;
                return (
                  <div
                    key={i}
                    className={`rounded-[10px] p-4 border transition-all duration-200 ${
                      ms.achieved
                        ? 'bg-accent-mint/08 border-accent-mint/25'
                        : 'bg-bg-elevated border-border opacity-60'
                    }`}
                    style={ms.achieved ? { background: 'rgba(0,212,170,0.06)' } : {}}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon
                        className="w-5 h-5"
                        style={{ color: ms.achieved ? '#00D4AA' : '#555570' }}
                      />
                      {ms.achieved && (
                        <span className="text-xs font-semibold text-accent-mint">{ms.date}</span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-text-primary mb-1">{ms.label}</p>
                    {ms.achieved ? (
                      <span className="text-xs text-accent-mint font-medium">✓ Achieved</span>
                    ) : (
                      <span className="text-xs text-text-muted">
                        {ms.remaining ? `${ms.remaining} more to go` : 'In progress'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── CTA ─────────────────────────────────────────────────────── */}
          <div
            className={`${revealClass(250)} relative bg-bg-surface border border-border rounded-[12px] p-6 overflow-hidden`}
            style={{ transitionDelay: '250ms' }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(0,212,170,0.06) 0%, transparent 60%)' }}
            />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">You're improving every session!</h3>
                <p className="text-text-secondary text-sm">Keep practicing to hit your next milestone.</p>
              </div>
              <Button
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => navigate('/practice')}
              >
                Practice Now
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
