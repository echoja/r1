import { Handler } from "express";
import { Asyncify } from "type-fest";

export function contains<T extends string>(
  list: ReadonlyArray<T>,
  value: string
): value is T {
  return list.some((item) => item === value);
}

/**
 * async 함수도 express middleware 에 사용할
 * 수 있도록 try-catch 문을 씌운 async 래퍼 함수
 */
 export const aw = (asyncFunc: Asyncify<Handler>): Asyncify<Handler> => async (
  req,
  res,
  next,
): Promise<void> => {
  try {
    await asyncFunc(req, res, next);
  } catch (error) {
    next(error);
  }
};
