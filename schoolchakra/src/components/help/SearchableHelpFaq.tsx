'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { HELP_FAQS } from '../../data/help';
import { Card } from '../ui';
import { FAQAccordion } from '../shared';

export function SearchableHelpFaq() {
  const [faqQuery, setFaqQuery] = useState('');

  const filteredFaqs = useMemo(() => {
    const q = faqQuery.trim().toLowerCase();
    if (!q) return HELP_FAQS;
    return HELP_FAQS.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
    );
  }, [faqQuery]);

  return (
    <>
      <div className="relative mb-6">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="search"
          value={faqQuery}
          onChange={(e) => setFaqQuery(e.target.value)}
          placeholder="Search attendance, UPI verification, timetable, archival..."
          aria-label="Search common questions"
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-slate-900 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {filteredFaqs.length === 0 ? (
        <Card className="bg-white text-center py-8">
          <p className="text-sm font-semibold text-slate-800">
            No matching questions found for &ldquo;{faqQuery}&rdquo;.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Try another keyword or reach out via our Contact page.
          </p>
        </Card>
      ) : (
        <FAQAccordion items={filteredFaqs} defaultOpenIndex={0} />
      )}
    </>
  );
}
