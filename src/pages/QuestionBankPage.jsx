import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Filter, BookOpen, ChevronDown, ChevronUp,
  ArrowRight, Code2, Layers, BarChart2, Megaphone,
  Users, DollarSign, Bookmark, BookmarkCheck, Shuffle,
} from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import Badge from '@/components/shared/Badge';
import Button from '@/components/shared/Button';

// ─── Question data ────────────────────────────────────────────────────────────
const roleIcons = {
  'Software Engineer': Code2,
  'Product Manager': Layers,
  'Data Analyst': BarChart2,
  'Marketing Manager': Megaphone,
  'Human Resources': Users,
  'Finance Analyst': DollarSign,
};

const questions = [
  // Software Engineer
  { id: 1,  role: 'Software Engineer', category: 'Behavioral',  difficulty: 'medium', text: 'Tell me about a challenging project you worked on and how you overcame the technical hurdles.', tips: 'Use STAR method. Focus on your specific contribution, not the team.' },
  { id: 2,  role: 'Software Engineer', category: 'Technical',   difficulty: 'hard',   text: 'Design a URL shortening service like bit.ly that handles millions of requests per day.', tips: 'Cover storage, hashing, caching, and scalability concerns.' },
  { id: 3,  role: 'Software Engineer', category: 'Behavioral',  difficulty: 'easy',   text: 'Tell me about a time you disagreed with a senior engineer and how you resolved it.', tips: 'Show emotional intelligence and how you stayed constructive.' },
  { id: 4,  role: 'Software Engineer', category: 'Technical',   difficulty: 'medium', text: 'Walk me through your approach to debugging a production issue that occurs intermittently.', tips: 'Mention logging, tracing, reproducibility, and post-mortems.' },
  { id: 5,  role: 'Software Engineer', category: 'HR',          difficulty: 'easy',   text: 'Why do you want to work for our company specifically?', tips: 'Research the company. Tie your values to their mission.' },
  { id: 6,  role: 'Software Engineer', category: 'Technical',   difficulty: 'hard',   text: 'Explain the trade-offs between SQL and NoSQL databases. When would you choose each?', tips: 'Consider consistency, scalability, and use case requirements.' },
  // Product Manager
  { id: 7,  role: 'Product Manager',   category: 'Behavioral',  difficulty: 'medium', text: 'Walk me through how you would prioritize features for a new product launch.', tips: 'Mention frameworks like RICE, ICE, or MoSCoW.' },
  { id: 8,  role: 'Product Manager',   category: 'Behavioral',  difficulty: 'hard',   text: 'Tell me about a product you launched that failed and what you learned.', tips: 'Honesty matters. Focus on learnings and growth.' },
  { id: 9,  role: 'Product Manager',   category: 'Technical',   difficulty: 'medium', text: 'How would you measure the success of a new onboarding flow?', tips: 'Define north star metric, then secondary metrics. Cover qualitative too.' },
  { id: 10, role: 'Product Manager',   category: 'HR',          difficulty: 'easy',   text: 'What makes you passionate about product management?', tips: 'Be specific. Tie to past experiences, not generic statements.' },
  // Data Analyst
  { id: 11, role: 'Data Analyst',      category: 'Technical',   difficulty: 'hard',   text: 'Walk me through how you would build a churn prediction model from scratch.', tips: 'Cover data collection, feature engineering, model selection and evaluation.' },
  { id: 12, role: 'Data Analyst',      category: 'Behavioral',  difficulty: 'medium', text: 'Tell me about a time your analysis contradicted your team\'s assumptions.', tips: 'Show how you communicated data diplomatically and influenced decisions.' },
  { id: 13, role: 'Data Analyst',      category: 'Technical',   difficulty: 'medium', text: 'How do you handle missing or corrupted data in a dataset?', tips: 'Discuss imputation strategies, detecting patterns in missingness, and documentation.' },
  // Marketing Manager
  { id: 14, role: 'Marketing Manager', category: 'Behavioral',  difficulty: 'medium', text: 'Describe a campaign you ran that significantly exceeded its KPIs.', tips: 'Quantify results. Explain your strategy and what differentiated it.' },
  { id: 15, role: 'Marketing Manager', category: 'Technical',   difficulty: 'hard',   text: 'How would you design a go-to-market strategy for a new B2B SaaS product?', tips: 'Cover ICP definition, channels, pricing, and messaging.' },
  // HR
  { id: 16, role: 'Human Resources',   category: 'Behavioral',  difficulty: 'easy',   text: 'How do you handle a situation where two employees are in conflict?', tips: 'Show empathy, active listening, and process. Reference any frameworks.' },
  { id: 17, role: 'Human Resources',   category: 'HR',          difficulty: 'easy',   text: 'What does a healthy company culture look like to you?', tips: 'Be specific. Tie to concrete practices, not just buzzwords.' },
  // Finance
  { id: 18, role: 'Finance Analyst',   category: 'Technical',   difficulty: 'hard',   text: 'Walk me through a DCF model and explain where you would focus your sensitivity analysis.', tips: 'Cover WACC, terminal value, and key assumptions clearly.' },
  { id: 19, role: 'Finance Analyst',   category: 'Behavioral',  difficulty: 'medium', text: 'Tell me about a time you identified a financial discrepancy and how you resolved it.', tips: 'Quantify the impact. Show attention to detail and ownership.' },
];

const allRoles    = ['All Roles', ...Object.keys(roleIcons)];
const allCats     = ['All', 'Behavioral', 'Technical', 'HR'];
const allDiffs    = ['All', 'easy', 'medium', 'hard'];

const diffConfig = {
  easy:   { label: 'Easy',   variant: 'success' },
  medium: { label: 'Medium', variant: 'warning' },
  hard:   { label: 'Hard',   variant: 'danger' },
};

function QuestionCard({ q, isBookmarked, onBookmark, onPractice, isExpanded, onToggle }) {
  const Icon = roleIcons[q.role] || BookOpen;
  const diff = diffConfig[q.difficulty];

  return (
    <div className="bg-bg-surface border border-border rounded-[12px] overflow-hidden transition-all duration-200 hover:border-accent-violet/40 hover:shadow-[0_0_16px_rgba(108,99,255,0.1)]">
      {/* Header row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
      >
        {/* Role icon */}
        <div className="w-9 h-9 rounded-lg bg-accent-violet/10 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4 h-4 text-accent-violet" />
        </div>

        {/* Question text */}
        <p className="flex-1 text-sm font-medium text-text-primary line-clamp-2 leading-relaxed text-left">
          {q.text}
        </p>

        {/* Right meta */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
          <Badge variant={diff.variant} size="sm">{diff.label}</Badge>
          <Badge variant="default" size="sm">{q.category}</Badge>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-text-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-text-muted" />
          )}
        </div>
      </button>

      {/* Expanded section */}
      {isExpanded && (
        <div className="border-t border-border bg-bg-elevated px-5 py-4 flex flex-col gap-4">
          {/* Full question */}
          <div>
            <p className="text-xs text-text-muted font-medium mb-1.5 uppercase tracking-wide">Question</p>
            <p className="text-sm text-text-primary leading-relaxed">{q.text}</p>
          </div>

          {/* AI tip */}
          <div
            className="rounded-[8px] p-3.5 border"
            style={{ background: 'rgba(108,99,255,0.06)', borderColor: 'rgba(108,99,255,0.2)' }}
          >
            <p className="text-xs font-semibold text-accent-violet mb-1.5">💡 AI Coaching Tip</p>
            <p className="text-sm text-text-secondary leading-relaxed">{q.tips}</p>
          </div>

          {/* Action row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="default" size="sm">{q.role}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onBookmark(q.id)}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-[8px] border transition-all duration-200 ${
                  isBookmarked
                    ? 'bg-accent-violet/10 text-accent-violet border-accent-violet/30'
                    : 'text-text-secondary border-border hover:border-accent-violet/40 hover:text-accent-violet'
                }`}
              >
                {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                {isBookmarked ? 'Saved' : 'Save'}
              </button>
              <Button
                variant="primary"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                onClick={() => onPractice(q)}
              >
                Practice
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function QuestionBankPage() {
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('All Roles');
  const [selectedCat, setSelectedCat] = useState('All');
  const [selectedDiff, setSelectedDiff] = useState('All');
  const [expandedId, setExpandedId] = useState(null);
  const [bookmarked, setBookmarked] = useState(new Set());
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const revealClass = (delay = 0) =>
    `transition-all duration-500 ease-out ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`;

  const handleBookmark = (id) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handlePractice = (q) => {
    navigate('/session', { state: { question: q.text, role: q.role } });
  };

  const handleShuffle = () => {
    const filtered = questions.filter(q => {
      const matchRole = selectedRole === 'All Roles' || q.role === selectedRole;
      const matchCat  = selectedCat === 'All' || q.category === selectedCat;
      const matchDiff = selectedDiff === 'All' || q.difficulty === selectedDiff;
      return matchRole && matchCat && matchDiff;
    });
    if (!filtered.length) return;
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setExpandedId(random.id);
    // Scroll to the card
    setTimeout(() => {
      const el = document.getElementById(`qcard-${random.id}`);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  // Filter questions
  const filtered = questions.filter((q) => {
    const matchSearch = !search || q.text.toLowerCase().includes(search.toLowerCase());
    const matchRole   = selectedRole === 'All Roles' || q.role === selectedRole;
    const matchCat    = selectedCat === 'All' || q.category === selectedCat;
    const matchDiff   = selectedDiff === 'All' || q.difficulty === selectedDiff;
    const matchBk     = !showBookmarksOnly || bookmarked.has(q.id);
    return matchSearch && matchRole && matchCat && matchDiff && matchBk;
  });

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />

      <div className="md:ml-[240px] min-h-screen pb-24 md:pb-0">
        <div className="max-w-[1000px] mx-auto px-6 lg:px-8 py-8 flex flex-col gap-6">

          {/* ── Header ─────────────────────────────────────────────────── */}
          <div className={revealClass(0)} style={{ transitionDelay: '0ms' }}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-white text-2xl font-bold">Question Bank</h1>
                <p className="text-text-secondary text-sm mt-0.5">
                  {questions.length} curated interview questions · {bookmarked.size} saved
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Shuffle className="w-4 h-4" />}
                  onClick={handleShuffle}
                >
                  Random
                </Button>
                <button
                  onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                  className={`inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-[8px] border transition-all duration-200 ${
                    showBookmarksOnly
                      ? 'bg-accent-violet/10 text-accent-violet border-accent-violet/30'
                      : 'text-text-secondary border-border hover:border-accent-violet/40 hover:text-white'
                  }`}
                >
                  <BookmarkCheck className="w-4 h-4" />
                  Saved ({bookmarked.size})
                </button>
              </div>
            </div>
          </div>

          {/* ── Search + filters ────────────────────────────────────────── */}
          <div
            className={`${revealClass(50)} bg-bg-surface border border-border rounded-[12px] p-5 flex flex-col gap-4`}
            style={{ transitionDelay: '50ms' }}
          >
            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-bg-elevated border border-border rounded-[8px] text-white text-sm px-10 py-3 outline-none transition-all duration-200 focus:border-accent-violet focus:shadow-[0_0_0_3px_rgba(108,99,255,0.15)] placeholder:text-text-muted"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors text-lg leading-none"
                >
                  ×
                </button>
              )}
            </div>

            {/* Filter pills row */}
            <div className="flex flex-wrap gap-3">
              {/* Role */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider px-0.5">Role</span>
                <div className="flex flex-wrap gap-1">
                  {allRoles.map((r) => (
                    <button
                      key={r}
                      onClick={() => setSelectedRole(r)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200 ${
                        selectedRole === r
                          ? 'bg-accent-violet text-white border-accent-violet shadow-[0_0_10px_rgba(108,99,255,0.3)]'
                          : 'bg-transparent text-text-secondary border-border hover:border-accent-violet/40 hover:text-white'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="w-px bg-border self-stretch hidden sm:block" />

              {/* Category */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider px-0.5">Category</span>
                <div className="flex flex-wrap gap-1">
                  {allCats.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCat(c)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200 ${
                        selectedCat === c
                          ? 'bg-accent-mint/20 text-accent-mint border-accent-mint/40'
                          : 'bg-transparent text-text-secondary border-border hover:border-accent-mint/40 hover:text-white'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="w-px bg-border self-stretch hidden sm:block" />

              {/* Difficulty */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider px-0.5">Difficulty</span>
                <div className="flex flex-wrap gap-1">
                  {allDiffs.map((d) => {
                    const isActive = selectedDiff === d;
                    const cfg = diffConfig[d];
                    const activeColor =
                      d === 'easy'   ? 'bg-accent-mint/15 text-accent-mint border-accent-mint/35' :
                      d === 'medium' ? 'bg-accent-warning/15 text-accent-warning border-accent-warning/35' :
                      d === 'hard'   ? 'bg-accent-danger/15 text-accent-danger border-accent-danger/35' :
                      'bg-accent-violet/15 text-accent-violet border-accent-violet/35';
                    return (
                      <button
                        key={d}
                        onClick={() => setSelectedDiff(d)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200 ${
                          isActive
                            ? activeColor
                            : 'bg-transparent text-text-secondary border-border hover:text-white hover:border-accent-violet/30'
                        }`}
                      >
                        {cfg ? cfg.label : 'All'}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-text-muted">
                Showing <span className="text-text-primary font-semibold">{filtered.length}</span> of {questions.length} questions
              </span>
              {(selectedRole !== 'All Roles' || selectedCat !== 'All' || selectedDiff !== 'All' || search || showBookmarksOnly) && (
                <button
                  onClick={() => {
                    setSelectedRole('All Roles');
                    setSelectedCat('All');
                    setSelectedDiff('All');
                    setSearch('');
                    setShowBookmarksOnly(false);
                  }}
                  className="text-xs text-accent-violet hover:underline font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* ── Question list ────────────────────────────────────────────── */}
          <div
            className={`${revealClass(100)} flex flex-col gap-3`}
            style={{ transitionDelay: '100ms' }}
          >
            {filtered.length === 0 ? (
              <div className="bg-bg-surface border border-border rounded-[12px] py-20 flex flex-col items-center gap-4">
                <BookOpen className="w-12 h-12 text-text-muted" />
                <p className="text-white font-semibold text-lg">No questions found</p>
                <p className="text-text-secondary text-sm text-center max-w-xs">
                  Try adjusting your filters or search term.
                </p>
              </div>
            ) : (
              filtered.map((q) => (
                <div key={q.id} id={`qcard-${q.id}`}>
                  <QuestionCard
                    q={q}
                    isBookmarked={bookmarked.has(q.id)}
                    onBookmark={handleBookmark}
                    onPractice={handlePractice}
                    isExpanded={expandedId === q.id}
                    onToggle={() => setExpandedId(expandedId === q.id ? null : q.id)}
                  />
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
