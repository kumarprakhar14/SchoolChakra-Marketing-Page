import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'SchoolChakra: School ERP for Fees, Attendance & Timetables (India)';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

const publicDir = join(process.cwd(), 'public');
const appLogoDataUri = `data:image/png;base64,${readFileSync(join(publicDir, 'App_logo_light.png')).toString('base64')}`;
const wordmarkDataUri = `data:image/png;base64,${readFileSync(join(publicDir, 'Wordmark.png')).toString('base64')}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          background:
            'radial-gradient(circle at top left, #DBEAFE 0%, #FFFFFF 55%, #F8FAFC 100%)',
          color: '#0F172A',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img src={appLogoDataUri} width={56} height={56} alt="" />
          <img src={wordmarkDataUri} width={314} height={24} alt="SchoolChakra" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '940px' }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
            }}
          >
            Every role. Every classroom. Connected under one roof.
          </div>
          <div style={{ fontSize: '26px', color: '#475569', lineHeight: 1.4 }}>
            Fees, UPI receipts, attendance, timetables, and notices for Indian schools — with
            dedicated workspaces for Principals, Teachers, Accounts, and Students.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #CBD5E1',
            paddingTop: '24px',
            fontSize: '20px',
            color: '#334155',
          }}
        >
          <span>Founding School Pilot Open</span>
          <span style={{ color: '#2563EB', fontWeight: 700 }}>schoolchakra.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
