import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
  input: "http://localhost:8000/docs-json",
  output: "./src/generated/openapi-ts/",
  httpClientType: "fetch",
  useOptions: true,
  plugins: [
    {
      name: "@hey-api/client-next",
      runtimeConfigPath: "@/config/openapi-ts.runtime.config",
    },
  ],
});
