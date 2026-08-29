import { Play, CircleCheck } from 'lucide-react';
import Button from '@/components/shared/Button';

const socialProof = [
  'No credit card required',
  '3 free sessions monthly',
  'Results in 60 seconds',
];

const scoreBars = [
  { label: 'Eye Contact', value: 87, color: 'bg-accent-mint' },
  { label: 'Speech Clarity', value: 79, color: 'bg-accent-violet' },
  { label: 'Content Quality', value: 84, color: 'bg-accent-violet' },
  { label: 'Confidence', value: 76, color: 'bg-accent-warning' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-12">
      {/* Background blobs */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none animate-drift-left"
        style={{
          background: 'radial-gradient(circle, rgba(108,99,255,0.40) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none animate-drift-right"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,170,0.30) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border border-accent-violet/40 bg-accent-violet/5">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-accent-mint opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-accent-mint" />
              </span>
              <span className="text-sm text-text-primary font-medium">AI-Powered Interview Coach</span>
            </div>

            {/* Headline */}
            <h1 className="text-[42px] md:text-[72px] font-extrabold leading-[1.05]">
              <span className="text-white">Ace Every Interview.</span>
              <br />
              <span className="gradient-text">Land Every Job.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-text-secondary max-w-[560px]">
              Practice with AI that scores your speech, eye contact, confidence, and content. Trusted by 10,000+ job seekers across India.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="primary" size="lg">Start Practicing Free</Button>
              <Button variant="ghost" size="lg" icon={<Play className="w-4 h-4" />}>
                Watch Demo
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-2">
              {socialProof.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CircleCheck className="w-4 h-4 text-accent-mint" />
                  <span className="text-sm text-text-secondary">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right mockup */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: '0 0 80px rgba(108,99,255,0.35)' }}
            />
            <div
              className="animate-float-mockup relative bg-bg-surface border border-border rounded-[16px] p-6 w-full max-w-md"
              style={{ boxShadow: '0 0 80px rgba(108,99,255,0.35), 0 8px 32px rgba(0,0,0,0.5)' }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-text-secondary text-sm">Interview Score</p>
                  <p className="text-text-muted text-xs mt-0.5">Software Engineer · Behavioral</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-accent-violet">82</span>
                  <span className="text-text-muted text-sm">/100</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-border my-4" />

              {/* Score bars */}
              <div className="flex flex-col gap-3.5">
                {scoreBars.map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm text-text-secondary">{bar.label}</span>
                      <span className="text-sm text-text-primary font-medium">{bar.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-bg-elevated overflow-hidden">
                      <div
                        className={`h-full rounded-full ${bar.color}`}
                        style={{ width: `${bar.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer link */}
              <div className="mt-5 pt-4 border-t border-border">
                <span className="text-sm text-accent-violet font-medium cursor-pointer hover:underline">
                  View Full Report →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
