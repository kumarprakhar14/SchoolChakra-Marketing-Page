'use client';

import { Children, type HTMLAttributes, type ReactNode } from 'react';
import { getInitials } from '../../utils';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square' | 'rounded';
  status?: 'online' | 'offline' | 'busy' | 'away';
  statusPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  shape = 'circle',
  status,
  statusPosition = 'bottom-right',
  className = '',
  style,
  ...props
}: AvatarProps) {
  const sizeStyles = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-24 h-24 text-2xl',
  };

  const shapeStyles = {
    circle: 'rounded-full',
    square: 'rounded-none',
    rounded: 'rounded-xl',
  };

  const sizeClass = sizeStyles[size];
  const shapeClass = shapeStyles[shape];

  const statusStyles = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-400',
    busy: 'bg-rose-500',
    away: 'bg-amber-500',
  };

  const statusPositionStyles = {
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
  };

  const statusSize = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
    '2xl': 'w-4 h-4',
  };

  const initials = fallback ? getInitials(fallback) : '?';

  const backgroundStyle = src ? {} : { backgroundColor: 'var(--brand-hex, #2563EB)' };

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden ${sizeClass} ${shapeClass} ${className}`}
      style={{ ...backgroundStyle, ...style }}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt || fallback || 'Avatar'}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <span className="font-bold text-white">{initials}</span>
      )}
      {status && (
        <span
          className={`absolute ${statusPositionStyles[statusPosition]} ${statusSize[size]} rounded-full border-2 border-white ${statusStyles[status]}`}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}

interface AvatarGroupProps {
  children: ReactNode;
  max?: number;
  overlap?: number;
  className?: string;
}

export function AvatarGroup({ children, max = 5, overlap = -8, className = '' }: AvatarGroupProps) {
  const childrenArray = Children.toArray(children);
  const visibleChildren = childrenArray.slice(0, max);
  const remainingCount = childrenArray.length - max;

  return (
    <div className={`flex ${className}`} role="group" aria-label="Avatar group">
      {visibleChildren.map((child, index) => (
        <div
          key={index}
          className="relative"
          style={{
            zIndex: visibleChildren.length - index,
            marginLeft: index === 0 ? 0 : overlap,
          }}
        >
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 border-2 border-white"
          style={{
            marginLeft: overlap,
            zIndex: 0,
          }}
        >
          <span className="text-xs font-medium text-slate-600">+{remainingCount}</span>
        </div>
      )}
    </div>
  );
}