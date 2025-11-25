"use server";

import {
  categoryControllerFindAll,
  courseControllerCreate,
  courseControllerFindAll,
  courseControllerFindOne,
  courseControllerUpdate,
  type UpdateCourseDto,
} from "@/generated/openapi-ts";

type ResponseDataAndError<Data, Error> =
  | { data: Data; error?: undefined }
  | { data?: undefined; error: Error | undefined };

function extractSerializableInfo<Data, Error>(
  response: ResponseDataAndError<Data, Error>
): ResponseDataAndError<Data, Error> {
  if (response.data) {
    return { data: response.data };
  } else {
    return { error: response.error };
  }
}

export async function createCourse(options: { title: string }) {
  const response = await courseControllerCreate({
    body: { title: options.title, categoryIds: [] },
  });
  return extractSerializableInfo(response);
}

export async function findAllCourses() {
  return extractSerializableInfo(await courseControllerFindAll());
}

export async function findCourseById(options: { id: string }) {
  const response = await courseControllerFindOne({ path: { id: options.id } });
  return extractSerializableInfo(response);
}

export async function updateCourse(options: {
  id: string;
  body: UpdateCourseDto;
}) {
  const response = await courseControllerUpdate({
    path: { id: options.id },
    body: options.body,
  });
  return extractSerializableInfo(response);
}

export async function findAllCategories() {
  return extractSerializableInfo(await categoryControllerFindAll());
}
