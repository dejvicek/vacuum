import { formatDate } from "../formatDate";
import { isValidQuarter } from "./isValidQuarter";

export const getQuarterEnd = (year: number, quarter: number): string => {
  if (!isValidQuarter(quarter))
    throw new Error(
      `Invalid quarter: ${quarter}. Quarter must be between 0 and 3.`
    );

  return formatDate(new Date(year, (quarter + 1) * 3, 0));
};
