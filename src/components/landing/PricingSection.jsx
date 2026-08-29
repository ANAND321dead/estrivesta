import { CheckCircle, XCircle } from 'lucide-react';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const freeFeatures = [
  { text: '3 practice sessions per month', included: true },
  { text: 'Basic speech analysis', included: true },
  { text: 'Eye contact tracking', included: true },
  { text: '10 questions available', included: true },
  { text: 'AI content scoring', included: false },
  { text: 'Progress dashboard', included: false },
  { text: 'PDF report download', included: false },
  { text: 'Company-specific questions', included: false },
];

const proFeatures = [
  'Unlimited practice sessions',
  'Advanced speech analysis',
  'Eye contact tracking',
  '200+ questions (all roles + companies)',
  'GPT-4 content scoring',
  'Full progress dashboard',
  'PDF report download',
  'Company-specific question sets',
];

export default function PricingSection() {
  const ref = useScrollReveal(100);

  return (
    <section id="pricing" className="py-[100px] px-6 lg:px-8">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14 reveal">
          <h2 className="text-4xl font-bold text-white mb-3">Simple, Honest Pricing</h2>
          <p className="text-text-secondary text-lg">
            Start free. No credit card needed. Upgrade when you're ready.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-4xl mx-auto">
          {/* Free card */}
          <div className="reveal w-full md:w-auto md:flex-1">
            <Card className="h-full">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-2xl font-bold text-white">Free</h3>
                <Badge variant="free">Forever Free</Badge>
              </div>
              <div className="flex items-baseline gap-1 mt-4">
                <span className="text-5xl font-bold text-white">₹0</span>
                <span className="text-text-secondary text-sm">/month</span>
              </div>
              <p className="text-text-secondary text-sm mt-2 mb-6">
                Perfect for getting started
              </p>
              <div className="h-px bg-border mb-6" />
              <ul className="flex flex-col gap-3.5 mb-8">
                {freeFeatures.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3">
                    {feature.included ? (
                      <CheckCircle className="w-5 h-5 text-accent-mint flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-text-muted flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={feature.included ? 'text-sm text-text-primary' : 'text-sm text-text-muted'}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              <Button variant="ghost" fullWidth>Get Started Free</Button>
            </Card>
          </div>

          {/* Pro card */}
          <div className="reveal w-full md:w-auto md:flex-1" data-delay={150}>
            <div
              className="relative bg-bg-surface border border-accent-violet rounded-[12px] p-6 h-full transition-all duration-200"
              style={{ boxShadow: '0 0 40px rgba(108,99,255,0.2)' }}
            >
              {/* Most Popular badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="pro" size="md">Most Popular</Badge>
              </div>

              <div className="mt-2">
                <h3 className="text-2xl font-bold text-white">Pro</h3>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-5xl font-bold text-white">₹299</span>
                  <span className="text-text-secondary text-sm">/month</span>
                </div>
                <p className="text-text-secondary text-sm mt-2 mb-6">
                  For serious job seekers
                </p>
                <div className="h-px bg-border mb-6" />
                <ul className="flex flex-col gap-3.5 mb-8">
                  {proFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent-mint flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-text-primary">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="primary" fullWidth>Start 7-Day Free Trial</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
