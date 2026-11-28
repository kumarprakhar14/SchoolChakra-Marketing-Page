'use client';

import { useTheme } from '../../contexts';
import { openCalModal } from '../../utils/cal';
import { Button } from '../ui';

export function WalkthroughSchedulerButton() {
  const { theme } = useTheme();

  const handleOpenScheduler = async () => {
    await openCalModal({
      brandColor: theme.hex,
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleOpenScheduler}
    >
      Open walkthrough scheduler
    </Button>
  );
}
