import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '@/components/shared/Button';

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const inputClass =
  'w-full bg-bg-surface border border-border rounded-[8px] text-white text-sm px-10 py-3 outline-none transition-all duration-200 focus:border-accent-violet focus:shadow-[0_0_0_3px_rgba(108,99,255,0.15)]';

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-[55%] relative items-center justify-center overflow-hidden bg-bg-surface">
        {/* Radial gradient backgrounds */}
        <div
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 flex flex-col items-center px-12 max-w-[500px]">
          {/* Logo */}
          <div className="absolute top-12 left-12 flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent-violet" fill="#6C63FF" />
            <span className="text-white font-bold text-lg">InterviewAI</span>
          </div>

          {/* Quote */}
          <p className="text-white text-[28px] font-semibold leading-snug max-w-[400px] text-center mb-4 mt-8">
            Your next interview could change everything. Practice like it matters.
          </p>
          <p className="text-text-secondary text-sm mb-12">
            — Used by 10,000+ job seekers
          </p>

          {/* Floating scorecard mockup */}
          <div
            className="animate-float-mockup bg-bg-elevated border border-border rounded-[16px] p-6 w-full max-w-[340px]"
            style={{ boxShadow: '0 0 60px rgba(108,99,255,0.25), 0 8px 32px rgba(0,0,0,0.5)' }}
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-text-secondary text-sm">Interview Score</p>
              <p className="text-text-muted text-xs">Software Engineer</p>
            </div>
            <div className="flex items-center justify-center my-4">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#1E1E2E" strokeWidth="8" />
                  <circle
                    cx="50" cy="50" r="42" fill="none" stroke="url(#scoreGrad)" strokeWidth="8"
                    strokeLinecap="round" strokeDasharray="263.9" strokeDashoffset="263.9"
                    style={{ animation: 'dashIn 1.5s ease forwards' }}
                  />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6C63FF" />
                      <stop offset="100%" stopColor="#00D4AA" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">85</span>
                </div>
              </div>
            </div>
            <div className="h-px bg-border my-3" />
            <div className="flex flex-col gap-2">
              {[
                { label: 'Eye Contact', value: 88, color: 'bg-accent-mint' },
                { label: 'Speech Clarity', value: 82, color: 'bg-accent-violet' },
                { label: 'Content Quality', value: 86, color: 'bg-accent-violet' },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-text-secondary">{bar.label}</span>
                    <span className="text-xs text-white font-medium">{bar.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-bg-surface overflow-hidden">
                    <div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-[45%] flex items-center justify-center bg-bg-elevated px-6 py-12">
        <div className="w-full max-w-[400px] flex flex-col gap-5">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-accent-violet" fill="#6C63FF" />
            <span className="text-white font-bold text-lg">InterviewAI</span>
          </div>

          <div>
            <h1 className="text-[28px] font-bold text-white">Welcome back</h1>
            <p className="text-text-secondary text-sm mt-1">Sign in to your InterviewAI account</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-text-secondary text-sm font-medium">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-text-secondary text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={inputClass}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <Link to="/login" className="self-end text-sm text-accent-violet hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth>
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-border" />
            <span className="text-text-muted text-xs">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="w-full flex items-center justify-center gap-3 bg-transparent border border-border rounded-[8px] text-white text-sm font-medium px-6 py-3 transition-all duration-200 hover:border-accent-violet/60 hover:bg-white/[0.02] cursor-pointer"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="text-center text-sm text-text-secondary">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent-violet hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes dashIn {
          to { stroke-dashoffset: 39.6; }
        }
      `}</style>
    </div>
  );
}
