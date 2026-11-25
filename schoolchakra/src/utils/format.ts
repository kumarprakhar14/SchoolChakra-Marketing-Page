/**
 * Returns up to `count` uppercase initials from a name.
 *
 * @example getInitials('Delhi Public Academy') // 'DP'
 */
export function getInitials(name: string, count = 2): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, count)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();
}

/**
 * Returns the first `count` characters of a string, uppercased.
 */
export function abbreviate(value: string, count = 2): string {
  return value.trim().slice(0, count).toUpperCase();
}
