/**
 * Cal.com Embed Integration & Controller for SchoolChakra
 * Provides modal initialization, dynamic theme branding, and booking / reschedule event listeners.
 */
import { ENV } from '../config/env';

export interface CalBookingDetails {
  date?: string;
  time?: string;
  bookingUid?: string;
  confirmedDateText?: string;
  isReschedule: boolean;
  eventType?: string;
  rawEvent?: Record<string, unknown>;
}

interface CalEventDetail {
  type?: string;
  startTime?: string;
  date?: string;
  uid?: string;
  bookingId?: string;
  rescheduleUid?: string;
  isReschedule?: boolean;
  booking?: {
    startTime?: string;
    date?: string;
    uid?: string;
    rescheduledFromUid?: string;
  };
  data?: CalEventDetail;
}

interface CalEventPayload {
  type?: string;
  action?: string;
  detail?: CalEventDetail;
  data?: CalEventDetail;
}

interface CalCallable {
  (...args: unknown[]): void;
  loaded?: boolean;
  ns?: Record<string, CalQueueFn>;
  q?: unknown[];
}

interface CalQueueFn {
  (...args: unknown[]): void;
  q?: unknown[];
}

declare global {
  interface Window {
    Cal?: CalCallable;
  }
}

const CAL_ORIGIN = 'https://app.cal.com';

let activeBookingCallback: ((details: CalBookingDetails) => void) | undefined;
let calListenersRegistered = false;
let activeWindowMessageListener: ((e: MessageEvent) => void) | null = null;

/**
 * Parses Cal.com event payloads across v1, v2, and postMessage variants.
 */
function parseCalEvent(event: CalEventPayload | null | undefined, explicitAction?: string): CalBookingDetails {
  const detail: CalEventDetail =
    event?.detail?.data || event?.detail || event?.data || {};
  const actionType =
    explicitAction ||
    event?.detail?.type ||
    event?.type ||
    detail?.type ||
    'bookingSuccessful';

  const isReschedule =
    String(actionType).toLowerCase().includes('reschedule') ||
    Boolean(detail?.rescheduleUid) ||
    Boolean(detail?.booking?.rescheduledFromUid) ||
    Boolean(detail?.isReschedule);

  const startTime =
    detail.startTime ||
    detail.date ||
    detail.booking?.startTime ||
    detail.booking?.date;

  const uid =
    detail.uid ||
    detail.booking?.uid ||
    detail.bookingId ||
    `CAL-${Date.now()}`;

  let confirmedText = isReschedule ? 'Rescheduled' : 'Scheduled';
  if (startTime) {
    try {
      const d = new Date(startTime);
      confirmedText = d.toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    } catch {
      confirmedText = String(startTime);
    }
  }

  return {
    date: startTime,
    bookingUid: uid,
    confirmedDateText: confirmedText,
    isReschedule,
    eventType: actionType,
    rawEvent: detail as unknown as Record<string, unknown>,
  };
}

/**
 * Loads the Cal.com embed script and returns the Cal instance.
 * Queues commands so it is safe to call immediately before script finish.
 */
export async function getCalApi(): Promise<CalCallable | null> {
  if (typeof window === 'undefined') return null;

  if (window.Cal) {
    return window.Cal;
  }

  return new Promise((resolve) => {
    (function (C: Window, A: string, L: string) {
      const p = function (a: { q?: unknown[] }, ar: IArguments | unknown[]) {
        a.q = a.q || [];
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function (...args: unknown[]) {
          const cal = C.Cal!;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const s = d.createElement('script');
            s.src = A;
            s.async = true;
            s.onload = () => resolve(C.Cal ?? null);
            d.head.appendChild(s);
            cal.loaded = true;
          }
          if (args[0] === L) {
            const api: CalQueueFn = function (...nsArgs: unknown[]) {
              p(api, nsArgs);
            };
            const namespace = args[1];
            api.q = api.q || [];
            if (typeof namespace === 'string' && cal.ns) {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], args);
              p(cal, ['initNamespace', namespace]);
            } else {
              p(cal, args);
            }
            return;
          }
          p(cal, args);
        };
    })(window, `${CAL_ORIGIN}/embed/embed.js`, 'init');

    resolve(window.Cal ?? null);
  });
}

function registerCalListeners(cal: CalCallable) {
  const dispatchEvent = (event: CalEventPayload, explicitAction?: string) => {
    if (!activeBookingCallback) return;
    const parsed = parseCalEvent(event, explicitAction);
    if (parsed.date || parsed.bookingUid) {
      activeBookingCallback(parsed);
    }
  };

  if (!calListenersRegistered) {
    calListenersRegistered = true;

    const actions = [
      'rescheduleBookingSuccessfulV2',
      'rescheduleBookingSuccessful',
      'bookingSuccessfulV2',
      'bookingSuccessful',
    ] as const;

    for (const action of actions) {
      cal('on', {
        action,
        callback: (event: CalEventPayload) => dispatchEvent(event, action),
      });
    }

    cal('on', {
      action: '*',
      callback: (event: CalEventPayload) => {
        const action = String(event?.detail?.type || event?.type || '');
        if (
          action.includes('bookingSuccessful') ||
          action.includes('rescheduleBooking') ||
          action.includes('bookingRescheduled')
        ) {
          dispatchEvent(event, action);
        }
      },
    });
  }

  if (activeWindowMessageListener) {
    window.removeEventListener('message', activeWindowMessageListener);
  }

  activeWindowMessageListener = (e: MessageEvent) => {
    if (e.origin !== CAL_ORIGIN) return;
    try {
      const data: CalEventPayload =
        typeof e.data === 'string' ? (JSON.parse(e.data) as CalEventPayload) : (e.data as CalEventPayload);
      const msgType = String(data?.type || data?.action || '');
      if (
        msgType.includes('bookingSuccessful') ||
        msgType.includes('rescheduleBooking') ||
        msgType.includes('bookingRescheduled') ||
        msgType.includes('CAL:bookingSuccessful') ||
        msgType.includes('CAL:rescheduleBookingSuccessful')
      ) {
        dispatchEvent(data, msgType);
      }
    } catch {
      // Ignore non-JSON or unrelated window messages
    }
  };

  window.addEventListener('message', activeWindowMessageListener);
}

/**
 * Launches the Cal.com popup modal with prefilled data and custom brand colors.
 * Subscribes to initial booking AND reschedule events so date changes update the sheet.
 */
export async function openCalModal({
  calLink,
  schoolName,
  contactName,
  contact,
  board,
  studentStrength,
  brandColor,
  onBookingOrReschedule,
}: {
  calLink?: string;
  schoolName?: string;
  contactName?: string;
  contact?: string;
  board?: string;
  studentStrength?: string;
  brandColor?: string;
  onBookingOrReschedule?: (details: CalBookingDetails) => void;
}) {
  const cal = await getCalApi();
  if (!cal) return;

  const targetLink = calLink || ENV.calcomLink || 'schoolchakra/walkthrough';

  // 1. Initialize origin
  cal('init', { origin: CAL_ORIGIN });

  // 2. Set theme and brand styling to match active school theme
  cal('ui', {
    theme: 'light',
    styles: {
      branding: {
        brandColor: brandColor || '#2563EB',
      },
    },
    hideEventTypeDetails: false,
    layout: 'month_view',
  });

  // 3. Register / update booking and reschedule listeners without leaking
  activeBookingCallback = onBookingOrReschedule;
  if (onBookingOrReschedule) {
    registerCalListeners(cal);
  }

  // 4. Open modal with pre-filled school parameters
  const isEmail = contact?.includes('@');
  const isPhone = contact && !isEmail;

  cal('modal', {
    calLink: targetLink,
    config: {
      name: contactName || schoolName || 'School Administrator',
      email: isEmail ? contact : undefined,
      phone: isPhone ? contact : undefined,
      notes: `School: ${schoolName || ''} | Board: ${board || 'CBSE'}${
        studentStrength ? ` | Students: ${studentStrength}` : ''
      }`,
    },
  });
}
