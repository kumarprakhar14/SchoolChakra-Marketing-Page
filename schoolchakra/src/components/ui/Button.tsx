import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import { useTheme } from '../../contexts';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  style,
  ...props
}: ButtonProps) {
  const { theme } = useTheme();

  const baseStyles = `
    inline-flex items-center justify-center font-semibold rounded-full
    transition-all duration-200 cursor-pointer
    ${fullWidth ? 'text-center whitespace-normal sm:whitespace-nowrap' : 'whitespace-nowrap'}
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantStyles = {
    primary: `text-white shadow-sm hover:opacity-95`,
    secondary: `text-white shadow-sm hover:opacity-95`,
    outline: `border transition-all`,
    ghost: `text-slate-600 hover:text-slate-900 hover:bg-white/60`,
    danger: `bg-rose-600 text-white hover:bg-rose-700`,
    success: `bg-emerald-600 text-white hover:bg-emerald-700`,
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  const variantClass = variantStyles[variant];
  const sizeClass = sizeStyles[size];
  const widthClass = fullWidth ? 'w-full' : '';

  let backgroundStyle: CSSProperties = {};
  let borderStyle: CSSProperties = {};
  let ringStyle: CSSProperties = {};

  if (variant === 'primary' || variant === 'secondary') {
    backgroundStyle = { backgroundColor: theme.hex };
    ringStyle = { boxShadow: `0 0 0 2px ${theme.hex}45` };
  } else if (variant === 'outline') {
    backgroundStyle = { backgroundColor: theme.lightBg };
    borderStyle = { borderColor: theme.borderLight, color: theme.hex };
    ringStyle = { boxShadow: `0 0 0 2px ${theme.hex}45` };
  } else if (variant === 'ghost') {
    backgroundStyle = { backgroundColor: theme.lightBg };
    borderStyle = { borderColor: theme.borderLight, color: theme.hex };
  } else if (variant === 'danger') {
    backgroundStyle = { backgroundColor: '#E11D48' };
    ringStyle = { boxShadow: '0 0 0 2px #E11D4845' };
  } else if (variant === 'success') {
    backgroundStyle = { backgroundColor: '#059669' };
    ringStyle = { boxShadow: '0 0 0 2px #05966945' };
  }

  return (
    <button
      className={`${baseStyles} ${variantClass} ${sizeClass} ${widthClass} ${className}`}
      style={{ ...backgroundStyle, ...borderStyle, ...ringStyle, ...style }}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}