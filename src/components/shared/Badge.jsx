export default function Badge({
  children,
  variant = 'default',
  size = 'sm',
}) {
  const variantMap = {
    default: 'bg-bg-elevated text-text-secondary border-border',
    success: 'bg-accent-mint/10 text-accent-mint border-accent-mint/30',
    warning: 'bg-accent-warning/10 text-accent-warning border-accent-warning/30',
    danger: 'bg-accent-danger/10 text-accent-danger border-accent-danger/30',
    pro: 'bg-accent-violet text-white border-accent-violet',
    free: 'bg-bg-elevated text-accent-mint border-accent-mint/30',
  };

  const sizeMap = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 font-medium rounded-full border whitespace-nowrap',
        variantMap[variant],
        sizeMap[size],
      ].join(' ')}
    >
      {children}
    </span>
  );
}
