import { HumanMessage } from '@langchain/core/messages';
import { getGeminiModel, formatJsonResponse } from './llm-utils';
import {
  WorkflowStateSchema,
  ProductProfileSchema,
  CustomerProfileSchema,
  UserPersonaSchema,
  type WorkflowState,
  type ProductProfile,
  type CustomerProfile,
  type UserPersona,
} from './types';

// Node 1: Create Product Profile
async function createProductProfile(state: WorkflowState): Promise<Partial<WorkflowState>> {
  try {
    const model = getGeminiModel();
    
    const prompt = `Analyze the following website content and create a detailed product profile.

Website Content:
${state.scrapedContent}

Create a comprehensive product profile in JSON format with the following structure:
{
  "name": "Product/Service Name",
  "category": "Industry category",
  "keyFeatures": ["feature1", "feature2", "feature3"],
  "valueProposition": "Main value proposition",
  "targetMarket": "Primary target market",
  "brandPersonality": "Brand personality description",
  "visualIdentity": {
    "colorScheme": "Description of color scheme",
    "typography": "Typography style",
    "designStyle": "Overall design style (modern, minimalist, bold, etc.)"
  }
}

Respond with ONLY the JSON object, no additional text.`;

    const response = await model.invoke([new HumanMessage(prompt)]);
    const productProfile = formatJsonResponse(response.content.toString());
    
    // Validate the response
    const validatedProfile = ProductProfileSchema.parse(productProfile);
    
    return { productProfile: validatedProfile };
  } catch (error) {
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

    const model = getGeminiModel();
    
    const prompt = `Based on the following product profile, create an ideal customer profile.

Product Profile:
${JSON.stringify(state.productProfile, null, 2)}

Create a comprehensive ideal customer profile in JSON format with the following structure:
{
  "industrySegment": "Target industry segment",
  "companySize": "Company size (if B2B) or demographic segment (if B2C)",
  "keyNeeds": ["need1", "need2", "need3"],
  "painPoints": ["pain1", "pain2", "pain3"],
  "decisionDrivers": ["driver1", "driver2", "driver3"],
  "budgetRange": "Typical budget range or spending capacity"
}

Respond with ONLY the JSON object, no additional text.`;

    const response = await model.invoke([new HumanMessage(prompt)]);
    const customerProfile = formatJsonResponse(response.content.toString());
    
    // Validate the response
    const validatedProfile = CustomerProfileSchema.parse(customerProfile);
    
    return { customerProfile: validatedProfile };
  } catch (error) {
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

    const model = getGeminiModel();
    const count = state.personaCount || 3;
    
    const prompt = `Based on the following product and customer profiles, create ${count} detailed user personas.

Product Profile:
${JSON.stringify(state.productProfile, null, 2)}

Customer Profile:
${JSON.stringify(state.customerProfile, null, 2)}

Create ${count} diverse user personas in JSON format as an array with the following structure for each persona:
[
  {
    "name": "Persona Name (fictional)",
    "ageRange": "Age range (e.g., 25-35)",
    "demographic": "Demographic details (location, occupation, etc.)",
    "goalsMotivations": ["goal1", "goal2", "goal3"],
    "painPoints": ["pain1", "pain2", "pain3"],
    "behaviorsPreferences": ["behavior1", "behavior2", "behavior3"],
    "useCases": ["usecase1", "usecase2", "usecase3"],
    "visualPreferences": {
      "preferredColors": ["color1", "color2"],
      "designStyle": "Preferred design style",
      "layoutPreference": "Preferred layout style"
    }
  }
]

Make each persona unique and realistic. Respond with ONLY the JSON array, no additional text.`;

    const response = await model.invoke([new HumanMessage(prompt)]);
    const personas = formatJsonResponse(response.content.toString());
    
    // Validate the response
    const validatedPersonas = personas.map((p: any) => UserPersonaSchema.parse(p));
    
    return { personas: validatedPersonas };
  } catch (error) {
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
