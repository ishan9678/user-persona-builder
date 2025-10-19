import { z } from 'zod';

// Product Profile Schema
export const ProductProfileSchema = z.object({
  name: z.string(),
  category: z.string(),
  keyFeatures: z.array(z.string()),
  valueProposition: z.string(),
  targetMarket: z.string(),
  brandPersonality: z.string(),
  visualIdentity: z.object({
    colorScheme: z.string(),
    typography: z.string(),
    designStyle: z.string(),
  }),
});

// Customer Profile Schema
export const CustomerProfileSchema = z.object({
  industrySegment: z.string(),
  companySize: z.string().optional(),
  keyNeeds: z.array(z.string()),
  painPoints: z.array(z.string()),
  decisionDrivers: z.array(z.string()),
  budgetRange: z.string().optional(),
});

// User Persona Schema
export const UserPersonaSchema = z.object({
  name: z.string(),
  ageRange: z.string(),
  demographic: z.string(),
  goalsMotivations: z.array(z.string()),
  painPoints: z.array(z.string()),
  behaviorsPreferences: z.array(z.string()),
  useCases: z.array(z.string()),
  visualPreferences: z.object({
    preferredColors: z.array(z.string()),
    designStyle: z.string(),
    layoutPreference: z.string(),
  }),
});

// Workflow State Schema
export const WorkflowStateSchema = z.object({
  scrapedContent: z.string(),
  productProfile: ProductProfileSchema.optional(),
  customerProfile: CustomerProfileSchema.optional(),
  personas: z.array(UserPersonaSchema).optional(),
  personaCount: z.number().default(3),
  error: z.string().optional(),
});

// Type exports
export type ProductProfile = z.infer<typeof ProductProfileSchema>;
export type CustomerProfile = z.infer<typeof CustomerProfileSchema>;
export type UserPersona = z.infer<typeof UserPersonaSchema>;
export type WorkflowState = z.infer<typeof WorkflowStateSchema>;
