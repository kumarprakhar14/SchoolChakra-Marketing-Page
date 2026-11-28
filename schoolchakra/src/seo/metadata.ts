import type { Metadata } from 'next';
import { ENV } from '../config/env';

export const SITE_URL = ENV.siteUrl;
export const SITE_NAME = 'SchoolChakra';

export const DEFAULT_TITLE =
  'SchoolChakra: School ERP for Fees, Attendance & Timetables (India)';
export const DEFAULT_DESCRIPTION =
  'SchoolChakra runs fees, UPI receipts, attendance, timetables, and notices for Indian schools — with separate workspaces for principals, teachers, accounts staff, and students. Apply for the founding pilot.';

export interface BuildMetadataOptions {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  noIndex?: boolean;
}

export function buildPageMetadata({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const normalizedPath = canonicalPath
    ? canonicalPath === '/'
      ? '/'
      : canonicalPath
    : undefined;
  const canonicalUrl = normalizedPath ? `${SITE_URL}${normalizedPath}` : undefined;

  return {
    title,
    description,
    ...(normalizedPath
      ? {
          alternates: {
            canonical: normalizedPath,
          },
        }
      : {}),
    openGraph: {
      title,
      description,
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      siteName: SITE_NAME,
      type: ogType,
      locale: 'en_IN',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/opengraph-image'],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export const HOME_SOFTWARE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SchoolChakra',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  url: SITE_URL,
  description:
    'School management software for attendance, timetables, assignments, notices, and fee operations.',
};
