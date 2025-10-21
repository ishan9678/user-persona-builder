'use server';

import { getGeminiModel } from './model';
import {
  ProductProfileSchema,
  CustomerProfileSchema,
  PersonasArraySchema,
  type ProductProfile,
  type CustomerProfile,
  type UserPersona,
} from './types';
import { getProductProfilePrompt } from './prompts/product-profile';
import { getCustomerProfilePrompt } from './prompts/customer-profile';
import { getUserPersonasPrompt } from './prompts/persona';

export async function generateProductProfile(
  scrapedContent: string
): Promise<ProductProfile> {
  try {
    const model = getGeminiModel({ schema: ProductProfileSchema, jsonMode: true });
    const prompt = getProductProfilePrompt(scrapedContent);
    const productProfile = await model.invoke(prompt);
    return productProfile;
  } catch (error) {
    throw new Error(
      `Product profile generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function generateCustomerProfile(
  productProfile: ProductProfile
): Promise<CustomerProfile> {
  try {
    const model = getGeminiModel({ schema: CustomerProfileSchema, jsonMode: true });
    const prompt = getCustomerProfilePrompt(productProfile);
    const customerProfile = await model.invoke(prompt);
    return customerProfile;
  } catch (error) {
    throw new Error(
      `Customer profile generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export async function generateUserPersonas(
  productProfile: ProductProfile,
  customerProfile: CustomerProfile,
  personaCount: number = 3
): Promise<UserPersona[]> {
  try {
    const model = getGeminiModel({ schema: PersonasArraySchema, jsonMode: true });
    const prompt = getUserPersonasPrompt(productProfile, customerProfile, personaCount);
    const result = await model.invoke(prompt);
    return result.personas;
  } catch (error) {
    throw new Error(
      `User personas generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
