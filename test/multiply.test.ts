import { multiply } from "../src/index";

describe("multiply", () => {
  it("should multiply of 2 and 3 equals to 6", () => {
    expect(multiply(2, 3)).toEqual(6);
  });
  it("should multiply of 1, 2, 3, 4, 5, 6 equals to 720", () => {
    expect(multiply(1, 2, 3, 4, 5, 6)).toEqual(720);
  });
  it("should multiply of {value: 2} and {value: 3} equals to {value: 6}", () => {
    expect(multiply({ value: 2 }, { value: 3 })).toEqual({ value: 6 });
  });
  it("should multiply of [1, 2] and [3, 4] equals to [3, 8]", () => {
    expect(multiply([1, 2], [3, 4])).toEqual([3, 8]);
  });
  it("should multiply of { value: [1, 2] } and { value: [3, 4] } equals to { value: [4, 6] }", () => {
    expect(multiply({ value: [1, 2] }, { value: [3, 4] })).toEqual({
      value: [3, 8],
    });
  });
  it("should multiply of { value: [{value: 1}, 2] } and { value: [{value: 3}, 4] } equals to { value: [{value: 4}, 6] }", () => {
    expect(
      multiply({ value: [{ value: 1 }, 2] }, { value: [{ value: 3 }, 4] })
    ).toEqual({ value: [{ value: 3 }, 8] });
  });
  it("should multiply of [1, 2], 1 equals to [2, 3]", () => {
    const test = () => multiply({ strict: false })([1, 2], 3);
    expect(test()).toEqual([3, 6]);
  });
  it("should multiply of [1, 2] type-error", () => {
    //@ts-expect-error [1, 2] is not a valid Option
    multiply([1, 2]);
  });
  /*
  it("should multiply of [1, 2], [3, 'a'] {strict: true} throw 'Value index 1 is not a number'", () => {
    const test = () => multiply({ strict: true })([1, 2], [3, "a"]);
    expect(test).toThrow("Value index 1 is not a number");
  });
  it("should multiply of [1, 2], [3, 'a'] {strict: false} should ignore 'invalid' values", () => {
    const test = () => multiply({ strict: false })([1, 2], [3, "a"]);
    expect(test()).toEqual([4, 2]);
  });
  */
});
