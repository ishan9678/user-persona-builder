'use server';

import { ScrapedContentSchema, type ScrapedContent } from './types';
import {
  scrapeWebpage,
  extractSemanticElements,
  extractVisualInfo,
  extractTextContent,
} from './utils';

export async function scrapeUrl(url: string): Promise<ScrapedContent> {
  try {
    // Validate URL
    new URL(url);
    
    // Scrape the webpage
    const html = await scrapeWebpage(url);
    
    // Extract all information
    const semanticElements = extractSemanticElements(html);
    const visualInfo = extractVisualInfo(html);
    const textContent = extractTextContent(html);
    
    // Extract title
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : 'Untitled';
    
    // Create structured content
    const scrapedContent: ScrapedContent = {
      url,
      title,
      textContent: textContent.slice(0, 10000), // Limit text length
      semanticElements,
      visualInfo,
      metadata: {
        scrapedAt: new Date().toISOString(),
        elementCount: semanticElements.length,
      },
    };
    
    // Validate with Zod schema
    return ScrapedContentSchema.parse(scrapedContent);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Scraping failed: ${error.message}`);
    }
    throw new Error('Unknown scraping error occurred');
  }
}
