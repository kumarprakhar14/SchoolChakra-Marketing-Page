import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { useTheme } from '../../contexts';

interface PillProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  color?: 'theme' | 'slate' | 'emerald' | 'blue' | 'amber' | 'rose' | 'violet';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Pill({
  active = false,
  color = 'theme',
  size = 'md',
  leftIcon,
  rightIcon,
  children,
  className = '',
  style,
  onClick,
  ...props
}: PillProps) {
  const { theme } = useTheme();

  const baseStyles = `
    inline-flex items-center gap-1.5 font-medium rounded-full border
    transition-all duration-200 cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;

  const sizeStyles = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  const colorMap = {
    theme: { hex: theme.hex, light: theme.lightBg, border: theme.borderLight },
    slate: { hex: '#64748B', light: '#F1F5F9', border: '#E2E8F0' },
    emerald: { hex: '#059669', light: '#ECFDF5', border: '#A7F3D0' },
    blue: { hex: '#2563EB', light: '#EFF6FF', border: '#BFDBFE' },
    amber: { hex: '#D97706', light: '#FFF8E1', border: '#FDE68A' },
    rose: { hex: '#E11D48', light: '#FFF1F2', border: '#FECDD3' },
    violet: { hex: '#7C3AED', light: '#F5F3FF', border: '#DDD6FE' },
  };

  const selectedColor = colorMap[color];
  const sizeClass = sizeStyles[size];

  let backgroundStyle: CSSProperties = {};
  let borderStyle: CSSProperties = {};
  let colorStyle: CSSProperties = {};
  let ringStyle: CSSProperties = {};

  if (active) {
    backgroundStyle = { backgroundColor: selectedColor.hex };
    colorStyle = { color: '#ffffff' };
    borderStyle = { borderColor: 'transparent' };
    ringStyle = { boxShadow: `0 0 0 2px ${selectedColor.hex}45` };
  } else {
    backgroundStyle = { backgroundColor: selectedColor.light };
    borderStyle = { borderColor: selectedColor.border };
    colorStyle = { color: selectedColor.hex };
  }

  return (
    <button
      className={`${baseStyles} ${sizeClass} ${className}`}
      style={{ ...backgroundStyle, ...borderStyle, ...colorStyle, ...ringStyle, ...style }}
      onClick={onClick}
      {...props}
    >
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
}

interface SegmentedControlProps {
  options: Array<{ value: string; label: string; icon?: ReactNode }>;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  color?: 'theme' | 'slate';
}

export function SegmentedControl({
  options,
  value,
  onChange,
  className = '',
  color = 'theme',
}: SegmentedControlProps) {
  const { theme } = useTheme();

  const colorMap = {
    theme: { hex: theme.hex, light: theme.lightBg, border: theme.borderLight },
    slate: { hex: '#64748B', light: '#F1F5F9', border: '#E2E8F0' },
  };

  const selectedColor = colorMap[color];

  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200/90 ${className}`}
      role="group"
      aria-label="Segmented control"
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            value === option.value
              ? 'text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
          style={value === option.value ? { backgroundColor: selectedColor.hex } : {}}
          role="radio"
          aria-checked={value === option.value}
        >
          {option.icon && <span>{option.icon}</span>}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}