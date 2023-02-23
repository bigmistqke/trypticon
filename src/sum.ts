import operate, { Callback } from "./operate";
import { AcceptedTypes } from "./types";

const sumOptions = ["strict", "string"] as const;

type SumOptions = {
  [K in (typeof sumOptions)[number]]?: boolean;
};

const validateOptions = (value: unknown) => {
  if (typeof value !== "object") return false;
  for (const key in value) {
    if (!sumOptions.includes(key as any)) return false;
  }
  return value as SumOptions;
};

const defaultOptions: SumOptions = {
  strict: true,
  string: false,
};

const callback: Callback = (accumulator, value, index, options) => {
  index;
  options;
  if (typeof accumulator === "string" /*  && typeof value === "string" */) {
    value;
    // TODO:  any cast
    return (accumulator + value) as any;
  }
  if (typeof accumulator === "number" && typeof value === "number") {
    return accumulator + value;
  }
  return accumulator;
};

function sum<T extends AcceptedTypes>(
  options: SumOptions
): (a: T | number, b: T | number, ...values: (T | number)[]) => void;
function sum<T extends AcceptedTypes>(
  a: T | number,
  b: T | number,
  ...values: (T | number)[]
): T;
function sum<T extends AcceptedTypes>(
  first: SumOptions | (T | number),
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

export default sum;
