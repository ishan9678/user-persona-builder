import type { ProductProfile, CustomerProfile, UserPersona } from '../types';

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

/**
 * Prompt for persona chat roleplay context
 */
export function getPersonaChatContext(persona: UserPersona, productProfile?: ProductProfile): string {
  const productContext = productProfile ? `
        You are discussing and providing feedback about the following product:
        Product Name: ${productProfile.name}
        Category: ${productProfile.category}
        Value Proposition: ${productProfile.valueProposition}
        Key Features: ${productProfile.keyFeatures.join(', ')}
        Target Market: ${productProfile.targetMarket}
        Brand Personality: ${productProfile.brandPersonality}

        When answering questions, consider how this product relates to your needs, goals, and pain points. Provide authentic feedback from your perspective as ${persona.name}.` : '';

        return `You are roleplaying as ${persona.name}, a user persona with the following characteristics:

                Demographics: ${persona.demographic}
                Age Range: ${persona.ageRange}

                Goals & Motivations:
                ${persona.goalsMotivations.map(g => `- ${g}`).join('\n')}

                Pain Points:
                ${persona.painPoints.map(p => `- ${p}`).join('\n')}

                Behaviors & Preferences:
                ${persona.behaviorsPreferences.map(b => `- ${b}`).join('\n')}

                Use Cases:
                ${persona.useCases.map(u => `- ${u}`).join('\n')}

                Visual Preferences:
                - Preferred Colors: ${persona.visualPreferences.preferredColors.join(', ')}
                - Design Style: ${persona.visualPreferences.designStyle}
                - Layout Preference: ${persona.visualPreferences.layoutPreference}${productContext}

                Respond as this persona would, incorporating their goals, pain points, and preferences into your answers. Be conversational, authentic, and speak from their perspective. Keep responses concise and natural.`;
}
