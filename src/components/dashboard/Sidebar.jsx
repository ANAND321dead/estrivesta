import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Zap, ChevronLeft, ChevronRight, LayoutDashboard, Video,
  BookOpen, TrendingUp, Settings, LogOut,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', route: '/dashboard' },
  { icon: Video, label: 'Practice', route: '/practice' },
  { icon: BookOpen, label: 'Question Bank', route: '/questions' },
  { icon: TrendingUp, label: 'Progress', route: '/progress' },
  { icon: Settings, label: 'Settings', route: '/settings' },
];

const mobileTabs = navItems.slice(0, 5);

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden md:flex fixed left-0 top-0 h-screen flex-col bg-bg-surface border-r border-border z-40 transition-all duration-250 ease-out"
        style={{ width: collapsed ? 64 : 240 }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-border flex-shrink-0">
          <div className="flex items-center gap-2 overflow-hidden">
            <Zap className="w-5 h-5 text-accent-violet flex-shrink-0" fill="#6C63FF" />
            {!collapsed && <span className="text-white font-bold text-lg whitespace-nowrap">InterviewAI</span>}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-text-muted hover:text-white transition-colors flex-shrink-0"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col py-4 px-3 gap-1 overflow-y-auto">
          {!collapsed && (
            <span className="text-text-muted text-[10px] uppercase tracking-[0.15em] font-semibold px-3 mb-2">
              Menu
            </span>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.route} className="relative group">
                <NavLink
                  to={item.route}
                  className={({ isActive }) => [
                    'flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-sm font-medium transition-all duration-200 relative',
                    isActive
                      ? 'bg-accent-violet/15 text-accent-violet'
                      : 'text-text-secondary hover:text-white hover:bg-white/[0.04]',
                    collapsed ? 'justify-center' : '',
                  ].join(' ')}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-accent-violet rounded-r-full" />
                      )}
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
                    </>
                  )}
                </NavLink>
                {/* Tooltip when collapsed */}
                {collapsed && (
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-bg-elevated border border-border rounded-md text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-border p-3 flex-shrink-0">
          <div className="flex items-center gap-3 px-1 mb-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-accent-violet flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-semibold">AS</span>
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-white text-sm font-medium truncate">Arjun Sharma</span>
                <span className="text-text-muted text-xs truncate">arjun@example.com</span>
              </div>
            )}
            {!collapsed && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-violet text-white font-medium flex-shrink-0">
                Pro
              </span>
            )}
          </div>
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] text-sm font-medium text-text-secondary hover:text-accent-danger hover:bg-accent-danger/10 transition-all duration-200"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-bg-surface border-t border-border z-40 flex items-center justify-around h-16">
        {mobileTabs.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.route}
              to={item.route}
              className={({ isActive }) => [
                'flex flex-col items-center gap-1 relative py-2 px-3',
                isActive ? 'text-accent-violet' : 'text-text-muted',
              ].join(' ')}
            >
              {({ isActive }) => (
                <>
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-violet" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}
