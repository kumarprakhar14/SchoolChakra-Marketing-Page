import type { SchoolTenant } from '../types';

export const SCHOOL_TENANTS: SchoolTenant[] = [
  {
    id: 'dpa',
    name: 'Delhi Public Academy',
    board: 'CBSE • New Delhi',
    erpCode: 'SCH-DPA-01',
    defaultTheme: 'blue',
    stats: {
      Today: {
        students: '2,480',
        attendance: '96.4%',
        feeRate: '94.2%',
        collected: '₹42.8L',
        notices: '12',
        lowAttCount: 14,
      },
      'This Week': {
        students: '2,480',
        attendance: '95.1%',
        feeRate: '94.8%',
        collected: '₹44.1L',
        notices: '19',
        lowAttCount: 18,
      },
      'This Month': {
        students: '2,480',
        attendance: '94.7%',
        feeRate: '96.1%',
        collected: '₹1.84Cr',
        notices: '34',
        lowAttCount: 22,
      },
    },
  },
  {
    id: 'xaviers',
    name: "St. Xavier's High School",
    board: 'ICSE • Mumbai',
    erpCode: 'SCH-SXH-04',
    defaultTheme: 'crimson',
    stats: {
      Today: {
        students: '1,850',
        attendance: '97.8%',
        feeRate: '97.0%',
        collected: '₹31.5L',
        notices: '8',
        lowAttCount: 6,
      },
      'This Week': {
        students: '1,850',
        attendance: '96.9%',
        feeRate: '97.2%',
        collected: '₹33.0L',
        notices: '14',
        lowAttCount: 9,
      },
      'This Month': {
        students: '1,850',
        attendance: '96.2%',
        feeRate: '98.1%',
        collected: '₹1.42Cr',
        notices: '27',
        lowAttCount: 11,
      },
    },
  },
  {
    id: 'lotus',
    name: 'Lotus Valley International',
    board: 'IB & CBSE • Bengaluru',
    erpCode: 'SCH-LVI-09',
    defaultTheme: 'emerald',
    stats: {
      Today: {
        students: '3,120',
        attendance: '95.9%',
        feeRate: '92.6%',
        collected: '₹58.4L',
        notices: '16',
        lowAttCount: 19,
      },
      'This Week': {
        students: '3,120',
        attendance: '95.4%',
        feeRate: '93.5%',
        collected: '₹61.2L',
        notices: '24',
        lowAttCount: 21,
      },
      'This Month': {
        students: '3,120',
        attendance: '95.0%',
        feeRate: '95.4%',
        collected: '₹2.30Cr',
        notices: '41',
        lowAttCount: 25,
      },
    },
  },
];

export function getTenantById(id: string): SchoolTenant | undefined {
  return SCHOOL_TENANTS.find((t) => t.id === id);
}

export function getDefaultTenant(): SchoolTenant {
  return SCHOOL_TENANTS[0];
}