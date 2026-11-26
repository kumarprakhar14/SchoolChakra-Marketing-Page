export type ChangeType = 'New' | 'Improved' | 'Fixed';

export interface ChangelogChange {
  type: ChangeType;
  text: string;
}

export interface ChangelogEntry {
  id: string;
  version?: string;
  date: string;
  title: string;
  summary?: string;
  changes: ChangelogChange[];
}

/**
 * Maintainable changelog data source.
 * Add verified public releases here as they are announced.
 */
export const CHANGELOG_ENTRIES: ChangelogEntry[] = [];
