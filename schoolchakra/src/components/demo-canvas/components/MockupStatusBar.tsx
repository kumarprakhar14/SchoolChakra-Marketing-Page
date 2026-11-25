import React from 'react';
import { Clock, X } from 'lucide-react';

interface MockupStatusBarProps {
  cronVisible: boolean;
  onDismissCron: () => void;
}

export const MockupStatusBar: React.FC<MockupStatusBarProps> = ({
  cronVisible,
  onDismissCron,
}) => {
  if (!cronVisible) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-end px-3 sm:px-4 py-1.5 sm:py-2 bg-white/95 backdrop-blur-md border-t border-slate-200/80 text-[11px] sm:text-xs gap-2">
      <div className="flex items-center gap-1.5 sm:gap-2 bg-blue-50 border border-blue-200 rounded-lg px-2 sm:px-2.5 py-0.5 sm:py-1 animate-slideIn max-w-[190px] sm:max-w-none">
        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600 shrink-0" />
        <span className="font-bold text-blue-700 truncate">Auto-Finalized</span>
        <span className="text-blue-500 hidden sm:inline">Class 10-A Attendance record finalized after 48h</span>
        <button
          type="button"
          onClick={onDismissCron}
          className="text-blue-400 hover:text-blue-600 ml-auto p-0.5 rounded transition-colors shrink-0 cursor-pointer"
          title="Dismiss notification"
        >
          <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
      </div>
    </div>
  );
};
