"use server";

import {
  categoryControllerFindAll,
  courseControllerCreate,
  courseControllerFindAll,
  courseControllerFindOne,
  courseControllerUpdate,
  sectionControllerCreate,
  sectionControllerUpdate,
  sectionControllerRemove,
  lectureControllerCreate,
  lectureControllerUpdate,
  lectureControllerRemove,
  type UpdateCourseDto,
  type CreateSectionDto,
  type UpdateSectionDto,
  type CreateLectureDto,
  type UpdateLectureDto,
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

export async function findCourseById(options: {
  id: string;
  includeCategories?: boolean;
  includeSections?: boolean;
}) {
  const include = [];
  if (options.includeCategories) include.push("categories");
  if (options.includeSections) include.push("sections");

  const response = await courseControllerFindOne({
    path: { id: options.id },
    query: { include: include.join(",") },
  });
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

export async function createSection(options: {
  courseId: string;
  body: CreateSectionDto;
}) {
  const response = await sectionControllerCreate({
    path: { courseId: options.courseId },
    body: options.body,
  });
  return extractSerializableInfo(response);
}

export async function updateSection(options: {
  id: string;
  body: UpdateSectionDto;
}) {
  const response = await sectionControllerUpdate({
    path: { id: options.id },
    body: options.body,
  });
  return extractSerializableInfo(response);
}

export async function deleteSection(options: { id: string }) {
  const response = await sectionControllerRemove({
    path: { id: options.id },
  });
  return extractSerializableInfo(response);
}

export async function createLecture(options: {
  sectionId: string;
  body: CreateLectureDto;
}) {
  const response = await lectureControllerCreate({
    path: { sectionId: options.sectionId },
    body: options.body,
  });
  return extractSerializableInfo(response);
}

export async function updateLecture(options: {
  id: string;
  body: UpdateLectureDto;
}) {
  const response = await lectureControllerUpdate({
    path: { lectureId: options.id },
    body: options.body,
  });
  return extractSerializableInfo(response);
}

export async function deleteLecture(options: { id: string }) {
  const response = await lectureControllerRemove({
    path: { lectureId: options.id },
  });
  return extractSerializableInfo(response);
}
