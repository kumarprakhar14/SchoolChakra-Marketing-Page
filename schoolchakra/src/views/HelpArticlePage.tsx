import type { HelpArticle } from '../data/help-center';
import { HelpSidebarNav } from '../components/help/HelpSidebarNav';
import { HelpArticleRenderer } from '../components/help/HelpArticleRenderer';

interface HelpArticlePageProps {
  article: HelpArticle;
}

export function HelpArticlePage({ article }: HelpArticlePageProps) {
  return (
    <section className="relative z-10 w-full py-8 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
          <HelpSidebarNav
            currentCategory={article.category}
            currentSlug={article.slug}
          />
          <HelpArticleRenderer article={article} />
        </div>
      </div>
    </section>
  );
}
