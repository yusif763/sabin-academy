/**
 * Xidmət kataloqunun sayt nüsxəsi.
 *
 * MƏNBƏ: sabina-academy-dashboard/apps/api/src/common/catalog.ts
 * Dəyişiklik orada edilir, sonra bura kopyalanır.
 */
export interface ProgramItem {
  code: string;
  label: string;
}

export interface ProgramGroup {
  key: string;
  label: string;
  items: ProgramItem[];
}

export const PROGRAM_GROUPS: ProgramGroup[] = [
  {
    key: 'YOUNG_LEARNERS',
    label: 'Young Learners',
    items: [
      { code: 'YL_STARTER', label: 'Starter' },
      { code: 'YL_MOVER', label: 'Mover' },
      { code: 'YL_FLYER', label: 'Flyer' },
      { code: 'YL_KET', label: 'KET' },
      { code: 'YL_PET', label: 'PET' },
    ],
  },
  {
    key: 'GENERAL_ENGLISH',
    label: 'General English',
    items: [
      { code: 'GE_A1', label: 'General English A1' },
      { code: 'GE_A2', label: 'General English A2' },
      { code: 'GE_B1', label: 'General English B1' },
      { code: 'GE_B2', label: 'General English B2' },
    ],
  },
  {
    key: 'PREP',
    label: 'Hazırlıq',
    items: [
      { code: 'PREP_PRE_IELTS', label: 'Pre-IELTS' },
      { code: 'PREP_IELTS', label: 'IELTS' },
    ],
  },
  {
    key: 'SCHOOL',
    label: 'Məktəb proqramı',
    items: [
      { code: 'SCH_GRADE8_PREP', label: '8-ci sinif hazırlıq' },
      { code: 'SCH_DIM_EN_9', label: '9-cu sinif buraxılış — DİM İngilis dili' },
      { code: 'SCH_DIM_EN_10', label: '10-cu sinif buraxılış — DİM İngilis dili' },
      { code: 'SCH_DIM_EN_11', label: '11-ci sinif buraxılış — DİM İngilis dili' },
      { code: 'SCH_IB_MATH_7_8', label: '7-8 IB Math' },
      { code: 'SCH_DIM_MATH_9_10', label: '9-10 DİM Riyaziyyat buraxılış' },
    ],
  },
];

export const PROGRAM_CODES: string[] = PROGRAM_GROUPS.flatMap((g) =>
  g.items.map((i) => i.code),
);

const LABEL_BY_CODE: Record<string, string> = Object.fromEntries(
  PROGRAM_GROUPS.flatMap((g) => g.items.map((i) => [i.code, i.label])),
);

export const isProgramCode = (code: unknown): boolean =>
  typeof code === 'string' && Object.prototype.hasOwnProperty.call(LABEL_BY_CODE, code);

export const programLabel = (code: string | null | undefined): string =>
  (code && LABEL_BY_CODE[code]) || '—';
