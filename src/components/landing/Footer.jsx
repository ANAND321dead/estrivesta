import { Zap } from 'lucide-react';

const columns = [
  {
    heading: 'Product',
    links: ['Features', 'Pricing', 'Question Bank', 'Demo', 'Changelog'],
  },
  {
    heading: 'Company',
    links: ['About Us', 'Blog', 'Careers', 'Contact', 'Press'],
  },
  {
    heading: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy'],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-border pt-16 pb-8 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent-violet" fill="#6C63FF" />
              <span className="text-white font-bold text-lg">InterviewAI</span>
            </div>
            <p className="text-text-secondary text-sm">
              Built for job seekers across India
            </p>
            <p className="text-text-muted text-sm">
              Practice smarter. Interview better.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <h4 className="text-white font-semibold text-sm">{col.heading}</h4>
              {col.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-text-secondary text-sm hover:text-accent-violet transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-sm">
            © 2025 InterviewAI. Made with ❤️ in India
          </p>
          <p className="text-text-muted text-sm">All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
