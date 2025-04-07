import { InterestService } from "../src/services/interestService";

describe("InterestService", () => {
  let interestService: InterestService;

  beforeEach(() => {
    interestService = new InterestService();
  });

  test("should define a new interest rate", () => {
    interestService.defineInterestRule("20230601", "IR001", 5.0);

    const rate = interestService.getInterestRate("20230601");
    expect(rate).toBe(5.0);
  });

  test("should update existing interest rate for the same date", () => {
    interestService.defineInterestRule("20230601", "IR001", 5.0);
    interestService.defineInterestRule("20230601", "IR001", 6.0); // Update

    const rate = interestService.getInterestRate("20230601");
    expect(rate).toBe(6.0); // Should reflect updated rate
  });

  test("should return 0 if no interest rule defined for date", () => {
    const rate = interestService.getInterestRate("20230501");
    expect(rate).toBe(0); // No rule defined for this date
  });

  test("should return the latest interest rate for dates before the given date", () => {
    interestService.defineInterestRule("20230601", "IR001", 5.0);
    interestService.defineInterestRule("20230602", "IR002", 6.0);

    const rate = interestService.getInterestRate("20230601");
    expect(rate).toBe(5.0);
  });

  test("should list all defined interest rules", () => {
    interestService.defineInterestRule("20230601", "IR001", 5.0);
    interestService.defineInterestRule("20230602", "IR002", 6.0);

    const rules = interestService.listInterestRules();
    expect(rules.length).toBe(2);
    expect(rules[0].rate).toBe(5.0);
    expect(rules[1].rate).toBe(6.0);
  });
});
