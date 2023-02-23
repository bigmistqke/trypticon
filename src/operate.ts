/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AcceptedTypes, ObjectType, ArrayType } from "./types";

type Options = Record<string, unknown>;

function getValuesFromObjectAtKeyOrArrayAtIndex<T extends AcceptedTypes>(
  options: Options,
  index: string | number,
  ...values: (Record<string, T> | T[] | number)[]
): (T | number)[] {
  const result: (T | number)[] = [];
  for (const value of values) {
    if (typeof value === "number") {
      result.push(value);
      continue;
    }
    if (value.length < index) {
      if (options.strict) {
        throw {
          values,
          message: `could not find index ${index} in array`,
        };
      }
      continue;
    }
    // TODO:  array["0"] is valid js to get array.0
    //        should we typeguard here to satisfy ts?
    // @ts-ignore
    result.push(value[index]);
  }
  return result;
}

export type Callback = <T extends number | string>(
  accumulator: T,
  value: T,
  index: number | string,
  options: Record<string, unknown>
) => T;

const operateObjects = <T extends ObjectType>(
  options: Options,
  callback: Callback,
  ...values: (ObjectType | number)[]
): ObjectType => {
  const obj = values.find(value => typeof value === "object") as
    | (T | number)[]
    | undefined;
  if (!obj) throw { values, message: "could not find objay" };

  return Object.fromEntries(
    Object.keys(obj).map((key): [key: string, value: unknown] => [
      key,
      operate(
        options,
        callback,
        ...getValuesFromObjectAtKeyOrArrayAtIndex(options, key, ...values)
      ),
    ])
  );
};

const operateArrays = <T extends AcceptedTypes>(
  options: Options,
  callback: Callback,
  ...values: (T[] | number)[]
): (T | number)[] => {
  const arr = values.find(value => Array.isArray(value)) as
    | (T | number)[]
    | undefined;
  if (!arr) throw { values, message: "could not find array" };

  return arr.map((_, index) =>
    operate(
      options,
      callback,
      ...getValuesFromObjectAtKeyOrArrayAtIndex(options, index, ...values)
    )
  ) as (T | number)[];
};

const operatePrimitives = <T extends string | number>(
  options: Options,
  callback: Callback,
  ...values: T[]
): T => {
  let result = values.shift();
  if (!result) throw { values, message: "result[0] is undefined" };
  let index = 0;
  for (const value of values) {
    result = callback(result, value, index, options);
    index++;
  }
  return result;
};

const getType = (...values: unknown[]) => {
  const firstValidValue = values.find(v => typeof v !== undefined);
  return Array.isArray(firstValidValue) ? "array" : typeof firstValidValue;
};

const operate = <Value extends AcceptedTypes>(
  options: Options,
  callback: Callback,
  ...values: (Value | number)[]
) => {
  const type = getType(...values);

  switch (type) {
    case undefined:
      throw "Values are not valid";
    case "object":
      return operateObjects(
        options,
        callback,
        ...(values as (ObjectType | number)[])
      );
    case "array":
      return operateArrays(
        options,
        callback,
        ...(values as (ArrayType | number)[])
      );
    case "number":
      return operatePrimitives(options, callback, ...(values as any[]));
    case "string":
      return operatePrimitives(options, callback, ...(values as any[]));
    default:
      return values[0];
  }
};

export default operate;
