import operate, { Callback } from "./operate";
import { AcceptedTypes } from "./types";

const options = ["strict", "string"] as const;

type Options = {
  [K in (typeof options)[number]]?: boolean;
};

const validateOptions = (value: unknown) => {
  if (typeof value !== "object") return false;
  for (const key in value) {
    if (!options.includes(key as any)) return false;
  }
  return value as Options;
};

const defaultOptions: Options = {
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
  options: Options
): (a: T | number, b: T | number, ...values: (T | number)[]) => void;
function sum<T extends AcceptedTypes>(
  a: T | number,
  b: T | number,
  ...values: (T | number)[]
): T;
function sum<T extends AcceptedTypes>(
  first: Options | (T | number),
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
