export type HelpCategorySlug =
  | 'getting-started'
  | 'school-admin'
  | 'teacher'
  | 'student'
  | 'accounts'
  | 'common-help';

export type HelpRoleTag =
  | 'All Roles'
  | 'School Admin'
  | 'Teacher'
  | 'Student'
  | 'Accounts';

export type InterfaceElementKind =
  | 'Button'
  | 'Filter'
  | 'Table'
  | 'Tab'
  | 'Card'
  | 'Form Field'
  | 'Status Badge'
  | 'Menu'
  | 'Link'
  | 'Chart';

export interface InterfaceElement {
  name: string;
  kind: InterfaceElementKind;
  description: string;
}

export interface ScreenshotAnnotation {
  number: number;
  label: string;
  detail: string;
}

/**
 * Optional screenshot definition. Only attach verified, anonymized application
 * screenshots stored under /public/help-screenshots/.
 */
export interface ArticleScreenshot {
  src: string;
  alt: string;
  caption?: string;
  annotations?: ScreenshotAnnotation[];
}

export interface InstructionStep {
  title: string;
  location?: string;
  requiredInfo?: string;
  instruction: string;
  expectedResult?: string;
}

export interface StepSection {
  groupTitle?: string;
  steps: InstructionStep[];
}

export interface CalloutNote {
  type: 'info' | 'warning' | 'restriction';
  title: string;
  body: string;
}

export interface RelatedArticleRef {
  category: HelpCategorySlug;
  slug: string;
  reason?: string;
}

export interface HelpArticle {
  slug: string;
  category: HelpCategorySlug;
  group: string;
  title: string;
  summary: string;
  audience: HelpRoleTag[];
  accessPath: string;
  prerequisites?: string[];
  keywords: string[];
  understanding: {
    whatItIs: string;
    whyYouNeedIt: string;
    whatItProvides: string[];
  };
  interfaceOverview: {
    intro?: string;
    elements: InterfaceElement[];
    screenshots?: ArticleScreenshot[];
  };
  instructions: StepSection[];
  notes?: CalloutNote[];
  expectedOutcome: {
    summary: string;
    verifyAt: string;
  };
  relatedSlugs?: RelatedArticleRef[];
}

export interface HelpCategoryMeta {
  slug: HelpCategorySlug;
  title: string;
  shortTitle: string;
  roleLabel: HelpRoleTag;
  description: string;
  overviewIntro: string;
  gettingStartedNote?: string;
  popularTasks: { label: string; slug: string }[];
  groups: string[];
}
