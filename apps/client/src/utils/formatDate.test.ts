import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formats a standard date correctly', () => {
    const date = new Date(2023, 4, 9);
    expect(formatDate(date)).toBe('2023-05-09');
  });

  it('formats date with double-digit month and day correctly', () => {
    const date = new Date(2023, 10, 25);
    expect(formatDate(date)).toBe('2023-11-25');
  });

  it('adds leading zeros for single-digit months and days', () => {
    const date = new Date(2023, 0, 5);
    expect(formatDate(date)).toBe('2023-01-05');
  });

  it('returns correct format for end of year', () => {
    const date = new Date(2023, 11, 31);
    expect(formatDate(date)).toBe('2023-12-31');
  });

  it('returns correct format for leap day', () => {
    const date = new Date(2020, 1, 29);
    expect(formatDate(date)).toBe('2020-02-29');
  });
});
