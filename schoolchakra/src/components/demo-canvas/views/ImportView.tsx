import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  UploadCloud,
  CheckCircle2,
  FileCheck2,
} from 'lucide-react';
import type { DemoTheme } from '../types';

interface ImportViewProps {
  theme: DemoTheme;
}

export const ImportView: React.FC<ImportViewProps> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState<'students' | 'teachers' | 'fees'>('students');
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const tabs = [
    { id: 'students', label: 'Students' },
    { id: 'teachers', label: 'Teachers' },
    { id: 'fees', label: 'Fee Records' },
  ] as const;

  const currentTabLabel = tabs.find((t) => t.id === activeTab)?.label || 'Students';

  const handleSimulateUpload = () => {
    setUploadedFile(`${currentTabLabel.toLowerCase()}_sample_data_2026.xlsx`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex items-center min-w-0">
        <div
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mr-3 shadow-2xs border transition-colors shrink-0"
          style={{
            backgroundColor: theme.bg,
            color: theme.primary,
            borderColor: theme.border,
          }}
        >
          <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div>
          <h1 className="text-base sm:text-xl font-bold text-gray-900 tracking-tight">
            Bulk Data Import
          </h1>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
            Onboard new data into SchoolChakra via Excel (.xlsx) or CSV files.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100/70 p-1 rounded-xl sm:rounded-2xl overflow-x-auto custom-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setUploadedFile(null);
              }}
              className={`flex-1 py-1.5 sm:py-2.5 px-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap text-center ${
                isActive
                  ? 'bg-white shadow-2xs ring-1 ring-black/5'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
              }`}
              style={isActive ? { color: theme.text } : undefined}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Import Card */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xs border border-gray-100 overflow-hidden relative">
        {/* Top colored accent line */}
        <div
          className="absolute top-0 left-0 w-full h-1"
          style={{
            background: `linear-gradient(to right, ${theme.primary}, ${theme.text})`,
          }}
        />

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 sm:mb-6">
            <div>
              <h2 className="text-sm sm:text-lg font-bold text-gray-900">
                Import {currentTabLabel}
              </h2>
              <p className="text-gray-500 text-[11px] sm:text-sm mt-0.5">
                Import {currentTabLabel.toLowerCase()} records and map them to classes/sections.
              </p>
            </div>
            <button
              type="button"
              className="w-full sm:w-auto flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl font-medium text-xs sm:text-sm border transition-all cursor-pointer shadow-2xs hover:shadow-xs"
              style={{
                backgroundColor: theme.bg,
                color: theme.text,
                borderColor: theme.border,
              }}
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
              <span>Download Template</span>
            </button>
          </div>

          {/* Upload Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleSimulateUpload();
            }}
            onClick={handleSimulateUpload}
            className={`border-2 border-dashed rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-blue-500 bg-blue-50/50'
                : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50/60'
            }`}
          >
            <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 mb-3 sm:mb-4 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center">
              {uploadedFile ? (
                <FileCheck2 className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
              ) : (
                <UploadCloud className="w-6 h-6 sm:w-8 sm:h-8" />
              )}
            </div>
            {uploadedFile ? (
              <>
                <p className="text-xs sm:text-base font-semibold text-emerald-700 mb-0.5 truncate">
                  Ready to import: {uploadedFile}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500">Tap to replace file</p>
              </>
            ) : (
              <>
                <p className="text-xs sm:text-base font-semibold text-gray-900 mb-1">
                  Tap or drag file here to upload
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500">
                  Support for single .xlsx, .xls, or .csv upload.
                </p>
              </>
            )}
          </div>

          {/* Start Import Button */}
          <div className="mt-4 sm:mt-6 flex justify-end">
            <button
              type="button"
              disabled={!uploadedFile}
              className={`w-full sm:w-auto flex items-center justify-center px-4 sm:px-5 py-2 sm:py-2.5 text-white rounded-xl shadow-xs font-medium text-xs sm:text-sm transition-all ${
                uploadedFile
                  ? 'cursor-pointer hover:shadow-md'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              style={{ backgroundColor: theme.primary }}
            >
              <UploadCloud className="w-4 h-4 mr-2" />
              Start Import
            </button>
          </div>
        </div>

        {/* Mock Success Result */}
        <div className="p-4 sm:p-6 border-t bg-emerald-50/50 border-emerald-100">
          <div className="flex items-start">
            <div className="mt-0.5 mr-3 p-1.5 sm:p-2 rounded-full bg-emerald-100 text-emerald-600 shrink-0">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-emerald-900 mb-0.5">
                Previous Import Successful
              </h3>
              <p className="text-emerald-700 text-[11px] sm:text-xs mb-3">
                All records were saved safely to the database.
              </p>
              <div className="grid grid-cols-2 gap-2.5 sm:flex sm:gap-4">
                <div className="bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-emerald-200 shadow-2xs">
                  <p className="text-[9px] sm:text-[10px] text-emerald-600 font-semibold uppercase tracking-wider">
                    Records
                  </p>
                  <p className="text-base sm:text-xl font-bold text-emerald-900 font-mono">247</p>
                </div>
                <div className="bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-emerald-200 shadow-2xs">
                  <p className="text-[9px] sm:text-[10px] text-emerald-600 font-semibold uppercase tracking-wider">
                    Time Taken
                  </p>
                  <p className="text-base sm:text-xl font-bold text-emerald-900 font-mono">3.2s</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
