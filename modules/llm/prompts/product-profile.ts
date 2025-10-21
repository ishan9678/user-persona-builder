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