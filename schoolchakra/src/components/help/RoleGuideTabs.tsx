'use client';

import { useState } from 'react';
import {
  BookOpen,
  Building2,
  CreditCard,
  GraduationCap,
} from 'lucide-react';
import { useTheme } from '../../contexts';
import { ROLE_HELP_GUIDES } from '../../data/help';
import { Badge, Card } from '../ui';
import { SectionHeader } from '../shared';

const GUIDE_ICONS = {
  admin: Building2,
  teacher: BookOpen,
  student: GraduationCap,
  accounts: CreditCard,
};

export function RoleGuideTabs() {
  const { theme } = useTheme();
  const [activeGuide, setActiveGuide] = useState<'admin' | 'teacher' | 'student' | 'accounts'>('admin');

  const currentGuide = ROLE_HELP_GUIDES.find((g) => g.id === activeGuide) || ROLE_HELP_GUIDES[0];

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
        <SectionHeader
          eyebrow="ROLE-BASED GUIDES"
          title="Guidance organized by workspace"
          description="Select a role below to inspect the key tasks covered in its built-in User Guide."
          className="mb-0"
        />

        <div className="inline-flex flex-wrap gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 self-start">
          {ROLE_HELP_GUIDES.map((guide) => {
            const Icon = GUIDE_ICONS[guide.id];
            const isActive = guide.id === activeGuide;
            return (
              <button
                key={guide.id}
                type="button"
                onClick={() => setActiveGuide(guide.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
                style={isActive ? { backgroundColor: theme.hex } : undefined}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{guide.title.replace(' Guide', '')}</span>
              </button>
            );
          })}
        </div>
      </div>

      <Card variant="elevated" className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">{currentGuide.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">{currentGuide.summary}</p>
          </div>
          <Badge variant="theme" size="xs">{currentGuide.topics.length} Core Topics</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {currentGuide.topics.map((topic) => (
            <div
              key={topic.name}
              className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80"
            >
              <h4 className="text-sm font-bold text-slate-900">{topic.name}</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{topic.detail}</p>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
