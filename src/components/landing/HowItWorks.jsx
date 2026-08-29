import { BookOpen, Video, BarChart3, ChevronRight } from 'lucide-react';
import Card from '@/components/shared/Card';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const steps = [
  {
    badge: '01',
    icon: BookOpen,
    title: 'Pick a Question',
    description: 'Choose from 200+ real interview questions. Filter by job role, company, difficulty, and category.',
    gradient: 'from-accent-violet to-accent-violet',
  },
  {
    badge: '02',
    icon: Video,
    title: 'Record Your Answer',
    description: 'Record directly in your browser — no app download needed. AI tracks your face and voice live as you speak.',
    gradient: 'from-accent-mint to-accent-mint',
  },
  {
    badge: '03',
    icon: BarChart3,
    title: 'Get AI Feedback',
    description: 'Receive a detailed scorecard in 60 seconds. See exactly what to fix and practice again immediately.',
    gradient: 'from-accent-violet to-accent-mint',
  },
];

export default function HowItWorks() {
  const ref = useScrollReveal(150);

  return (
    <section id="how-it-works" className="py-[100px] px-6 lg:px-8">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14 reveal">
          <p className="text-accent-violet uppercase text-sm font-semibold tracking-[0.15em] mb-3">
            The Process
          </p>
          <h2 className="text-4xl font-bold text-white mb-3">How InterviewAI Works</h2>
          <p className="text-text-secondary text-lg">
            From signup to your first score in under 5 minutes
          </p>
        </div>

        {/* Step cards */}
        <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-0">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.badge}
                className="reveal flex items-stretch gap-0 md:gap-0"
                data-delay={index * 150}
              >
              <Card hover className="relative flex-1 md:max-w-sm">
                {/* Step badge */}
                <span className="absolute top-4 right-4 text-text-muted text-sm font-mono font-semibold">
                  {step.badge}
                </span>

                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} opacity-15 flex items-center justify-center mb-5`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Title + description */}
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {step.description}
                </p>
              </Card>

              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center px-4">
                  <ChevronRight className="w-5 h-5 text-text-muted" />
                </div>
              )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
