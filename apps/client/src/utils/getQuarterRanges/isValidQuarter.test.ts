import { isValidQuarter } from "./isValidQuarter";

describe("isValidQuarter", () => {
  it("returns true for valid quarter 0", () => {
    expect(isValidQuarter(0)).toBe(true);
  });

  it("returns true for valid quarter 1", () => {
    expect(isValidQuarter(1)).toBe(true);
  });

  it("returns true for valid quarter 2", () => {
    expect(isValidQuarter(2)).toBe(true);
  });

  it("returns true for valid quarter 3", () => {
    expect(isValidQuarter(3)).toBe(true);
  });

  it("returns false for quarter -1 (below range)", () => {
    expect(isValidQuarter(-1)).toBe(false);
  });

  it("returns false for quarter 4 (above range)", () => {
    expect(isValidQuarter(4)).toBe(false);
  });

  it("returns false for non-integer value (float)", () => {
    expect(isValidQuarter(1.5)).toBe(false);
  });

  it("returns false for NaN", () => {
    expect(isValidQuarter(NaN)).toBe(false);
  });

  it("returns false for Infinity", () => {
    expect(isValidQuarter(Infinity)).toBe(false);
  });

  it("returns false for non-number types (if forced)", () => {
    expect(isValidQuarter("2" as unknown as number)).toBe(false);
  });
});
