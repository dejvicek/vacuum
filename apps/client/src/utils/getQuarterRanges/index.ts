import { getQuarterEnd } from './getQuarterEnd';
import { getQuarterStart } from './getQuarterStart';
import { isDateStringValid } from './isDateStringValid';

export type QuarterRange = {
  start: string;
  end: string;
  label: string;
};

export const getQuarterRanges = (from: string, to: string): QuarterRange[] => {
  if (!isDateStringValid(from) || !isDateStringValid(to)) return [];

  const fromDate = new Date(from);
  const today = new Date(to);

  const startYear = fromDate.getFullYear();
  const startQuarter = Math.floor(fromDate.getMonth() / 3);

  const endYear = today.getFullYear();
  const endQuarter = Math.floor(today.getMonth() / 3);

  const result: QuarterRange[] = [];

  for (let year = startYear; year <= endYear; year++) {
    const firstQ = year === startYear ? startQuarter : 0;
    const lastQ = year === endYear ? endQuarter : 3;

    for (let q = firstQ; q <= lastQ; q++) {
      result.push({
        start: getQuarterStart(year, q),
        end: getQuarterEnd(year, q),
        label: `${year} Q${q + 1}`,
      });
    }
  }

  return result;
};
