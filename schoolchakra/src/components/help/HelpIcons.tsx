import {
  BookOpen,
  Building2,
  Compass,
  CreditCard,
  GraduationCap,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import type { HelpCategorySlug } from '../../data/help-center';

export const CATEGORY_ICONS: Record<HelpCategorySlug, LucideIcon> = {
  'getting-started': Rocket,
  'school-admin': Building2,
  teacher: BookOpen,
  student: GraduationCap,
  accounts: CreditCard,
  'common-help': Compass,
};
