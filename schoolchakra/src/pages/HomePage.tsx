import {
  Hero,
  Problem,
  RoleSwitcher,
  BentoGrid,
  Architecture,
  FAQ,
  Pilot,
} from '../components/sections';
import { usePageMeta } from '../seo/usePageMeta';

export function HomePage() {
  usePageMeta({
    title: 'SchoolChakra: School ERP for Fees, Attendance & Timetables (India)',
    description:
      'SchoolChakra runs fees, UPI receipts, attendance, timetables, and notices for Indian schools — with separate workspaces for principals, teachers, accounts staff, and students. Apply for the founding pilot.',
    canonicalPath: '/',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'SchoolChakra',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      description:
        'School management software for attendance, timetables, assignments, notices, and fee operations.',
    },
  });

  return (
    <>
      <Hero />
      <Problem />
      <RoleSwitcher />
      <BentoGrid />
      <Architecture />
      <FAQ />
      <Pilot />
    </>
  );
}
