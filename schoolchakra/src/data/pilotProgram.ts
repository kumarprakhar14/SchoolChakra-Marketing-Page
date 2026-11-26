import type { AccordionItem } from '../components/shared';

export const PILOT_HERO_FACTS = [
  {
    label: 'Completely Free',
    detail: 'No subscription or participation fee.',
  },
  {
    label: 'Still Evolving',
    detail: 'The platform is under active development.',
  },
  {
    label: 'No Commitment',
    detail: 'Schools can opt out at any time.',
  },
];

export const PILOT_PARTICIPANT_ACTIVITIES = [
  'Explore and test available SchoolChakra features.',
  'Use supported workflows in day-to-day school operations, where appropriate.',
  'Share feedback about usability, functionality, and missing capabilities.',
  'Report bugs, inconsistencies, and unexpected behavior.',
  'Help prioritize improvements based on actual operational needs.',
];

export const PILOT_REASONS = [
  {
    number: '01',
    title: 'Build Around Real School Workflows',
    description:
      'A school management platform should reflect how schools actually operate, not just how developers imagine they operate. Real usage helps identify practical requirements and overlooked scenarios.',
  },
  {
    number: '02',
    title: 'Identify Problems Earlier',
    description:
      'Testing in real environments helps uncover usability issues, workflow gaps, and unexpected behavior that may not appear during internal development.',
  },
  {
    number: '03',
    title: 'Prioritize What Actually Matters',
    description:
      'Feedback from administrators, teachers, students, and accounts teams helps us understand which improvements have the greatest practical value.',
  },
  {
    number: '04',
    title: 'Improve Through Collaboration',
    description:
      'We want to develop SchoolChakra with an understanding of the people who will actually use it. The pilot creates an opportunity for continuous feedback and improvement.',
  },
];

export const PILOT_EXPECTATIONS = [
  {
    title: 'Active Development',
    badge: 'EVOLVING PLATFORM',
    description:
      'SchoolChakra is still being developed. Features, workflows, and interfaces may change as improvements are introduced.',
  },
  {
    title: 'Incomplete or Changing Features',
    badge: 'AVAILABILITY VARIES',
    description:
      'Some features may be unavailable, incomplete, or subject to change. Not every capability shown on the website should be assumed to be available in the pilot environment.',
  },
  {
    title: 'Occasional Issues',
    badge: 'REAL-WORLD TESTING',
    description:
      'Participants may encounter bugs, unexpected behavior, or workflow limitations. Feedback and issue reports are welcome.',
  },
  {
    title: 'Ongoing Improvements',
    badge: 'ITERATIVE UPDATES',
    description:
      'The platform will continue evolving during the pilot. Improvements may be introduced based on testing, feedback, and development priorities.',
  },
];

export const PILOT_PARTICIPATION_STEPS = [
  {
    step: '01',
    title: 'Express Interest',
    description:
      'A school submits its interest in participating in the pilot program.',
  },
  {
    step: '02',
    title: 'Initial Discussion',
    description:
      'We understand the school’s requirements, current setup, and expectations to determine whether the current platform is suitable for its intended use.',
  },
  {
    step: '03',
    title: 'Setup and Introduction',
    description:
      'If the school proceeds, the necessary setup and onboarding are arranged. This may include configuring the school environment, preparing available records for migration, and introducing relevant staff to the platform.',
  },
  {
    step: '04',
    title: 'Explore and Test',
    description:
      'The school explores the available features and tests relevant workflows within the limitations of the current product.',
  },
  {
    step: '05',
    title: 'Share Feedback',
    description:
      'The school shares its experience, suggestions, and any problems encountered. This feedback helps inform future improvements.',
  },
];

export const FREE_NO_OBLIGATION_POINTS = [
  'No participation fee during the pilot.',
  'No subscription payment during this stage.',
  'No obligation to purchase a plan later.',
  'No obligation to continue participating.',
  'A school can opt out at any time.',
];

export const OPT_OUT_POINTS = [
  'Schools can discontinue participation whenever they choose.',
  'No reason is required to opt out.',
  'There is no early-exit penalty or cancellation charge.',
  'The school is not obligated to continue using the platform after the pilot.',
];

export const ELIGIBLE_SCHOOL_NEEDS = [
  'Managing student and staff records.',
  'Organizing attendance and academic activities.',
  'Managing fee-related workflows.',
  'Improving coordination between administrators, teachers, and students.',
  'Exploring a centralized school management platform.',
];

export const PILOT_PROGRAM_FAQS: AccordionItem[] = [
  {
    question: 'Is SchoolChakra fully developed?',
    answer:
      'No. SchoolChakra is under active development. The pilot gives schools an opportunity to explore the current platform while helping us identify areas that need improvement.',
  },
  {
    question: 'Is participation really free?',
    answer:
      'Yes. Participation in the current pilot program is completely free of cost. There are no pilot participation fees or subscription charges during this stage.',
  },
  {
    question: 'Will all features be available?',
    answer:
      'Not necessarily. Some features may still be under development, incomplete, or unavailable. Which capabilities are available for your school should be discussed during onboarding.',
  },
  {
    question: 'Can we use SchoolChakra for our daily school operations?',
    answer:
      'Schools can explore and test supported workflows. However, because the platform is still evolving, schools should assess its suitability for each workflow and maintain appropriate existing operational arrangements where necessary.',
  },
  {
    question: 'What happens if we encounter a bug?',
    answer:
      'Schools are encouraged to report bugs and unexpected behavior using the in-app Report an Issue option or the feedback channel confirmed during onboarding. The team uses these reports to understand and prioritize improvements.',
  },
  {
    question: 'Are we required to provide feedback?',
    answer:
      'Feedback is appreciated because it helps improve the product, and there are no mandatory reporting quotas or minimum feedback requirements to continue or opt out.',
  },
  {
    question: 'Can we leave the program whenever we want?',
    answer:
      'Yes. Participation is voluntary. A school can opt out at any time without a cancellation fee or obligation to continue.',
  },
  {
    question: 'Will the program remain free forever?',
    answer:
      'The current pilot participation is free of cost. This should not be interpreted as a promise of permanent free access or future commercial pricing terms.',
  },
  {
    question: "What happens to our school's data if we leave?",
    answer:
      'Pending confirmation: Data export, retention, and deletion procedures after opting out of the Pilot Program are currently being finalized. Please confirm these procedures with the SchoolChakra team during your initial discussion before participating.',
  },
  {
    question: 'Will our feedback directly result in a feature being built?',
    answer:
      'Feedback helps inform product decisions and priorities, but not every suggestion can be guaranteed or implemented.',
  },
];
