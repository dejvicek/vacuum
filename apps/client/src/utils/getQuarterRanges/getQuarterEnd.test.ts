import { getQuarterEnd } from "./getQuarterEnd";

describe("getQuarterEnd", () => {
  it("returns correct end date for Q1", () => {
    expect(getQuarterEnd(2023, 0)).toBe("2023-03-31");
  });

  it("returns correct end date for Q2", () => {
    expect(getQuarterEnd(2023, 1)).toBe("2023-06-30");
  });

  it("returns correct end date for Q3", () => {
    expect(getQuarterEnd(2023, 2)).toBe("2023-09-30");
  });

  it("returns correct end date for Q4", () => {
    expect(getQuarterEnd(2023, 3)).toBe("2023-12-31");
  });
  it("throws an error for quarter > 4", () => {
    expect(() => getQuarterEnd(2023, 5)).toThrow(
      "Invalid quarter: 5. Quarter must be between 0 and 3."
    );
  });

  it("throws an error for negative quarter", () => {
    expect(() => getQuarterEnd(2023, -2)).toThrow(
      "Invalid quarter: -2. Quarter must be between 0 and 3."
    );
  });

  it("throws an error for non-integer quarter", () => {
    expect(() => getQuarterEnd(2023, 2.5)).toThrow(
      "Invalid quarter: 2.5. Quarter must be between 0 and 3."
    );
  });
});
