import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { z } from "zod";

/**
 * Returns a Gemini model instance.
 * - Normal mode: for free-form text output.
 * - JSON mode: for structured output using Zod schema validation.
 */
export function getGeminiModel<T extends z.ZodTypeAny>(
  options?: { schema?: T; jsonMode?: boolean }
) {
  const baseModel = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-2.5-flash",
    temperature: 0.7,
    maxOutputTokens: 8192,
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
