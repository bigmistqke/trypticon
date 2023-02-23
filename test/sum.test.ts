import { sum } from "../src/index";
describe("add", () => {
  it("should sum of [1, 2], 1 equals to [2, 3]", () => {
    const test = () => sum({ strict: false })([1, 2], 1);
    expect(test()).toEqual([2, 3]);
  });
  it("should sum of 2 and 3 equals to 5", () => {
    expect(sum(2, 3)).toEqual(5);
  });
  it("should sum of 2, 3, 4, 5, 6 equals to 21", () => {
    expect(sum(1, 2, 3, 4, 5, 6)).toEqual(21);
  });
  it("should sum of {value: 2} and {value: 3} equals to {value: 5}", () => {
    expect(sum({ value: 2 }, { value: 3 })).toEqual({ value: 5 });
  });
  it("should sum of [1, 2] and [3, 4] equals to [4, 6]", () => {
    expect(sum([1, 2], [3, 4])).toEqual([4, 6]);
  });
  it("should sum of { value: [1, 2] } and { value: [3, 4] } equals to { value: [4, 6] }", () => {
    expect(sum({ value: [1, 2] }, { value: [3, 4] })).toEqual({
      value: [4, 6],
    });
  });
  it("should sum of { value: [{value: 1}, 2] } and { value: [{value: 3}, 4] } equals to { value: [{value: 4}, 6] }", () => {
    expect(
      sum({ value: [{ value: 1 }, 2] }, { value: [{ value: 3 }, 4] })
    ).toEqual({ value: [{ value: 4 }, 6] });
  });
  it("should sum of [1, 2] type-error", () => {
    //@ts-expect-error [1, 2] is not a valid Option
    sum([1, 2]);
  });
  /*
  it("should sum of [1, 2], [3, 'a'] {strict: true} throw 'Value index 1 is not a number'", () => {
    const test = () => sum({ strict: true })([1, 2], [3, "a"]);
    expect(test).toThrow("Value index 1 is not a number");
  });
  it("should sum of [1, 2], [3, 'a'] {strict: false} should ignore 'invalid' values", () => {
    const test = () => sum({ strict: false })([1, 2], [3, "a"]);
    expect(test()).toEqual([4, 2]);
  });
  */
});
