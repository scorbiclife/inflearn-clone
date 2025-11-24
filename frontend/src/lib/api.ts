"use server";

import {
  courseControllerCreate,
  courseControllerFindAll,
} from "@/generated/openapi-ts";

type ApiFunction<Params extends any[], Data, Error> = (
  ...params: Params
) => Promise<
  { data: Data; error?: undefined } | { data?: undefined; error: Error | undefined }
>;

function wrap<P extends any[], D, E>(
  apiFunction: ApiFunction<P, D, E>
): ApiFunction<P, D, E> {
  return async function wrappedFunction(...params: P) {
    const result = await apiFunction(...params);
    if (result.data) {
      return { data: result.data };
    } else {
      return { error: result.error };
    }
  };
}

export const createCourse = wrap(courseControllerCreate);
export const findAllCourses = wrap(courseControllerFindAll);
