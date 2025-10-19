import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { getEnv } from "@/lib/env";
import { z } from "zod";

/**
 * Returns a Gemini model instance.
 * - Normal mode: for free-form text output.
 * - JSON mode: for structured output using Zod schema validation.
 */
export function getGeminiModel<T extends z.ZodTypeAny>(
  options?: { schema?: T; jsonMode?: boolean }
) {
  const env = getEnv();

  const baseModel = new ChatGoogleGenerativeAI({
    apiKey: env.GEMINI_API_KEY,
    model: "gemini-2.5-flash",
    temperature: 0.7,
    maxOutputTokens: 2048,
  });

  // If a schema is provided → return a structured-output model
  if (options?.schema) {
    return baseModel.withStructuredOutput(options.schema, {
      method: options.jsonMode ? "json_mode" : "default",
    });
  }

  // Otherwise → return normal chat model
  return baseModel;
}
