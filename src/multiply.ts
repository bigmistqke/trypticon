import operate, { Callback } from "./operate";
import { AcceptedTypes } from "./types";

const options = ["strict"] as const;

type Options = {
  [K in (typeof options)[number]]: boolean;
};

const defaultOptions: Options = {
  strict: true,
};

const validateOptions = (value: any) => {
  if (typeof value !== "object") return false;
  const validKeys = ["strict"];
  let key;
  for (key in value) {
    if (!validKeys.includes(key)) return false;
  }
  return value as Options;
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
  options: Options
): (a: T | number, b: T | number, ...values: (T | number)[]) => T;
function multiply<T extends AcceptedTypes>(
  a: T | number,
  b: T | number,
  ...values: (T | number)[]
): T;
function multiply<T extends AcceptedTypes>(
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

export default multiply;
