import type { ReactNode } from 'react';
import { Badge } from '../ui';

interface SectionHeaderProps {
  eyebrow: string;
  eyebrowIcon?: ReactNode;
  title: ReactNode;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  eyebrowIcon,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={`${isCenter ? 'max-w-3xl mx-auto text-center' : 'max-w-3xl'} mb-8 sm:mb-12 ${className}`}
    >
      <Badge variant="outline" size="xs" leftIcon={eyebrowIcon}>
        {eyebrow}
      </Badge>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 mt-2.5 leading-tight">
        {title}
      </h2>
      {description && (
        <p
          className={`text-slate-600 mt-2.5 text-sm sm:text-base leading-relaxed ${
            isCenter ? 'max-w-2xl mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
