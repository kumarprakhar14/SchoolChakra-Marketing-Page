import type { AccordionItem } from '../components/shared';

export interface UpcomingPlan {
  id: 'free' | 'starter' | 'growth' | 'enterprise';
  name: string;
}

export const UPCOMING_PLANS: UpcomingPlan[] = [
  { id: 'free', name: 'Free' },
  { id: 'starter', name: 'Starter' },
  { id: 'growth', name: 'Growth' },
  { id: 'enterprise', name: 'Enterprise' },
];

export const PRICING_FAQS: AccordionItem[] = [
  {
    question: 'What does the Founding Pilot cost?',
    answer:
      'The Founding School Pilot Program is completely free of cost and cancellable anytime, with no setup fees or payment commitment required.',
  },
  {
    question: 'When will pricing and feature details for Free, Starter, Growth, and Enterprise be available?',
    answer:
      'Pricing and feature breakdowns for our upcoming plans (Free, Starter, Growth, and Enterprise) are coming soon. In the meantime, schools can join through the free Founding Pilot or contact our team directly.',
  },
  {
    question: 'Can we move to a standard plan later?',
    answer:
      'Yes. Once standard plans are finalized and released, schools participating in the pilot can choose whether to transition to a plan or cancel anytime.',
  },
  {
    question: 'Can we request a walkthrough before deciding?',
    answer:
      'Yes. Apply for the Founding Pilot or reach out through our Contact page to schedule a 20-minute walkthrough tailored to your school.',
  },
  {
    question: 'Is data migration included in the Founding Pilot?',
    answer:
      'Yes. Founding Pilot schools receive guided setup and assisted CSV data migration for student, teacher, and fee records.',
  },
  {
    question: 'How do we get assistance during onboarding?',
    answer:
      'Every school workspace includes a built-in setup checklist, User Guide, and in-app issue reporting. Founding Pilot schools also receive direct onboarding assistance.',
  },
];
