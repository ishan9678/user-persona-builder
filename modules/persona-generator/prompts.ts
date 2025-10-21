import type { ProductProfile, CustomerProfile } from './types';

/**
 * Prompt for creating a product profile from scraped website content
 */
export function getProductProfilePrompt(scrapedContent: string): string {
  return `Analyze the following website content and create a detailed product profile.

Website Content:
${scrapedContent}

Create a comprehensive product profile with:
- Product/Service name
- Industry category
- Key features (at least 3)
- Main value proposition
- Primary target market
- Brand personality description
- Visual identity (color scheme, typography, design style)

Focus on extracting concrete information from the website content provided.`;
}

/**
 * Prompt for creating an ideal customer profile based on product profile
 */
export function getCustomerProfilePrompt(productProfile: ProductProfile): string {
  return `Based on the following product profile, create an ideal customer profile.

Product Profile:
${JSON.stringify(productProfile, null, 2)}

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
}

/**
 * Prompt for creating user personas based on product and customer profiles
 */
export function getUserPersonasPrompt(
  productProfile: ProductProfile,
  customerProfile: CustomerProfile,
  count: number
): string {
  return `Based on the following product and customer profiles, create ${count} detailed user personas.

Product Profile:
${JSON.stringify(productProfile, null, 2)}

Customer Profile:
${JSON.stringify(customerProfile, null, 2)}

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
}
