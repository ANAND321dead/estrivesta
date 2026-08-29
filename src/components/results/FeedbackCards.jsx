import { CheckCircle2, AlertTriangle, XCircle, Lightbulb, Star } from 'lucide-react';

/**
 * FeedbackCards — renders categorised feedback panels.
 * Follows the bg-bg-elevated / border-border card pattern from LiveMetrics.
 */

const categoryConfig = {
  strength: {
    Icon: CheckCircle2,
    title: 'Strengths',
    color: '#00D4AA',
    bg: 'rgba(0,212,170,0.08)',
    border: 'rgba(0,212,170,0.25)',
    badge: 'bg-accent-mint/10 text-accent-mint border-accent-mint/30',
  },
  improvement: {
    Icon: AlertTriangle,
    title: 'Areas to Improve',
    color: '#FFB347',
    bg: 'rgba(255,179,71,0.08)',
    border: 'rgba(255,179,71,0.25)',
    badge: 'bg-accent-warning/10 text-accent-warning border-accent-warning/30',
  },
  critical: {
    Icon: XCircle,
    title: 'Critical Issues',
    color: '#FF4D6D',
    bg: 'rgba(255,77,109,0.08)',
    border: 'rgba(255,77,109,0.25)',
    badge: 'bg-accent-danger/10 text-accent-danger border-accent-danger/30',
  },
  tips: {
    Icon: Lightbulb,
    title: 'AI Tips for Next Time',
    color: '#6C63FF',
    bg: 'rgba(108,99,255,0.08)',
    border: 'rgba(108,99,255,0.25)',
    badge: 'bg-accent-violet/10 text-accent-violet border-accent-violet/30',
  },
};

function FeedbackCard({ type = 'strength', items = [] }) {
  const cfg = categoryConfig[type];
  const { Icon, title, color, bg, border } = cfg;

  if (!items.length) return null;

  return (
    <div
      className="rounded-[12px] p-5 border"
      style={{ background: bg, borderColor: border }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}18` }}
        >
          <Icon className="w-4 h-4" style={{ color }} />
        </div>
        <span className="text-sm font-bold text-text-primary">{title}</span>
        <span
          className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full border"
          style={{ background: `${color}15`, color, borderColor: `${color}40` }}
        >
          {items.length}
        </span>
      </div>

      {/* Items */}
      <ul className="flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: color }}
            />
            <span className="text-sm text-text-secondary leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function KeyHighlight({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-bg-elevated border border-border rounded-[10px] p-4 flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18` }}
      >
        <Icon className="w-4 h-4" style={{ color }} />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-xs text-text-muted font-medium">{label}</span>
        <span className="text-sm font-bold text-white truncate">{value}</span>
      </div>
    </div>
  );
}

export default function FeedbackCards({ feedback }) {
  const defaultFeedback = {
    strengths: [
      'Strong use of the STAR method — situation and task were clearly defined.',
      'Confident tone maintained throughout most of the response.',
      'Good use of specific metrics (e.g., "reduced latency by 40%").',
    ],
    improvements: [
      'Reduce filler words — "um" and "like" appeared 7 times during the answer.',
      'Maintain eye contact with the camera more consistently.',
      'Slow down speech pace during key technical explanations.',
    ],
    critical: [],
    tips: [
      'Practice the ending of your answer — conclusions felt rushed.',
      'Try pausing for 2 seconds before starting to gather your thoughts.',
      'Use a stronger closing line that ties back to the role\'s requirements.',
    ],
  };

  const f = feedback || defaultFeedback;

  return (
    <div className="flex flex-col gap-5">
      {/* Key highlights row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <KeyHighlight
          icon={Star}
          label="Best Skill"
          value="Storytelling"
          color="#6C63FF"
        />
        <KeyHighlight
          icon={CheckCircle2}
          label="Top Strength"
          value="STAR Method"
          color="#00D4AA"
        />
        <KeyHighlight
          icon={AlertTriangle}
          label="Focus Area"
          value="Filler Words"
          color="#FFB347"
        />
      </div>

      {/* Main feedback cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FeedbackCard type="strength" items={f.strengths} />
        <FeedbackCard type="improvement" items={f.improvements} />
        {f.critical && f.critical.length > 0 && (
          <FeedbackCard type="critical" items={f.critical} />
        )}
        <FeedbackCard type="tips" items={f.tips} />
      </div>
    </div>
  );
}
