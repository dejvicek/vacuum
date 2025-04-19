import { getQuarterStart } from "./getQuarterStart";

describe("getQuarterStart", () => {
  it("returns correct start date for Q1", () => {
    expect(getQuarterStart(2023, 0)).toBe("2023-01-01");
  });

  it("returns correct start date for Q2", () => {
    expect(getQuarterStart(2023, 1)).toBe("2023-04-01");
  });

  it("returns correct start date for Q3", () => {
    expect(getQuarterStart(2023, 2)).toBe("2023-07-01");
  });

  it("returns correct start date for Q4", () => {
    expect(getQuarterStart(2023, 3)).toBe("2023-10-01");
  });

  it("returns correct date for different year", () => {
    expect(getQuarterStart(2020, 0)).toBe("2020-01-01");
  });

  it("throws an error for quarter > 4", () => {
    expect(() => getQuarterStart(2023, 5)).toThrow(
      "Invalid quarter: 5. Quarter must be between 0 and 3."
    );
  });

  it("throws an error for negative quarter", () => {
    expect(() => getQuarterStart(2023, -2)).toThrow(
      "Invalid quarter: -2. Quarter must be between 0 and 3."
    );
  });

  it("throws an error for non-integer quarter", () => {
    expect(() => getQuarterStart(2023, 2.5)).toThrow(
      "Invalid quarter: 2.5. Quarter must be between 0 and 3."
    );
  });
});
