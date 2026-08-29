import { useState, useEffect } from 'react';
import { Zap, Menu, X } from 'lucide-react';
import Button from '@/components/shared/Button';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
  const [scrolledDown, setScrolledDown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setScrolledDown(true);
      } else {
        setScrolledDown(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setMenuOpen(false);
  };

  return (
    <nav
      className={[
        'fixed top-0 left-0 w-full z-50',
        'bg-[rgba(10,10,15,0.85)] backdrop-blur-md',
        'border-b border-border',
        'transition-transform duration-300',
        scrolledDown ? '-translate-y-full' : 'translate-y-0',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white font-bold"
          >
            <Zap className="w-5 h-5" />
            InterviewAI
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>

            <Button variant="primary" size="sm">
              Get Started Free
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={[
          'md:hidden overflow-hidden transition-all duration-300 ease-out',
          'border-b border-border bg-bg-primary',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        ].join(' ')}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-text-secondary hover:text-white transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}

          <div className="flex flex-col gap-3 pt-2 border-t border-border">
            <Button variant="ghost" size="sm" fullWidth>
              Sign In
            </Button>

            <Button variant="primary" size="sm" fullWidth>
              Get Started Free
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}