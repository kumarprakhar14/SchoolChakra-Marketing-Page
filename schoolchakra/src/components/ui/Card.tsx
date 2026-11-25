import type { CSSProperties, HTMLAttributes } from 'react';
import { useTheme } from '../../contexts';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export function Card({
  variant = 'default',
  padding = 'md',
  hover = false,
  children,
  className = '',
  style,
  ...props
}: CardProps) {
  const { theme } = useTheme();

  const baseStyles = 'rounded-2xl transition-all duration-300';

  const variantStyles = {
    default: 'bg-white border border-slate-200',
    elevated: 'bg-white border border-slate-200 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12)]',
    outlined: 'bg-white border-2 border-slate-200',
    glass: 'bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg',
  };

  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  };

  const hoverStyles = hover ? 'hover:shadow-lg hover:border-slate-300' : '';

  const variantClass = variantStyles[variant];
  const paddingClass = paddingStyles[padding];

  let backgroundStyle: CSSProperties = {};
  let borderStyle: CSSProperties = {};

  if (variant === 'glass') {
    backgroundStyle = { backgroundColor: '#ffffffF2' };
    borderStyle = { borderColor: theme.borderLight };
  }

  return (
    <div
      className={`${baseStyles} ${variantClass} ${paddingClass} ${hoverStyles} ${className}`}
      style={{ ...backgroundStyle, ...borderStyle, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={`text-lg font-bold text-slate-900 ${className}`} {...props}>{children}</h3>;
}

export function CardDescription({ children, className = '', ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`text-sm text-slate-600 mt-1 ${className}`} {...props}>{children}</p>;
}

export function CardContent({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props}>{children}</div>;
}

export function CardFooter({ children, className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mt-4 pt-4 border-t border-slate-100 ${className}`} {...props}>
      {children}
    </div>
  );
}