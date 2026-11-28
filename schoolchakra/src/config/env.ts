/**
 * Centralized public environment configuration for SchoolChakra.
 * Uses static process.env.NEXT_PUBLIC_* property access so Next.js
 * reliably inlines values into client bundles at build time.
 *
 * Server-only secrets (e.g., OAuth access tokens or API keys) must never
 * carry the NEXT_PUBLIC_ prefix or be referenced from client modules.
 */
export const ENV = {
  googleSheetsWebhookUrl: (process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL ?? '').trim(),
  calcomLink: (process.env.NEXT_PUBLIC_CALCOM_LINK ?? '').trim(),
  whatsappPhone: (process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? '').trim(),
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? '').trim() || 'https://schoolchakra.com',
} as const;

export function getWhatsAppPhone(): string {
  const raw =
    ENV.whatsappPhone && ENV.whatsappPhone !== '919876543210'
      ? ENV.whatsappPhone
      : '917289949342';
  return raw.replace(/[^0-9]/g, '');
}
