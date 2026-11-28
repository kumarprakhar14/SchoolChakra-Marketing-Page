import { HELP_CATEGORIES } from './categories';
import { GETTING_STARTED_ARTICLES } from './articles-getting-started';
import { SCHOOL_ADMIN_ARTICLES } from './articles-school-admin';
import { TEACHER_ARTICLES } from './articles-teacher';
import { STUDENT_ARTICLES } from './articles-student';
import { ACCOUNTS_ARTICLES } from './articles-accounts';
import { COMMON_HELP_ARTICLES } from './articles-common';
import type { HelpArticle, HelpCategoryMeta, HelpCategorySlug } from './types';

export * from './types';
export { HELP_CATEGORIES };

export const ALL_HELP_ARTICLES: HelpArticle[] = [
  ...GETTING_STARTED_ARTICLES,
  ...SCHOOL_ADMIN_ARTICLES,
  ...TEACHER_ARTICLES,
  ...STUDENT_ARTICLES,
  ...ACCOUNTS_ARTICLES,
  ...COMMON_HELP_ARTICLES,
];

export function getCategoryMeta(slug: string): HelpCategoryMeta | undefined {
  return HELP_CATEGORIES.find((cat) => cat.slug === slug);
}

export function getArticlesByCategory(category: HelpCategorySlug): HelpArticle[] {
  return ALL_HELP_ARTICLES.filter((article) => article.category === category);
}

export function getArticle(category: string, slug: string): HelpArticle | undefined {
  return ALL_HELP_ARTICLES.find(
    (article) => article.category === category && article.slug === slug
  );
}

export function getAdjacentArticles(
  category: HelpCategorySlug,
  slug: string
): { prev?: HelpArticle; next?: HelpArticle } {
  const list = getArticlesByCategory(category);
  const idx = list.findIndex((a) => a.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? list[idx - 1] : undefined,
    next: idx < list.length - 1 ? list[idx + 1] : undefined,
  };
}

export interface HelpSearchResult {
  article: HelpArticle;
  categoryMeta: HelpCategoryMeta;
  score: number;
  matchedTokens: string[];
}

const SEARCH_STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'can',
  'do',
  'does',
  'for',
  'how',
  'i',
  'in',
  'is',
  'it',
  'me',
  'my',
  'of',
  'on',
  'or',
  'see',
  'the',
  'to',
  'what',
  'when',
  'where',
  'which',
  'who',
  'why',
  'with',
  'you',
  'your',
]);

export function tokenizeSearchQuery(rawQuery: string): string[] {
  const cleaned = rawQuery
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .trim();
  if (!cleaned) return [];

  const allWords = cleaned.split(/\s+/).filter(Boolean);
  const meaningful = allWords.filter((w) => !SEARCH_STOP_WORDS.has(w) && w.length > 1);
  return meaningful.length > 0 ? meaningful : allWords;
}

export function searchHelpArticles(
  rawQuery: string,
  categoryFilter: HelpCategorySlug | 'all' = 'all'
): HelpSearchResult[] {
  const normalizedQuery = rawQuery.toLowerCase().replace(/[^\w\s]/g, ' ').trim();
  const tokens = tokenizeSearchQuery(rawQuery);
  if (tokens.length === 0) return [];

  const results: HelpSearchResult[] = [];

  for (const article of ALL_HELP_ARTICLES) {
    if (categoryFilter !== 'all' && article.category !== categoryFilter) {
      continue;
    }

    const titleLower = article.title.toLowerCase();
    const summaryLower = article.summary.toLowerCase();
    const groupLower = article.group.toLowerCase();
    const keywordsLower = article.keywords.join(' ').toLowerCase();
    const accessLower = article.accessPath.toLowerCase();
    const contentLower = [
      article.understanding.whatItIs,
      article.understanding.whyYouNeedIt,
      ...article.understanding.whatItProvides,
      ...article.interfaceOverview.elements.map((e) => `${e.name} ${e.description}`),
      ...article.instructions.flatMap((sec) =>
        sec.steps.map((s) => `${s.title} ${s.instruction} ${s.expectedResult || ''}`)
      ),
    ]
      .join(' ')
      .toLowerCase();

    const fullHaystack = `${titleLower} ${summaryLower} ${groupLower} ${keywordsLower} ${accessLower} ${contentLower}`;
    const allTokensMatch = tokens.every((token) => fullHaystack.includes(token));
    if (!allTokensMatch) continue;

    let score = 0;

    if (titleLower.includes(normalizedQuery)) {
      score += 120;
    } else if (tokens.every((t) => titleLower.includes(t))) {
      score += 85;
    } else {
      score += tokens.filter((t) => titleLower.includes(t)).length * 25;
    }

    if (keywordsLower.includes(normalizedQuery)) {
      score += 80;
    } else {
      score += tokens.filter((t) => keywordsLower.includes(t)).length * 30;
    }

    if (summaryLower.includes(normalizedQuery)) {
      score += 45;
    } else {
      score += tokens.filter((t) => summaryLower.includes(t)).length * 15;
    }

    if (groupLower.includes(normalizedQuery)) {
      score += 20;
    }

    score += tokens.filter((t) => contentLower.includes(t)).length * 5;

    const categoryMeta = getCategoryMeta(article.category);
    if (categoryMeta) {
      results.push({ article, categoryMeta, score, matchedTokens: tokens });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
