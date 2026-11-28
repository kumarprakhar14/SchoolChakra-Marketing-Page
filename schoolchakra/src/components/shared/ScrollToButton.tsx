'use client';

import type { ComponentProps, ReactNode } from 'react';
import { Button } from '../ui';

interface ScrollToButtonProps
  extends Omit<ComponentProps<typeof Button>, 'onClick' | 'children'> {
  targetId: string;
  children: ReactNode;
}

export function ScrollToButton({
  targetId,
  children,
  ...props
}: ScrollToButtonProps) {
  const handleClick = () => {
    const el = document.getElementById(targetId);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Button type="button" onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}
