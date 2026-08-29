/**
 * ScoreBar — horizontal animated progress bar for individual sub-scores.
 * Matches the design language of StatCard / Badge with color-coded fills.
 */
export default function ScoreBar({ label, score = 0, maxScore = 100, delay = 0, showValue = true }) {
  // Color based on percentage
  const pct = Math.min((score / maxScore) * 100, 100);
  const color =
    pct >= 80 ? '#00D4AA' :
    pct >= 60 ? '#FFB347' :
    '#FF4D6D';

  const bgColor =
    pct >= 80 ? 'rgba(0,212,170,0.12)' :
    pct >= 60 ? 'rgba(255,179,71,0.12)' :
    'rgba(255,77,109,0.12)';

  const borderColor =
    pct >= 80 ? 'rgba(0,212,170,0.3)' :
    pct >= 60 ? 'rgba(255,179,71,0.3)' :
    'rgba(255,77,109,0.3)';

  const label2 =
    pct >= 80 ? 'Excellent' :
    pct >= 60 ? 'Good' :
    'Needs Work';

  return (
    <div className="flex flex-col gap-2">
      {/* Row: label + value badge */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-primary">{label}</span>
        {showValue && (
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-semibold px-2.5 py-0.5 rounded-full border"
              style={{ background: bgColor, color, borderColor }}
            >
              {label2}
            </span>
            <span className="text-sm font-bold text-white font-mono w-10 text-right">
              {score}
            </span>
          </div>
        )}
      </div>

      {/* Track */}
      <div className="h-2.5 rounded-full bg-bg-elevated overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, #6C63FF, ${color})`,
            boxShadow: `0 0 8px ${color}50`,
            transition: `width 1s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}
