import { Mic, Eye, Brain, AlertCircle, TrendingUp, Database } from 'lucide-react';
import Card from '@/components/shared/Card';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const features = [
  {
    icon: Mic,
    title: 'Speech Analysis',
    description: 'Measures your clarity, pace, and fluency. Flags sections where you spoke too fast or too slow.',
    iconBg: 'bg-accent-violet/15',
    iconText: 'text-accent-violet',
  },
  {
    icon: Eye,
    title: 'Eye Contact Tracking',
    description: 'AI measures how consistently you maintain camera eye contact — the #1 thing interviewers notice.',
    iconBg: 'bg-accent-violet/15',
    iconText: 'text-accent-violet',
  },
  {
    icon: Brain,
    title: 'Content Scoring',
    description: 'GPT-4 reads your transcript and scores whether you actually answered the question with strong examples.',
    iconBg: 'bg-accent-mint/15',
    iconText: 'text-accent-mint',
  },
  {
    icon: AlertCircle,
    title: 'Filler Word Detection',
    description: 'Counts every um, uh, like, and basically. Shows exactly where in your answer they appeared.',
    iconBg: 'bg-accent-warning/15',
    iconText: 'text-accent-warning',
  },
  {
    icon: TrendingUp,
    title: 'Progress Dashboard',
    description: 'Track your scores across sessions. See which skills improved and which still need work.',
    iconBg: 'bg-accent-mint/15',
    iconText: 'text-accent-mint',
  },
  {
    icon: Database,
    title: '200+ Question Bank',
    description: 'Real questions from Google, Amazon, Microsoft, Infosys, TCS, startups, and more.',
    iconBg: 'bg-accent-violet/15',
    iconText: 'text-accent-violet',
  },
];

export default function FeaturesSection() {
  const ref = useScrollReveal(150);

  return (
    <section id="features" className="dot-grid bg-bg-surface py-[100px] px-6 lg:px-8">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14 reveal">
          <h2 className="text-4xl font-bold text-white mb-3">
            Everything You Need to Ace Interviews
          </h2>
          <p className="text-text-secondary text-lg">
            Six AI-powered tools working together to make you interview-ready
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="reveal" data-delay={index * 100}>
                <Card hover className="h-full">
                  <div
                    className={`w-10 h-10 rounded-lg ${feature.iconBg} flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-5 h-5 ${feature.iconText}`} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
