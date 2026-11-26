import type { ReactNode } from 'react';
import { useTheme } from '../../contexts';
import { Badge } from '../ui';

interface PageHeroProps {
  eyebrow: string;
  eyebrowIcon?: ReactNode;
  title: ReactNode;
  description: string;
  actions?: ReactNode;
  metaStrip?: ReactNode;
  children?: ReactNode;
  centered?: boolean;
}

export function PageHero({
  eyebrow,
  eyebrowIcon,
  title,
  description,
  actions,
  metaStrip,
  children,
  centered = true,
}: PageHeroProps) {
  const { theme } = useTheme();

  return (
    <section className="relative z-10 w-full pt-10 sm:pt-12 pb-14 sm:pb-16">
      <div
        className="pointer-events-none absolute top-0 inset-x-0 h-[520px] transition-colors duration-700"
        style={{
          background: `radial-gradient(65% 55% at 50% 0%, ${theme.lightBg} 0%, rgba(255, 255, 255, 0) 100%)`,
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className={centered ? 'max-w-4xl mx-auto text-center' : 'max-w-3xl'}>
          <Badge variant="outline" size="xs" leftIcon={eyebrowIcon} className="mb-4">
            {eyebrow}
          </Badge>

          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-slate-900 leading-[1.13] mb-4">
            {title}
          </h1>

          <p
            className={`text-base sm:text-lg text-slate-600 leading-relaxed font-normal ${
              centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'
            }`}
          >
            {description}
          </p>

          {actions && (
            <div
              className={`mt-7 flex flex-wrap items-center gap-3 ${
                centered ? 'justify-center' : 'justify-start'
              }`}
            >
              {actions}
            </div>
          )}

          {metaStrip && (
            <div
              className={`mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500 ${
                centered ? 'justify-center' : 'justify-start'
              }`}
            >
              {metaStrip}
            </div>
          )}
        </div>

        {children && <div className="mt-10 sm:mt-12">{children}</div>}
      </div>
    </section>
  );
}
