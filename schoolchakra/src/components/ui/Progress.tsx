import { useTheme } from '../../contexts';

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
  className?: string;
  color?: 'theme' | 'emerald' | 'blue' | 'amber' | 'rose';
}

export function Progress({
  value,
  max = 100,
  size = 'md',
  showLabel = false,
  label,
  className = '',
  color = 'theme',
}: ProgressProps) {
  const { theme } = useTheme();

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const colorMap = {
    theme: theme.hex,
    emerald: '#059669',
    blue: '#2563EB',
    amber: '#D97706',
    rose: '#E11D48',
  };

  const trackColor = colorMap[color];
  const sizeClass = sizeStyles[size];

  return (
    <div className={className}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-1.5 text-xs font-medium text-slate-700">
          <span>{label || 'Progress'}</span>
          <span className="font-mono">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-200 rounded-full overflow-hidden ${sizeClass}`}>
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: trackColor }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  color?: 'theme' | 'emerald' | 'blue' | 'amber' | 'rose';
  showValue?: boolean;
}

export function CircularProgress({
  value,
  max = 100,
  size = 48,
  strokeWidth = 4,
  className = '',
  color = 'theme',
  showValue = true,
}: CircularProgressProps) {
  const { theme } = useTheme();

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const colorMap = {
    theme: theme.hex,
    emerald: '#059669',
    blue: '#2563EB',
    amber: '#D97706',
    rose: '#E11D48',
  };

  const strokeColor = colorMap[color];

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold font-mono text-slate-900" style={{ fontSize: size * 0.2 }}>
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}