"use client";

import * as api from "@/lib/api";

export function useApi() {
  return {
    getUserTest: () => api.getUserTest(),
  };
}
