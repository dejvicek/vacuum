import { getQuarterRanges } from ".";

describe("getQuarterRanges", () => {
  it("returns correct quarters between two valid dates", () => {
    expect(getQuarterRanges("2023-01-01", "2024-12-31")).toStrictEqual([
      {
        start: "2023-01-01",
        end: "2023-03-31",
        label: "2023 Q1",
      },
      {
        start: "2023-04-01",
        end: "2023-06-30",
        label: "2023 Q2",
      },
      {
        start: "2023-07-01",
        end: "2023-09-30",
        label: "2023 Q3",
      },
      {
        start: "2023-10-01",
        end: "2023-12-31",
        label: "2023 Q4",
      },
      {
        start: "2024-01-01",
        end: "2024-03-31",
        label: "2024 Q1",
      },
      {
        start: "2024-04-01",
        end: "2024-06-30",
        label: "2024 Q2",
      },
      {
        start: "2024-07-01",
        end: "2024-09-30",
        label: "2024 Q3",
      },
      {
        start: "2024-10-01",
        end: "2024-12-31",
        label: "2024 Q4",
      },
    ]);
  });

  it("returns empty array when from date is invalid", () => {
    expect(getQuarterRanges("invalid-date", "2023-12-31")).toStrictEqual([]);
  });

  it("returns empty array when to date is invalid", () => {
    expect(getQuarterRanges("2023-01-01", "not-a-date")).toStrictEqual([]);
  });

  it("returns a single quarter when from and to are in the same quarter", () => {
    expect(getQuarterRanges("2023-04-01", "2023-06-30")).toStrictEqual([
      {
        start: "2023-04-01",
        end: "2023-06-30",
        label: "2023 Q2",
      },
    ]);
  });

  it("returns empty array if both dates are invalid", () => {
    expect(getQuarterRanges("invalid", "invalid")).toStrictEqual([]);
  });
});
