import operate, { Callback } from "./operate";
import { AcceptedTypes } from "./types";

const multiplyOptions = ["strict"] as const;

type MultiplyOptions = {
  [K in (typeof multiplyOptions)[number]]: boolean;
};

const defaultOptions: MultiplyOptions = {
  strict: true,
};

const validateOptions = (value: any) => {
  if (typeof value !== "object") return false;
  const validKeys = ["strict"];
  let key;
  for (key in value) {
    if (!validKeys.includes(key)) return false;
  }
  return value as MultiplyOptions;
};

const callback: Callback = (accumulator, value, index, options) => {
  index;
  options;
  if (typeof accumulator === "number" && typeof value === "number") {
    // TODO:  remove cast to any
    return (accumulator * value) as any;
  }
  return accumulator;
};

function multiply<T extends AcceptedTypes>(
  options: MultiplyOptions
): (a: T | number, b: T | number, ...values: (T | number)[]) => T;
function multiply<T extends AcceptedTypes>(
  a: T | number,
  b: T | number,
  ...values: (T | number)[]
): T;
function multiply<T extends AcceptedTypes>(
  first: MultiplyOptions | (T | number),
  ...values: (T | number)[]
) {
  try {
    if (values.length === 0) {
      // options
      const validOptions = validateOptions(first);
      if (validOptions) {
        return (a: T | number, b: T | number, ...values: (T | number)[]) => {
          return operate(validOptions, callback, a, b, ...values);
        };
      }
      return undefined;
    } else {
      // ...values
      return operate(defaultOptions, callback, first, ...values);
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

export default multiply;
