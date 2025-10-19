import { z } from 'zod';

const envSchema = z.object({
  GEMINI_API_KEY: z.string().min(1, 'Gemini API key is required'),
});

export function getEnv() {
  const parsed = envSchema.safeParse({
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  });

  if (!parsed.success) {
    throw new Error(
      `Environment validation failed: ${parsed.error.message}`
    );
  }

  return parsed.data;
}

export type Env = z.infer<typeof envSchema>;
