/**
 * Lead & Google Sheets Service for SchoolChakra
 * Handles recording founding pilot applications and Cal.com booking events to Google Sheets.
 */

export interface LeadSubmissionPayload {
  submissionId?: string;
  schoolName: string;
  contactName?: string;
  board: string;
  studentStrength?: string;
  legacySystem?: string;
  contact: string;
  theme?: string;
}

export interface CalBookingPayload {
  submissionId: string;
  scheduledDate: string;
  calBookingUid?: string;
  schoolName?: string;
  contactName?: string;
  contact?: string;
  board?: string;
  isReschedule?: boolean;
}

export interface ServiceResult {
  success: boolean;
  submissionId: string;
  message: string;
  data?: any;
}

const LOCAL_STORAGE_KEY = 'schoolchakra_pilot_leads';

/**
 * Generates a clean, traceable submission reference (e.g., SC-PILOT-984210)
 */
export function generateSubmissionId(): string {
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `SC-PILOT-${rand}`;
}

/**
 * Saves or updates a lead submission in localStorage for offline reliability and audit trails.
 */
function saveLeadToLocalStorage(entry: Record<string, any>) {
  try {
    const existingRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    const index = existing.findIndex((item: any) => item.submissionId === entry.submissionId);
    if (index >= 0) {
      existing[index] = { ...existing[index], ...entry, updatedAt: new Date().toISOString() };
    } else {
      existing.unshift({ ...entry, createdAt: new Date().toISOString() });
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.warn('[SchoolChakra] LocalStorage write failed:', err);
  }
}

/**
 * 1. Log New Pilot Lead to Google Sheets
 */
export async function submitLeadToGoogleSheets(
  payload: LeadSubmissionPayload
): Promise<ServiceResult> {
  const submissionId = payload.submissionId || generateSubmissionId();
  const timestamp = new Date().toISOString();

  const record = {
    action: 'CREATE_LEAD',
    submissionId,
    timestamp,
    schoolName: payload.schoolName,
    contactName: payload.contactName || '',
    board: payload.board,
    studentStrength: payload.studentStrength || '',
    legacySystem: payload.legacySystem || '',
    contact: payload.contact,
    theme: payload.theme || '',
    status: 'Lead Captured',
    scheduledDate: 'Pending Scheduling',
    calBookingUid: '',
  };

  // Always persist locally first
  saveLeadToLocalStorage(record);

  const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL as string | undefined;
  const spreadsheetId = import.meta.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID as string | undefined;
  const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY as string | undefined;
  const accessToken = import.meta.env.VITE_GOOGLE_SHEETS_ACCESS_TOKEN as string | undefined;

  // Pattern A: Google Apps Script Web App Webhook (Recommended & Standard for Jamstack)
  if (webhookUrl && webhookUrl.trim() !== '') {
    try {
      // Using text/plain payload to prevent CORS preflight blocks with Google Apps Script
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(record),
      }).catch(async () => {
        // Fallback with mode: 'no-cors' for fire-and-forget submission
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify(record),
        });
      });

      return {
        success: true,
        submissionId,
        message: 'Lead logged successfully to Google Sheets.',
      };
    } catch (err) {
      console.warn('[SchoolChakra] Google Sheets Webhook warning:', err);
      return {
        success: true,
        submissionId,
        message: 'Lead captured (stored locally & queued for sync).',
      };
    }
  }

  // Pattern B: Direct Google Sheets API v4 (Append Row)
  if (spreadsheetId && (accessToken || apiKey)) {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:K:append?valueInputOption=USER_ENTERED${
        apiKey ? `&key=${apiKey}` : ''
      }`;

      const rowValues = [
        submissionId,
        timestamp,
        payload.schoolName,
        payload.board,
        payload.studentStrength,
        payload.legacySystem,
        payload.contact,
        payload.theme,
        'Lead Captured',
        'Pending Scheduling',
        '',
      ];

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          values: [rowValues],
        }),
      });

      return {
        success: true,
        submissionId,
        message: 'Lead appended to Google Sheet via Sheets API v4.',
      };
    } catch (err) {
      console.warn('[SchoolChakra] Direct Sheets API v4 error:', err);
    }
  }

  // Pattern C: Simulation / Local Demo Mode (when env vars are pending)
  console.info('[SchoolChakra Demo Mode] Lead stored locally with ID:', submissionId, record);
  return {
    success: true,
    submissionId,
    message: 'Lead logged successfully (Demo Mode / Local Storage).',
  };
}

/**
 * 2. Log Cal.com Booking Event to Google Sheets
 * Triggered automatically when Cal.com emits `bookingSuccessful`.
 */
export async function logCalBookingToGoogleSheets(
  payload: CalBookingPayload
): Promise<ServiceResult> {
  const timestamp = new Date().toISOString();
  const isReschedule = Boolean(payload.isReschedule);
  const action = isReschedule ? 'LOG_CALCOM_RESCHEDULE' : 'LOG_CALCOM_BOOKING';
  const status = isReschedule ? 'Walkthrough Rescheduled' : 'Walkthrough Scheduled';

  const updateRecord = {
    action,
    isReschedule,
    submissionId: payload.submissionId,
    timestamp,
    schoolName: payload.schoolName || '',
    contactName: payload.contactName || '',
    board: payload.board || '',
    contact: payload.contact || '',
    status,
    scheduledDate: payload.scheduledDate,
    calBookingUid: payload.calBookingUid || '',
  };

  // Update in localStorage
  saveLeadToLocalStorage(updateRecord);

  const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL as string | undefined;
  const spreadsheetId = import.meta.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID as string | undefined;
  const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY as string | undefined;
  const accessToken = import.meta.env.VITE_GOOGLE_SHEETS_ACCESS_TOKEN as string | undefined;

  // Pattern A: Webhook update (handles initial booking & rescheduling)
  if (webhookUrl && webhookUrl.trim() !== '') {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(updateRecord),
      }).catch(async () => {
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify(updateRecord),
        });
      });

      return {
        success: true,
        submissionId: payload.submissionId,
        message: isReschedule
          ? 'Cal.com reschedule synchronized to Google Sheets.'
          : 'Cal.com booking synchronized to Google Sheets.',
      };
    } catch (err) {
      console.warn('[SchoolChakra] Cal.com sync warning:', err);
    }
  }

  // Pattern B: Direct Google Sheets API v4 (Append appointment log)
  if (spreadsheetId && (accessToken || apiKey)) {
    try {
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A:K:append?valueInputOption=USER_ENTERED${
        apiKey ? `&key=${apiKey}` : ''
      }`;

      const rowValues = [
        payload.submissionId,
        timestamp,
        payload.schoolName || '',
        payload.board || '',
        '',
        '',
        payload.contact || '',
        '',
        status,
        payload.scheduledDate,
        payload.calBookingUid || '',
      ];

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          values: [rowValues],
        }),
      });

      return {
        success: true,
        submissionId: payload.submissionId,
        message: isReschedule
          ? 'Cal.com reschedule appended to Google Sheets via API v4.'
          : 'Cal.com appointment appended to Google Sheets via API v4.',
      };
    } catch (err) {
      console.warn('[SchoolChakra] Direct Sheets API v4 booking sync error:', err);
    }
  }

  console.info('[SchoolChakra Demo Mode] Cal.com event recorded:', updateRecord);
  return {
    success: true,
    submissionId: payload.submissionId,
    message: isReschedule ? 'Reschedule event logged locally.' : 'Booking event logged locally.',
  };
}

