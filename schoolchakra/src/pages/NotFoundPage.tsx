import { ArrowLeft } from 'lucide-react';
import { Link } from '../router';
import { usePageMeta } from '../seo/usePageMeta';
import { Button } from '../components/ui';
import { PageHero } from '../components/shared';

export function NotFoundPage() {
  usePageMeta({
    title: 'Page Not Found — SchoolChakra',
    description: 'The requested page could not be found on SchoolChakra.',
    canonicalPath: '/404',
  });

  return (
    <PageHero
      eyebrow="404 • PAGE NOT FOUND"
      title="We couldn't find that page."
      description="The link may have moved or does not exist. Return to the overview or explore SchoolChakra's features."
      actions={
        <>
          <Link to="/">
            <Button size="lg" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Overview
            </Button>
          </Link>
          <Link to="/features">
            <Button variant="outline" size="lg">
              Explore Features
            </Button>
          </Link>
        </>
      }
    />
  );
}
