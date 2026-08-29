import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function StatCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  accentColor = 'violet',
}) {
  const accentMap = {
    violet: 'text-accent-violet bg-accent-violet/15',
    mint: 'text-accent-mint bg-accent-mint/15',
    warning: 'text-accent-warning bg-accent-warning/15',
    danger: 'text-accent-danger bg-accent-danger/15',
  };

  const changeColorMap = {
    positive: 'text-accent-mint',
    negative: 'text-accent-danger',
    neutral: 'text-text-muted',
  };

  const ChangeIcon =
    changeType === 'positive' ? ArrowUpRight : changeType === 'negative' ? ArrowDownRight : Minus;

  const [iconClass, changeClass] = [accentMap[accentColor], changeColorMap[changeType]];

  return (
    <div className="relative bg-bg-surface border border-border rounded-[12px] p-5 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-violet/50 hover:shadow-[0_0_20px_rgba(108,99,255,0.15)]">
      {/* Top accent strip */}
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] ${accentMap[accentColor].split(' ').pop()}`}
      />

      {/* Top row: title + icon */}
      <div className="flex items-start justify-between mb-4 mt-1">
        <span className="text-text-secondary text-xs uppercase tracking-wide font-medium">
          {title}
        </span>
        {Icon && (
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconClass}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Value */}
      <p className="text-white text-4xl font-bold mb-3">{value}</p>

      {/* Change indicator */}
      <div className="flex items-center gap-1.5">
        <ChangeIcon className={`w-4 h-4 ${changeClass}`} />
        <span className={`text-sm font-medium ${changeClass}`}>{change}</span>
        <span className="text-text-muted text-xs ml-1">vs last month</span>
      </div>
    </div>
  );
}
