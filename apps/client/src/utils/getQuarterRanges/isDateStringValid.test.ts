import { isDateStringValid } from './isDateStringValid';

describe('isDateStringValid', () => {
  const originalConsoleError = console.error;

  beforeEach(() => {
    console.error = jest.fn(); // Mock console.error
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.error = originalConsoleError; // Restore original
  });
  it('returns success and valid Date for correct input', () => {
    expect(isDateStringValid('2024-01-15')).toBe(true);
  });

  it('returns failure for malformed date string', () => {
    expect(isDateStringValid('invalid-date')).toBe(false);
    expect(console.error).toHaveBeenCalledWith(`Invalid date string: "invalid-date". Expected format: YYYY-MM-DD`);
  });

  it('returns failure for empty string', () => {
    expect(isDateStringValid('')).toBe(false);
  });

  it('returns failure for invalid calendar date', () => {
    expect(isDateStringValid('2023-02-31')).toBe(false);
    expect(console.error).toHaveBeenCalledWith(`Invalid date string: "2023-02-31". Expected format: YYYY-MM-DD`);
  });
});
