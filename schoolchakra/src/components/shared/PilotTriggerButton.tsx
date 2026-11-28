'use client';

import type { ComponentProps, ReactNode } from 'react';
import { useUI } from '../../contexts';
import { Button } from '../ui';

interface PilotTriggerButtonProps
  extends Omit<ComponentProps<typeof Button>, 'onClick' | 'children'> {
  children: ReactNode;
  useBrandBg?: boolean;
}

export function PilotTriggerButton({
  children,
  useBrandBg = false,
  style,
  ...props
}: PilotTriggerButtonProps) {
  const { openPilotModal } = useUI();

  return (
    <Button
      type="button"
      onClick={openPilotModal}
      style={
        useBrandBg
          ? { backgroundColor: 'var(--brand-hex, #2563EB)', ...style }
          : style
      }
      {...props}
    >
      {children}
    </Button>
  );
}

export function PilotFooterTrigger() {
  const { openPilotModal } = useUI();

  return (
    <button
      type="button"
      onClick={openPilotModal}
      className="text-xs font-semibold hover:underline cursor-pointer"
      style={{ color: 'var(--brand-hex, #2563EB)' }}
    >
      Apply for the Founding Pilot →
    </button>
  );
}
