import { useState } from 'react';
import { FileText, Volume2, VolumeX, Search, ChevronDown } from 'lucide-react';

/**
 * TranscriptView — collapsible full-transcript panel with filler-word highlighting.
 * Uses the bg-bg-elevated / border-border card pattern with a JetBrains Mono font
 * for the transcript body to match the project's mono font convention.
 */

const FILLER_WORDS = ['um', 'uh', 'like', 'you know', 'basically', 'literally', 'kind of', 'sort of', 'actually'];

function highlightFillers(text) {
  // Split text into segments, flagging filler words
  const pattern = new RegExp(`\\b(${FILLER_WORDS.join('|')})\\b`, 'gi');
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), isFiller: false });
    }
    parts.push({ text: match[0], isFiller: true });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), isFiller: false });
  }
  return parts;
}

function TranscriptSegment({ speaker, timestamp, text, searchTerm }) {
  const isSelf = speaker === 'You';
  const segments = highlightFillers(text);

  // Further highlight search term
  function applySearch(raw) {
    if (!searchTerm.trim()) return raw;
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return raw.replace(regex, (m) => `<mark class="bg-accent-violet/30 text-white rounded px-0.5">${m}</mark>`);
  }

  return (
    <div className={`flex gap-3 ${isSelf ? '' : 'flex-row-reverse'}`}>
      {/* Avatar */}
      <div
        className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 ${
          isSelf
            ? 'bg-accent-violet text-white'
            : 'bg-bg-elevated text-text-secondary border border-border'
        }`}
      >
        {isSelf ? 'Y' : 'AI'}
      </div>

      <div className={`flex flex-col gap-1 max-w-[85%] ${isSelf ? '' : 'items-end'}`}>
        {/* Speaker + timestamp */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-text-secondary">{speaker}</span>
          <span className="text-xs text-text-muted font-mono">{timestamp}</span>
        </div>

        {/* Bubble */}
        <div
          className={`rounded-[10px] px-4 py-3 text-sm leading-relaxed font-mono ${
            isSelf
              ? 'bg-bg-elevated border border-border text-text-primary'
              : 'border text-text-secondary'
          }`}
          style={!isSelf ? { background: 'rgba(108,99,255,0.06)', borderColor: 'rgba(108,99,255,0.2)' } : {}}
        >
          {segments.map((seg, i) =>
            seg.isFiller ? (
              <mark
                key={i}
                className="bg-accent-danger/20 text-accent-danger rounded px-0.5 not-italic"
                title="Filler word detected"
              >
                {searchTerm && regex2test(seg.text, searchTerm)
                  ? <span dangerouslySetInnerHTML={{ __html: applySearch(seg.text) }} />
                  : seg.text}
              </mark>
            ) : (
              <span
                key={i}
                dangerouslySetInnerHTML={{ __html: applySearch(seg.text) }}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

function regex2test(text, term) {
  try {
    return new RegExp(term, 'i').test(text);
  } catch { return false; }
}

const defaultTranscript = [
  {
    speaker: 'AI',
    timestamp: '0:00',
    text: 'Tell me about a challenging project you worked on and how you overcame the technical hurdles.',
  },
  {
    speaker: 'You',
    timestamp: '0:06',
    text: 'Sure, um, so at my last company we were basically building a real-time data pipeline that needed to, like, handle about a million events per second.',
  },
  {
    speaker: 'You',
    timestamp: '0:18',
    text: 'The main challenge was latency. We were seeing, uh, spikes up to 800 milliseconds which was completely unacceptable for our use case.',
  },
  {
    speaker: 'You',
    timestamp: '0:29',
    text: 'So I led a small team of three engineers. We did a deep dive into our Kafka consumer configuration and found that, you know, the default settings were not optimal at all for our throughput requirements.',
  },
  {
    speaker: 'You',
    timestamp: '0:44',
    text: 'We ended up tuning the fetch sizes, reducing partition lag, and introducing a caching layer using Redis. The result was a 40% reduction in average latency and we went from 800ms down to under 200ms consistently.',
  },
  {
    speaker: 'You',
    timestamp: '1:02',
    text: 'The business impact was significant — the product team was able to ship a live dashboard feature that had been blocked for two quarters because of this performance issue.',
  },
];

export default function TranscriptView({ transcript, fillerCount = 7 }) {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFillerOnly, setShowFillerOnly] = useState(false);

  const data = transcript || defaultTranscript;

  const filteredData = data.filter((seg) => {
    const matchesSearch = !searchTerm || seg.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFiller = !showFillerOnly || FILLER_WORDS.some(fw =>
      seg.text.toLowerCase().includes(fw)
    );
    return matchesSearch && matchesFiller;
  });

  return (
    <div className="bg-bg-surface border border-border rounded-[12px] overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent-violet/15 flex items-center justify-center">
            <FileText className="w-4 h-4 text-accent-violet" />
          </div>
          <div className="text-left">
            <h3 className="text-white text-sm font-bold">Full Transcript</h3>
            <p className="text-text-muted text-xs">
              {fillerCount} filler words detected &nbsp;·&nbsp;
              <span className="text-accent-danger">{fillerCount} highlighted</span>
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Toolbar */}
          <div className="px-5 py-3 border-t border-border bg-bg-elevated flex items-center gap-3 flex-wrap">
            {/* Search */}
            <div className="relative flex-1 min-w-[180px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted" />
              <input
                type="text"
                placeholder="Search transcript..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-bg-surface border border-border rounded-[8px] text-white text-xs px-8 py-2 outline-none transition-all duration-200 focus:border-accent-violet focus:shadow-[0_0_0_3px_rgba(108,99,255,0.15)] placeholder:text-text-muted"
              />
            </div>

            {/* Filler filter toggle */}
            <button
              onClick={() => setShowFillerOnly(!showFillerOnly)}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-[8px] border transition-all duration-200 ${
                showFillerOnly
                  ? 'bg-accent-danger/10 text-accent-danger border-accent-danger/30'
                  : 'bg-transparent text-text-secondary border-border hover:border-accent-danger/50 hover:text-accent-danger'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              Filler words only
            </button>

            {/* Legend */}
            <div className="flex items-center gap-1.5 ml-auto">
              <span className="w-3 h-3 rounded bg-accent-danger/20 border border-accent-danger/30" />
              <span className="text-xs text-text-muted">Filler word</span>
            </div>
          </div>

          {/* Transcript body */}
          <div className="px-5 py-4 flex flex-col gap-5 max-h-[500px] overflow-y-auto">
            {filteredData.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <VolumeX className="w-8 h-8 text-text-muted" />
                <p className="text-text-secondary text-sm">No segments match your filter.</p>
              </div>
            ) : (
              filteredData.map((seg, i) => (
                <TranscriptSegment
                  key={i}
                  speaker={seg.speaker}
                  timestamp={seg.timestamp}
                  text={seg.text}
                  searchTerm={searchTerm}
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}
