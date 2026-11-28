'use client';

import { useState } from 'react';
import { Clock, FileText } from 'lucide-react';
import { useTheme } from '../../contexts';
import {
  RESOURCE_CATEGORIES,
  RESOURCE_ITEMS,
  type ResourceCategory,
} from '../../data/resources';
import { Badge, Card } from '../ui';
import { PlaceholderNotice, SectionHeader } from '../shared';

export function ResourceCatalog() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('All');

  const filteredItems =
    selectedCategory === 'All'
      ? RESOURCE_ITEMS
      : RESOURCE_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <SectionHeader
          eyebrow="RESOURCE TOPICS"
          title="Browse by operational area"
          className="mb-0"
        />

        <div className="flex flex-wrap gap-1.5">
          {RESOURCE_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                  active
                    ? 'text-white border-transparent shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:border-slate-300'
                }`}
                style={active ? { backgroundColor: theme.hex } : undefined}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <PlaceholderNotice
        className="mb-8"
        label="Editorial library in progress"
        title="Full articles are currently being prepared"
        message="The topics listed below represent our planned educational guides. Full long-form articles and publication dates are not yet published. In the meantime, explore our Onboarding Guide and Help Center for practical operational documentation."
        ctaLabel="Visit Help Center"
        ctaTo="/help"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <Card key={item.id} className="bg-white flex flex-col justify-between p-6">
            <div>
              <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-4 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span>Editorial Topic</span>
                </div>
                <Badge variant="outline" size="xs">
                  {item.status === 'published' ? 'Published' : 'Coming soon'}
                </Badge>
              </div>

              <Badge variant="theme" size="xs" className="mb-2.5">
                {item.category}
              </Badge>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {item.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {item.excerpt}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {item.publishedAt || 'Article in preparation'}
              </span>
              {item.readingTime && <span className="font-mono">{item.readingTime}</span>}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
