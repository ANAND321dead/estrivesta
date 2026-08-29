import { Video, ExternalLink } from 'lucide-react';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';

const roleBadgeMap = {
  'Software Engineer': 'default',
  'Product Manager': 'warning',
  'Data Analyst': 'success',
  'UX Designer': 'default',
  'Business Analyst': 'warning',
};

const scorePillMap = (score) => {
  if (score >= 80) return 'success';
  if (score >= 60) return 'warning';
  return 'danger';
};

const sessions = [
  {
    date: '14 Aug 2025',
    role: 'Software Engineer',
    question: 'Tell me about a time you faced a difficult bug in production and how you resolved it.',
    score: 84,
    topIssue: 'Too many filler words',
  },
  {
    date: '12 Aug 2025',
    role: 'Product Manager',
    question: 'Walk me through how you would prioritize features for a new product launch.',
    score: 79,
    topIssue: 'Spoke too fast',
  },
  {
    date: '10 Aug 2025',
    role: 'Data Analyst',
    question: 'Explain a complex data analysis project you worked on and the impact it had.',
    score: 72,
    topIssue: 'Weak eye contact',
  },
  {
    date: '08 Aug 2025',
    role: 'Software Engineer',
    question: 'Describe your experience with system design and scaling applications.',
    score: 81,
    topIssue: 'Need stronger examples',
  },
  {
    date: '05 Aug 2025',
    role: 'UX Designer',
    question: 'How do you approach user research and incorporate feedback into your designs?',
    score: 68,
    topIssue: 'Too many filler words',
  },
  {
    date: '02 Aug 2025',
    role: 'Business Analyst',
    question: 'Tell me about a time you had to present complex data to non-technical stakeholders.',
    score: 58,
    topIssue: 'Low confidence detected',
  },
];

export default function SessionsTable({ sessions: customSessions }) {
  const data = customSessions || sessions;
  const hasData = data.length > 0;

  return (
    <div className="bg-bg-surface border border-border rounded-[12px] overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-bg-elevated border-b border-border">
              {['Date', 'Role', 'Question', 'Score', 'Top Issue', 'Action'].map((h) => (
                <th
                  key={h}
                  className="text-left text-text-secondary text-xs uppercase tracking-wide font-semibold px-4 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!hasData ? (
              <tr>
                <td colSpan={6} className="py-20">
                  <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <Video className="w-12 h-12 text-text-muted" />
                    <h3 className="text-white font-semibold text-lg">No sessions yet</h3>
                    <p className="text-text-secondary text-sm max-w-xs">
                      Start your first practice session to see results here
                    </p>
                    <Button variant="primary" size="sm">Start Practicing</Button>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((session, index) => (
                <tr
                  key={index}
                  className="border-b border-border last:border-b-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-4 py-3.5 text-sm text-text-secondary whitespace-nowrap">
                    {session.date}
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant={roleBadgeMap[session.role] || 'default'}>
                      {session.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-text-primary max-w-[240px]">
                    <span className="block truncate" title={session.question}>
                      {session.question}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant={scorePillMap(session.score)}>
                      {session.score}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-text-secondary">
                    {session.topIssue}
                  </td>
                  <td className="px-4 py-3.5">
                    <button className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-accent-violet border border-border hover:border-accent-violet/50 rounded-[6px] px-2.5 py-1.5 transition-all duration-200">
                      View Report
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer pagination */}
      {hasData && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <span className="text-xs text-text-muted">
            Showing 1-{data.length} of {data.length} sessions
          </span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-medium text-text-secondary border border-border rounded-[6px] hover:border-accent-violet/50 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed" disabled>
              Prev
            </button>
            <button className="px-3 py-1.5 text-xs font-medium text-text-secondary border border-border rounded-[6px] hover:border-accent-violet/50 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed" disabled>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
