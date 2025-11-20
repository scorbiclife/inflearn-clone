"use server";

import { appControllerTestUser } from "@/generated/openapi-ts";

export async function getUserTest() {
  const response = await appControllerTestUser();
  const { data, error } = response;
  return { data, error };
}
