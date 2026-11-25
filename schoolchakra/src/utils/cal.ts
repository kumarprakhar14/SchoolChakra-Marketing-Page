/**
 * Cal.com Embed Integration & Controller for SchoolChakra
 * Provides modal initialization, dynamic theme branding, and booking / reschedule event listeners.
 */

export interface CalBookingDetails {
  date?: string;
  time?: string;
  bookingUid?: string;
  confirmedDateText?: string;
  isReschedule: boolean;
  eventType?: string;
  rawEvent?: any;
}

declare global {
  interface Window {
    Cal?: any;
  }
}

/**
 * Parses Cal.com event payloads across v1, v2, and postMessage variants.
 */
function parseCalEvent(event: any, explicitAction?: string): CalBookingDetails {
  const detail = event?.detail?.data || event?.detail || event?.data || {};
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
    rawEvent: detail,
  };
}

/**
 * Loads the Cal.com embed script and returns the Cal instance.
 * Queues commands so it is safe to call immediately before script finish.
 */
export async function getCalApi(): Promise<any> {
  if (typeof window === 'undefined') return null;

  if (window.Cal) {
    return window.Cal;
  }

  return new Promise((resolve) => {
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const s = d.createElement('script');
            s.src = A;
            s.async = true;
            s.onload = () => resolve(C.Cal);
            d.head.appendChild(s);
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ['initNamespace', namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    resolve(window.Cal);
  });
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

  const targetLink =
    calLink ||
    (import.meta.env.VITE_CALCOM_LINK as string) ||
    'schoolchakra/walkthrough';

  // 1. Initialize origin
  cal('init', { origin: 'https://app.cal.com' });

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

  // 3. Register booking and reschedule listeners
  if (onBookingOrReschedule) {
    const handleEvent = (event: any, explicitAction?: string) => {
      const parsed = parseCalEvent(event, explicitAction);
      if (parsed.date || parsed.bookingUid) {
        onBookingOrReschedule(parsed);
      }
    };

    // A. Cal.com Reschedule Actions (V2 & legacy)
    cal('on', {
      action: 'rescheduleBookingSuccessfulV2',
      callback: (event: any) => handleEvent(event, 'rescheduleBookingSuccessfulV2'),
    });

    cal('on', {
      action: 'rescheduleBookingSuccessful',
      callback: (event: any) => handleEvent(event, 'rescheduleBookingSuccessful'),
    });

    // B. Cal.com New Booking Actions (V2 & legacy)
    cal('on', {
      action: 'bookingSuccessfulV2',
      callback: (event: any) => handleEvent(event, 'bookingSuccessfulV2'),
    });

    cal('on', {
      action: 'bookingSuccessful',
      callback: (event: any) => handleEvent(event, 'bookingSuccessful'),
    });

    // C. Catch-all for any booking state transitions
    cal('on', {
      action: '*',
      callback: (event: any) => {
        const action = event?.detail?.type || event?.type || '';
        if (
          String(action).includes('bookingSuccessful') ||
          String(action).includes('rescheduleBooking') ||
          String(action).includes('bookingRescheduled')
        ) {
          handleEvent(event, action);
        }
      },
    });

    // D. Cross-origin window message listener for iframe postMessages
    const handleWindowMessage = (e: MessageEvent) => {
      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        const msgType = String(data?.type || data?.action || '');
        if (
          msgType.includes('bookingSuccessful') ||
          msgType.includes('rescheduleBooking') ||
          msgType.includes('bookingRescheduled') ||
          msgType.includes('CAL:bookingSuccessful') ||
          msgType.includes('CAL:rescheduleBookingSuccessful')
        ) {
          handleEvent(data, msgType);
        }
      } catch {
        // Ignore non-json or unrelated window messages
      }
    };

    window.addEventListener('message', handleWindowMessage);
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
      notes: `School: ${schoolName || ''} | Board: ${board || 'CBSE'}${studentStrength ? ` | Students: ${studentStrength}` : ''}`,
    },
  });
}
