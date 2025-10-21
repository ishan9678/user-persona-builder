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

// Customer Profile Schema - Supports both B2B and B2C
export const CustomerProfileSchema = z.object({
  type: z.enum(['B2B', 'B2C']).describe('Whether targeting businesses or consumers'),
  
  // B2B specific fields
  industrySegment: z.string().optional().describe('Target industry for B2B'),
  companySize: z.string().optional().describe('Company size range for B2B'),
  decisionMakers: z.array(z.string()).optional().describe('Key decision makers in B2B'),
  
  // B2C specific fields
  ageRange: z.string().optional().describe('Age range for B2C consumers'),
  incomeProfession: z.string().optional().describe('Income level and profession for B2C'),
  lifestyle: z.string().optional().describe('Lifestyle characteristics for B2C'),
  
  // Common fields for both B2B and B2C
  keyNeeds: z.array(z.string()).describe('Primary needs and requirements'),
  painPoints: z.array(z.string()).describe('Main pain points and challenges'),
  useCases: z.array(z.string()).describe('Common use cases and scenarios'),
  fitCriteria: z.array(z.string()).describe('Criteria that define a good fit'),
  exclusionCriteria: z.array(z.string()).describe('Characteristics that exclude them'),
  budgetRange: z.string().optional().describe('Typical budget or spending capacity'),
  decisionDrivers: z.array(z.string()).describe('Key factors driving purchase decisions'),
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

// Personas Array Schema for structured output
export const PersonasArraySchema = z.object({
  personas: z.array(UserPersonaSchema),
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
