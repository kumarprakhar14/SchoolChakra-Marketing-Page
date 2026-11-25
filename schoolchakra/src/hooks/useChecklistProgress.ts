import { useMemo } from 'react';
import { useUI } from '../contexts';

/**
 * Progress of the first-run onboarding checklist.
 */
export function useChecklistProgress() {
  const { checklistItems, toggleChecklist } = useUI();

  return useMemo(() => {
    const completed = checklistItems.filter((i) => i.done).length;
    const total = checklistItems.length;

    return {
      items: checklistItems,
      completed,
      total,
      percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
      isComplete: completed === total,
      toggle: toggleChecklist,
    };
  }, [checklistItems, toggleChecklist]);
}
