import * as cheerio from 'cheerio';
import type { CSSInfo, SemanticElement } from './types';

export async function scrapeWebpage(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }
    
    const html = await response.text();
    return html;
  } catch (error) {
    throw new Error(
      `Scraping failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export function extractSemanticElements(html: string): SemanticElement[] {
  const $ = cheerio.load(html);
  const elements: SemanticElement[] = [];

  // Extract headings
  $('h1, h2, h3, h4, h5, h6').each((_, elem) => {
    const $elem = $(elem);
    const tagName = elem.tagName.toLowerCase();
    const level = parseInt(tagName.substring(1));
    
    elements.push({
      type: 'heading',
      content: $elem.text().trim(),
      level,
      classes: $elem.attr('class')?.split(' ').filter(Boolean) || [],
      styles: parseInlineStyles($elem.attr('style')),
    });
  });

  // Extract paragraphs
  $('p').each((_, elem) => {
    const $elem = $(elem);
    const content = $elem.text().trim();
    
    if (content) {
      elements.push({
        type: 'paragraph',
        content,
        classes: $elem.attr('class')?.split(' ').filter(Boolean) || [],
        styles: parseInlineStyles($elem.attr('style')),
      });
    }
  });

  // Extract lists
  $('ul, ol').each((_, elem) => {
    const $elem = $(elem);
    const content = $elem.text().trim();
    
    if (content) {
      elements.push({
        type: 'list',
        content,
        classes: $elem.attr('class')?.split(' ').filter(Boolean) || [],
        styles: parseInlineStyles($elem.attr('style')),
      });
    }
  });

  // Extract links
  $('a').each((_, elem) => {
    const $elem = $(elem);
    const content = $elem.text().trim();
    
    if (content) {
      elements.push({
        type: 'link',
        content,
        classes: $elem.attr('class')?.split(' ').filter(Boolean) || [],
        styles: parseInlineStyles($elem.attr('style')),
      });
    }
  });

  // Extract buttons
  $('button, input[type="button"], input[type="submit"]').each((_, elem) => {
    const $elem = $(elem);
    const content = $elem.text().trim() || $elem.attr('value') || '';
    
    if (content) {
      elements.push({
        type: 'button',
        content,
        classes: $elem.attr('class')?.split(' ').filter(Boolean) || [],
        styles: parseInlineStyles($elem.attr('style')),
      });
    }
  });

  // Extract images with alt text
  $('img').each((_, elem) => {
    const $elem = $(elem);
    const alt = $elem.attr('alt') || '';
    
    elements.push({
      type: 'image',
      content: alt,
      classes: $elem.attr('class')?.split(' ').filter(Boolean) || [],
      styles: parseInlineStyles($elem.attr('style')),
    });
  });

  return elements;
}

export function extractVisualInfo(html: string): CSSInfo {
  const $ = cheerio.load(html);
  const colors = new Set<string>();
  const fonts = new Set<string>();
  const spacing = new Set<string>();
  const borderStyles = new Set<string>();

  // Extract inline styles
  $('[style]').each((_, elem) => {
    const style = $(elem).attr('style');
    if (style) {
      const styles = parseInlineStyles(style);
      
      // Extract colors
      if (styles?.color) colors.add(styles.color);
      if (styles?.backgroundColor) colors.add(styles.backgroundColor);
      if (styles?.borderColor) colors.add(styles.borderColor);
      
      // Extract fonts
      if (styles?.fontFamily) fonts.add(styles.fontFamily);
      
      // Extract spacing
      if (styles?.margin) spacing.add(`margin: ${styles.margin}`);
      if (styles?.padding) spacing.add(`padding: ${styles.padding}`);
      
      // Extract border styles
      if (styles?.border) borderStyles.add(styles.border);
      if (styles?.borderRadius) borderStyles.add(`border-radius: ${styles.borderRadius}`);
    }
  });

  // Extract from style tags
  $('style').each((_, elem) => {
    const cssText = $(elem).html() || '';
    extractCSSProperties(cssText, colors, fonts, spacing, borderStyles);
  });

  return {
    colors: Array.from(colors).slice(0, 20), // Limit to prevent overflow
    fonts: Array.from(fonts).slice(0, 10),
    spacing: Array.from(spacing).slice(0, 15),
    borderStyles: Array.from(borderStyles).slice(0, 10),
  };
}

function parseInlineStyles(styleStr?: string): Record<string, string> | undefined {
  if (!styleStr) return undefined;
  
  const styles: Record<string, string> = {};
  const declarations = styleStr.split(';').filter(Boolean);
  
  declarations.forEach(decl => {
    const [property, value] = decl.split(':').map(s => s.trim());
    if (property && value) {
      styles[property] = value;
    }
  });
  
  return Object.keys(styles).length > 0 ? styles : undefined;
}

function extractCSSProperties(
  cssText: string,
  colors: Set<string>,
  fonts: Set<string>,
  spacing: Set<string>,
  borderStyles: Set<string>
) {
  // Color patterns
  const colorRegex = /(?:color|background-color|border-color)\s*:\s*([^;]+)/gi;
  let match;
  while ((match = colorRegex.exec(cssText)) !== null) {
    colors.add(match[1].trim());
  }

  // Font patterns
  const fontRegex = /font-family\s*:\s*([^;]+)/gi;
  while ((match = fontRegex.exec(cssText)) !== null) {
    fonts.add(match[1].trim());
  }

  // Spacing patterns
  const spacingRegex = /(?:margin|padding)\s*:\s*([^;]+)/gi;
  while ((match = spacingRegex.exec(cssText)) !== null) {
    spacing.add(match[0].trim());
  }

  // Border patterns
  const borderRegex = /(?:border|border-radius)\s*:\s*([^;]+)/gi;
  while ((match = borderRegex.exec(cssText)) !== null) {
    borderStyles.add(match[0].trim());
  }
}

export function extractTextContent(html: string): string {
  const $ = cheerio.load(html);
  
  // Remove script and style tags
  $('script, style, noscript').remove();
  
  // Get text content
  const text = $('body').text();
  
  // Clean up whitespace
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
}
