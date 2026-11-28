'use client';

import React, { useState, useMemo } from 'react';
import { IndianRupee, Plus, ShieldCheck, Search } from 'lucide-react';
import type { DemoSchool, DemoTheme, DemoFeeRecord } from '../types';
import { INITIAL_FEES, FEE_STATUS_CONFIG, fmtRupeesFromPaisa } from '../mockData';

interface FeesViewProps {
  school: DemoSchool;
  theme: DemoTheme;
}

export const FeesView: React.FC<FeesViewProps> = ({ school, theme }) => {
  const [fees] = useState<DemoFeeRecord[]>(INITIAL_FEES);
  const [activeSubTab, setActiveSubTab] = useState<'summary' | 'history' | 'verification'>(
    'summary'
  );
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFees = useMemo(() => {
    return fees.filter((f) => {
      const matchesStatus =
        selectedStatus === 'ALL' ||
        f.status === selectedStatus ||
        (selectedStatus === 'PARTIAL' && f.status === 'PARTIALLY_PAID');
      const matchesSearch =
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.erpId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.cls.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [fees, selectedStatus, searchQuery]);

  const statuses = [
    { key: 'ALL', label: 'ALL' },
    { key: 'NO_FEES', label: 'NO FEES' },
    { key: 'PAID', label: 'PAID' },
    { key: 'PARTIALLY_PAID', label: 'PARTIAL' },
    { key: 'PENDING', label: 'PENDING' },
    { key: 'OVERDUE', label: 'OVERDUE' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-2.5">
        <div className="flex items-center min-w-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mr-3 shadow-2xs border border-emerald-200/50 shrink-0">
            <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-xl font-bold text-gray-900 tracking-tight">
              Accounts & Fees
            </h2>
            <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5">
              Manage student fee records & transactions
            </p>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-white rounded-xl shadow-xs hover:shadow-md transition-all font-medium text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 cursor-pointer ml-auto sm:ml-0"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Transaction
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex space-x-2 border-b border-gray-200 text-xs sm:text-sm font-medium overflow-x-auto custom-scrollbar">
        <button
          type="button"
          onClick={() => setActiveSubTab('summary')}
          className={`pb-2.5 sm:pb-3 px-3 sm:px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeSubTab === 'summary'
              ? 'border-emerald-500 text-emerald-700 font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Student Fee Summary
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('history')}
          className={`pb-2.5 sm:pb-3 px-3 sm:px-4 border-b-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeSubTab === 'history'
              ? 'border-emerald-500 text-emerald-700 font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Transaction History
        </button>
        <button
          type="button"
          onClick={() => setActiveSubTab('verification')}
          className={`pb-2.5 sm:pb-3 px-3 sm:px-4 border-b-2 transition-all cursor-pointer flex items-center whitespace-nowrap shrink-0 ${
            activeSubTab === 'verification'
              ? 'border-emerald-500 text-emerald-700 font-bold'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
          <span>Verification</span>
        </button>
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap gap-2.5 bg-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-xs border border-gray-100 items-center justify-between">
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search student or ERP ID..."
            className="w-full pl-8 sm:pl-9 pr-3 py-1.5 bg-gray-50 border-none rounded-xl text-xs sm:text-sm outline-none focus:ring-1 focus:ring-gray-300 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar w-full sm:w-auto">
          {statuses.map((sc) => {
            const isSelected =
              selectedStatus === sc.key ||
              (sc.key === 'PARTIALLY_PAID' && selectedStatus === 'PARTIAL');
            return (
              <button
                key={sc.key}
                type="button"
                onClick={() => setSelectedStatus(sc.key)}
                className={`flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border text-[11px] sm:text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-gray-900 text-white border-gray-900 shadow-2xs'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                {sc.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Fees Table with Horizontal Scroll */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm min-w-[620px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/30">
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Student
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Class/Sec
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Total Billed
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Amount Due
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Due Date
                </th>
                <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredFees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-xs text-gray-400">
                    No fee records found.
                  </td>
                </tr>
              ) : (
                filteredFees.map((f) => {
                  const sc = FEE_STATUS_CONFIG[f.status];
                  return (
                    <tr
                      key={f.id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="font-bold text-gray-900 text-xs sm:text-sm">{f.name}</p>
                        <p className="text-[10px] text-gray-500 font-mono mt-0.5">{f.erpId}</p>
                      </td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">{f.cls}</td>
                      <td className="px-4 py-3 font-mono font-medium text-xs sm:text-sm text-gray-600">
                        {fmtRupeesFromPaisa(f.billed)}
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-xs sm:text-sm text-gray-900">
                        {fmtRupeesFromPaisa(f.due)}
                      </td>
                      <td className="px-4 py-3 text-xs sm:text-sm text-gray-600">
                        {f.dueDate
                          ? new Date(`${f.dueDate}T00:00:00Z`).toLocaleDateString('en-IN', {
                              timeZone: 'UTC',
                            })
                          : '-'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 ${sc.bg} ${sc.text} text-[10px] font-bold rounded-md border ${sc.border} inline-flex items-center`}
                        >
                          {sc.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {f.status === 'NO_FEES' ? (
                          <button
                            type="button"
                            className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                            style={{
                              backgroundColor: theme.bg,
                              color: theme.text,
                            }}
                          >
                            Create Invoice
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="text-emerald-600 hover:text-emerald-700 text-xs font-medium bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            View History
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-2.5 sm:p-3 text-center border-t border-gray-100">
          <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400">
            Showing {filteredFees.length} of {school.students} students • Server-side paginated
          </span>
        </div>
      </div>
    </div>
  );
};
