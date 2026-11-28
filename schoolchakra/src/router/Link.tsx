import NextLink from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export function Link({ to, target, ...props }: LinkProps) {
  const isExternal =
    target === '_blank' ||
    to.startsWith('http://') ||
    to.startsWith('https://') ||
    to.startsWith('mailto:') ||
    to.startsWith('tel:');

  if (isExternal) {
    return <a href={to} target={target} {...props} />;
  }

  return <NextLink href={to} target={target} {...props} />;
}
