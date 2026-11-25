import { useMemo } from 'react';
import { useUI } from '../contexts';

export const NOTICE_AUDIENCE_OPTIONS = ['Students', 'Teachers', 'Accounts', 'Everyone'] as const;

/**
 * Notice audience selection state, including the "Everyone" normalization rule.
 */
export function useNoticeAudience() {
  const { noticeAudiences, toggleAudience, noticeEdited } = useUI();

  return useMemo(() => {
    const isEveryoneSelected =
      noticeAudiences.includes('Students') &&
      noticeAudiences.includes('Teachers') &&
      noticeAudiences.includes('Accounts');

    return {
      audiences: noticeAudiences,
      isEveryoneSelected,
      isEdited: noticeEdited,
      targetLabel: isEveryoneSelected ? 'EVERYONE (Normalized)' : noticeAudiences.join(' + '),
      toggle: toggleAudience,
    };
  }, [noticeAudiences, noticeEdited, toggleAudience]);
}
