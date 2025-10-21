import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

/**
 * Exports a persona card as a PNG image
 * @param element - The HTML element to capture
 * @param filename - The name for the downloaded file
 */
export async function exportToPng(element: HTMLElement, filename: string): Promise<void> {
  try {
    const dataUrl = await toPng(element, {
      quality: 1,
      pixelRatio: 2, // Higher quality for retina displays
      backgroundColor: '#ffffff',
    });

    // Create a temporary link to download the image
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Error exporting to PNG:', error);
    throw new Error('Failed to export as PNG');
  }
}

/**
 * Exports a persona card as a PDF document
 * @param element - The HTML element to capture
 * @param filename - The name for the downloaded file
 */
export async function exportToPdf(element: HTMLElement, filename: string): Promise<void> {
  try {
    // First, capture the element as an image
    const dataUrl = await toPng(element, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
    });

    // Get element dimensions
    const imgWidth = element.offsetWidth;
    const imgHeight = element.offsetHeight;

    // Create PDF with appropriate size
    // A4 size in mm: 210 x 297
    const pdf = new jsPDF({
      orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
      unit: 'px',
      format: [imgWidth, imgHeight],
    });

    // Add the image to PDF
    pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight);

    // Download the PDF
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw new Error('Failed to export as PDF');
  }
}

/**
 * Exports persona data as a Markdown file
 * @param persona - The persona object to export
 * @param filename - The name for the downloaded file
 */
export function exportToMarkdown(persona: any, filename: string): void {
  const markdown = `# ${persona.name}

## Demographics
- **Age Range**: ${persona.ageRange}
- **Demographic**: ${persona.demographic}

## Goals & Motivations
${persona.goalsMotivations.map((goal: string) => `- ${goal}`).join('\n')}

## Pain Points
${persona.painPoints.map((point: string) => `- ${point}`).join('\n')}

## Behaviors & Preferences
${persona.behaviorsPreferences.map((behavior: string) => `- ${behavior}`).join('\n')}

## Use Cases
${persona.useCases.map((useCase: string) => `- ${useCase}`).join('\n')}

## Visual Preferences
- **Preferred Colors**: ${persona.visualPreferences.preferredColors.join(', ')}
- **Design Style**: ${persona.visualPreferences.designStyle}
- **Layout Preference**: ${persona.visualPreferences.layoutPreference}
`;

  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.md`;
  link.click();
  URL.revokeObjectURL(url);
}
