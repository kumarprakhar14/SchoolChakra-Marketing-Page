import React from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface UpiToastProps {
  onDismiss: () => void;
}

export const UpiToast: React.FC<UpiToastProps> = ({ onDismiss }) => {
  return (
    <div className="absolute top-4 right-4 z-30 animate-toast">
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 w-64">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <p className="text-xs font-bold text-gray-800">Accounts UPI Verification</p>
              <button
                type="button"
                onClick={onDismiss}
                className="text-gray-400 hover:text-gray-600 -mt-0.5 p-0.5 rounded transition-colors"
                title="Dismiss toast"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[10px] text-gray-500 mt-0.5">
              UTR #419028199 • <span className="text-emerald-600 font-bold">Verified</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

