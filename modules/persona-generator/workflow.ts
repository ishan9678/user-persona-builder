import { HumanMessage } from '@langchain/core/messages';
import { getGeminiModel } from './model';
import {
  ProductProfileSchema,
  CustomerProfileSchema,
  PersonasArraySchema,
  type WorkflowState,
} from './types';

// Node 1: Create Product Profile
async function createProductProfile(state: WorkflowState): Promise<Partial<WorkflowState>> {
  try {
    const model = getGeminiModel({ schema: ProductProfileSchema, jsonMode: true });
    
    const prompt = `Analyze the following website content and create a detailed product profile.

Website Content:
${state.scrapedContent}

Create a comprehensive product profile with:
- Product/Service name
- Industry category
- Key features (at least 3)
- Main value proposition
- Primary target market
- Brand personality description
- Visual identity (color scheme, typography, design style)

Focus on extracting concrete information from the website content provided.`;

    const productProfile = await model.invoke(prompt);

    console.log('Product Profile:', productProfile);
    
    return { productProfile };
  } catch (error) {
    console.error('Product profile error:', error);
    return { 
      error: `Product profile generation failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

// Node 2: Create Ideal Customer Profile
async function createCustomerProfile(state: WorkflowState): Promise<Partial<WorkflowState>> {
  try {
    if (!state.productProfile) {
      throw new Error('Product profile is required');
    }

    const model = getGeminiModel({ schema: CustomerProfileSchema, jsonMode: true });
    
    const prompt = `Based on the following product profile, create an ideal customer profile.

Product Profile:
${JSON.stringify(state.productProfile, null, 2)}

First, determine if this is a B2B (business-to-business) or B2C (business-to-consumer) product/service.

If B2B, provide:
- type: "B2B"
- industrySegment: Target industry sectors
- companySize: Company size range (e.g., "50-500 employees", "Enterprise 1000+")
- decisionMakers: Key decision makers and stakeholders
- keyNeeds: Business needs (at least 3)
- painPoints: Business pain points (at least 3)
- useCases: Common business use cases (at least 3)
- fitCriteria: What makes a company a good fit (at least 3)
- exclusionCriteria: What disqualifies a company (at least 2)
- budgetRange: Typical budget range
- decisionDrivers: Key factors in purchase decision (at least 3)

If B2C, provide:
- type: "B2C"
- ageRange: Target age range (e.g., "25-45")
- incomeProfession: Income level and typical professions
- lifestyle: Lifestyle characteristics and interests
- keyNeeds: Personal needs and desires (at least 3)
- painPoints: Personal pain points and frustrations (at least 3)
- useCases: Common personal use cases (at least 3)
- fitCriteria: What makes a person a good fit (at least 3)
- exclusionCriteria: What disqualifies a person (at least 2)
- budgetRange: Typical spending capacity
- decisionDrivers: Key factors in purchase decision (at least 3)

Focus on who would benefit most from this product/service and be specific about the ideal customer characteristics.`;

    const customerProfile = await model.invoke(prompt);

    console.log('Customer Profile:', customerProfile);
    
    return { customerProfile };
  } catch (error) {
    console.error('Customer profile error:', error);
    return { 
      error: `Customer profile generation failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

// Node 3: Create User Personas
async function createUserPersonas(state: WorkflowState): Promise<Partial<WorkflowState>> {
  try {
    if (!state.productProfile || !state.customerProfile) {
      throw new Error('Product and customer profiles are required');
    }

    const model = getGeminiModel({ schema: PersonasArraySchema, jsonMode: true });
    const count = state.personaCount || 3;
    
    const prompt = `Based on the following product and customer profiles, create ${count} detailed user personas.

Product Profile:
${JSON.stringify(state.productProfile, null, 2)}

Customer Profile:
${JSON.stringify(state.customerProfile, null, 2)}

Create exactly ${count} diverse and realistic user personas. For each persona, provide:
- A fictional name
- Age range (e.g., 25-35)
- Demographic details (location, occupation, etc.)
- Goals and motivations (at least 3)
- Pain points (at least 3)
- Behaviors and preferences (at least 3)
- Use cases (at least 3)
- Visual preferences (preferred colors, design style, layout preference)

Make each persona unique, detailed, and grounded in the product/customer context.`;

    const result = await model.invoke(prompt);

    console.log('Personas:', result);
    
    return { personas: result.personas };
  } catch (error) {
    console.error('Persona generation error:', error);
    return { 
      error: `Persona generation failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
    };
  }
}

// Orchestrator: Run the full workflow
export async function runPersonaWorkflow(
  scrapedContent: string,
  personaCount: number = 3,
  onProgress?: (stage: string, data?: any) => void
): Promise<WorkflowState> {
  const state: WorkflowState = {
    scrapedContent,
    personaCount,
  };

  try {
    // Step 1: Create Product Profile
    onProgress?.('Creating product profile...');
    const productResult = await createProductProfile(state);
    if (productResult.error) {
      throw new Error(productResult.error);
    }
    state.productProfile = productResult.productProfile;
    onProgress?.('Product profile created', state.productProfile);

    // Step 2: Create Customer Profile
    onProgress?.('Creating customer profile...');
    const customerResult = await createCustomerProfile(state);
    if (customerResult.error) {
      throw new Error(customerResult.error);
    }
    state.customerProfile = customerResult.customerProfile;
    onProgress?.('Customer profile created', state.customerProfile);

    // Step 3: Create User Personas
    onProgress?.('Generating user personas...');
    const personaResult = await createUserPersonas(state);
    if (personaResult.error) {
      throw new Error(personaResult.error);
    }
    state.personas = personaResult.personas;
    onProgress?.('User personas generated', state.personas);

    return state;
  } catch (error) {
    state.error = error instanceof Error ? error.message : 'Unknown error';
    throw error;
  }
}
