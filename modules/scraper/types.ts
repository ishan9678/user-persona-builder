import { z } from 'zod';

// Schema for CSS information
export const CSSInfoSchema = z.object({
  colors: z.array(z.string()),
  fonts: z.array(z.string()),
  spacing: z.array(z.string()),
  borderStyles: z.array(z.string()),
});

// Schema for semantic element
export const SemanticElementSchema = z.object({
  type: z.enum(['heading', 'paragraph', 'list', 'link', 'button', 'image']),
  content: z.string(),
  level: z.number().optional(), // for headings (h1-h6)
  classes: z.array(z.string()),
  styles: z.record(z.string()).optional(),
});

// Schema for scraped content
export const ScrapedContentSchema = z.object({
  url: z.string().url(),
  title: z.string(),
  textContent: z.string(),
  semanticElements: z.array(SemanticElementSchema),
  visualInfo: CSSInfoSchema,
  metadata: z.object({
    scrapedAt: z.string(),
    elementCount: z.number(),
  }),
});

// Type exports
export type CSSInfo = z.infer<typeof CSSInfoSchema>;
export type SemanticElement = z.infer<typeof SemanticElementSchema>;
export type ScrapedContent = z.infer<typeof ScrapedContentSchema>;
