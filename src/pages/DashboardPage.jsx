import { useEffect, useState } from 'react';
import { Bell, BarChart3, Video, Eye, Flame, ArrowRight } from 'lucide-react';
import Sidebar from '@/components/dashboard/Sidebar';
import StatCard from '@/components/dashboard/StatCard';
import SessionsTable from '@/components/dashboard/SessionsTable';
import ProgressChart from '@/components/dashboard/ProgressChart';
import Button from '@/components/shared/Button';

const roles = [
  'Software Engineer',
  'Product Manager',
  'Data Analyst',
  'UX Designer',
  'Business Analyst',
];

export default function DashboardPage() {
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const revealClass = (delay) =>
    `transition-all duration-600 ease-out ${
      revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    }`;

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar />

      {/* Main content */}
      <div className="md:ml-[240px] min-h-screen pb-20 md:pb-0">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-8 flex flex-col gap-6">
          {/* Top bar */}
          <div className="flex items-center justify-between" style={{ transitionDelay: '0ms' }}>
            <div className={revealClass(0)}>
              <h1 className="text-white text-2xl font-bold">Good morning, Arjun 👋</h1>
              <p className="text-text-secondary text-sm mt-0.5">Sunday, 16 August 2025</p>
            </div>
            <div className={`${revealClass(0)} flex items-center gap-3`}>
              <button className="relative w-10 h-10 rounded-full bg-bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-white hover:border-accent-violet/50 transition-all">
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-accent-danger" />
              </button>
              <div className="w-10 h-10 rounded-full bg-accent-violet flex items-center justify-center">
                <span className="text-white text-sm font-semibold">AS</span>
              </div>
            </div>
          </div>

          {/* Quick Start card */}
          <div
            className={`${revealClass(50)} relative bg-bg-surface border border-border rounded-[12px] p-6 overflow-hidden`}
            style={{ transitionDelay: '50ms' }}
          >
            {/* Violet left border strip */}
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-accent-violet" />
            {/* Subtle violet gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.05) 0%, transparent 60%)' }}
            />

            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-white text-lg font-bold mb-1">Ready for today's practice?</h2>
                <p className="text-text-secondary text-sm">Pick a role and start a session</p>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="bg-bg-elevated border border-border rounded-[8px] text-white text-sm px-4 py-2.5 outline-none focus:border-accent-violet transition-all cursor-pointer"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  Start Session
                </Button>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ transitionDelay: '100ms' }}>
            <div className={revealClass(100)} style={{ transitionDelay: '100ms' }}>
              <StatCard
                title="Average Score"
                value="74"
                change="+6%"
                changeType="positive"
                icon={BarChart3}
                accentColor="violet"
              />
            </div>
            <div className={revealClass(150)} style={{ transitionDelay: '150ms' }}>
              <StatCard
                title="Sessions This Month"
                value="8"
                change="+3"
                changeType="positive"
                icon={Video}
                accentColor="mint"
              />
            </div>
            <div className={revealClass(200)} style={{ transitionDelay: '200ms' }}>
              <StatCard
                title="Most Improved"
                value="Eye Contact"
                change="+12pts"
                changeType="positive"
                icon={Eye}
                accentColor="warning"
              />
            </div>
            <div className={revealClass(250)} style={{ transitionDelay: '250ms' }}>
              <StatCard
                title="Current Streak"
                value="5 days"
                change="Personal best!"
                changeType="neutral"
                icon={Flame}
                accentColor="danger"
              />
            </div>
          </div>

          {/* Progress chart + recent sessions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Progress chart card */}
            <div
              className={`${revealClass(300)} bg-bg-surface border border-border rounded-[12px] p-6`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-white text-lg font-bold">Score Trend</h2>
                  <p className="text-text-secondary text-sm mt-0.5">Last 10 sessions</p>
                </div>
                <span className="text-sm text-accent-violet font-medium cursor-pointer hover:underline">
                  View All →
                </span>
              </div>
              <ProgressChart />
            </div>

            {/* Recent sessions — full width on mobile, half on desktop */}
            <div
              className={`${revealClass(350)} flex flex-col gap-4`}
              style={{ transitionDelay: '350ms' }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-white text-lg font-bold">Recent Sessions</h2>
                <span className="text-sm text-accent-violet font-medium cursor-pointer hover:underline">
                  View All →
                </span>
              </div>
              <SessionsTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
