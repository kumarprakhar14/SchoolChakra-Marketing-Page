import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { useRouter } from './router-context';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export function Link({ to, onClick, target, ...props }: LinkProps) {
  const { navigate } = useRouter();

  const isExternal =
    target === '_blank' ||
    to.startsWith('http://') ||
    to.startsWith('https://') ||
    to.startsWith('mailto:') ||
    to.startsWith('tel:');

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || isExternal) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    e.preventDefault();
    navigate(to);
  };

  return <a href={to} target={target} onClick={handleClick} {...props} />;
}
