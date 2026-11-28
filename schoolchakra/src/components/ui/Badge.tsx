import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'theme' | 'outline';
  size?: 'xs' | 'sm' | 'md';
  dot?: boolean;
  leftIcon?: ReactNode;
}

export function Badge({
  variant = 'default',
  size = 'sm',
  dot = false,
  leftIcon,
  children,
  className = '',
  style,
  ...props
}: BadgeProps) {
  const baseStyles = `
    inline-flex items-center gap-1 font-mono font-medium rounded
    transition-colors whitespace-nowrap
  `;

  const sizeStyles = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
  };

  const variantStyles = {
    default: 'bg-slate-100 text-slate-700 border border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
    theme: `bg-white text-slate-900 border-slate-300 shadow-2xs`,
    outline: 'bg-transparent border-slate-300 text-slate-700 hover:bg-slate-50',
  };

  const sizeClass = sizeStyles[size];
  const variantClass = variantStyles[variant];

  let backgroundStyle: CSSProperties = {};
  let borderStyle: CSSProperties = {};

  if (variant === 'theme') {
    backgroundStyle = { backgroundColor: 'var(--brand-light, #EFF6FF)' };
    borderStyle = {
      borderColor: 'var(--brand-border, #BFDBFE)',
      color: 'var(--brand-hex, #2563EB)',
    };
  }

  return (
    <span
      className={`${baseStyles} ${sizeClass} ${variantClass} ${className}`}
      style={{ ...backgroundStyle, ...borderStyle, ...style }}
      {...props}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: 'var(--brand-hex, #2563EB)' }}
        />
      )}
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
    </span>
  );
}