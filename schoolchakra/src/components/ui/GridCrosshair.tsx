import type { HTMLAttributes } from 'react';

interface GridCrosshairProps extends HTMLAttributes<HTMLDivElement> {}

export function GridCrosshair({ className = '', ...props }: GridCrosshairProps) {
  return (
    <div
      className={`pointer-events-none select-none absolute w-3 h-3 flex items-center justify-center text-slate-300 font-mono text-xs leading-none z-10 ${className}`}
      {...props}
    >
      +
    </div>
  );
}

export function GridLines(_props: HTMLAttributes<HTMLDivElement>) {
  return null;
}