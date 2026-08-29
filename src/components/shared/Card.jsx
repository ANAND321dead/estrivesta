export default function Card({
  children,
  className = '',
  hover = false,
  glow = false,
}) {
  return (
    <div
      className={[
        'bg-bg-surface border border-border rounded-[12px] p-6',
        'transition-all duration-200',
        hover
          ? 'hover:-translate-y-0.5 hover:border-accent-violet/50 hover:shadow-[0_0_20px_rgba(108,99,255,0.15)]'
          : '',
        glow ? 'shadow-[0_0_40px_rgba(108,99,255,0.25)]' : 'shadow-[0_0_0_1px_rgba(108,99,255,0.1),0_8px_32px_rgba(0,0,0,0.4)]',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
