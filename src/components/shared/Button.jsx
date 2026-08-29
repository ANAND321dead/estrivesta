import { Loader2 } from 'lucide-react';

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  onClick,
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  className = '',
}) {
  const sizeMap = {
    sm: 'text-sm px-4 py-2',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-7 py-3.5',
  };

  const variantMap = {
    primary:
      'bg-accent-violet text-white border border-transparent hover:shadow-[0_0_20px_rgba(108,99,255,0.4)]',
    ghost:
      'bg-transparent text-white border border-border hover:border-accent-violet/60 hover:bg-white/[0.02]',
    danger:
      'bg-accent-danger text-white border border-transparent hover:shadow-[0_0_20px_rgba(255,77,109,0.4)]',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={[
        'inline-flex items-center justify-center gap-2 font-medium rounded-[8px]',
        'transition-all duration-200 select-none',
        sizeMap[size],
        variantMap[variant],
        disabled || loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer',
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        icon
      )}
      {children}
    </button>
  );
}
