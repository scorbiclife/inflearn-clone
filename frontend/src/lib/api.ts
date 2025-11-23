"use server";

import {
  appControllerTestUser,
  courseControllerFindAll,
} from "@/generated/openapi-ts";
import type { Course } from "@/generated/openapi-ts";

export async function getUserTest() {
  const response = await appControllerTestUser();
  const { data, error } = response;
  return { data, error };
}

export async function getCourses(options?: {
  title?: string;
  level?: string;
  categoryId?: string;
  take?: number;
  skip?: number;
}) {
  const response = await courseControllerFindAll({
    query: options,
  });
  const { data, error } = response;
  return { data, error };
}
