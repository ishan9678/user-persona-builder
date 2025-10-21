import { exportToPng, exportToPdf, exportToMarkdown } from '@/lib/export-utils';
import type { UserPersona } from '../../llm/types';

/**
 * Retrieves chat history for a persona or returns initial messages
 */
export function getChatHistory(
  chatHistories: Map<string, Array<{ role: 'user' | 'assistant'; content: string }>>,
  persona: UserPersona
) {
  return chatHistories.get(persona.name) || _getInitialMessages(persona);
}

/**
 * Updates chat history for a specific persona
 */
export function updateChatHistory(
  chatHistories: Map<string, Array<{ role: 'user' | 'assistant'; content: string }>>,
  persona: UserPersona,
  messages: Array<{ role: 'user' | 'assistant'; content: string }>
): Map<string, Array<{ role: 'user' | 'assistant'; content: string }>> {
  const newMap = new Map(chatHistories);
  newMap.set(persona.name, messages);
  return newMap;
}

/**
 * Toggles the expanded state of a card
 */
export function toggleCardExpansion(
  expandedIndices: Set<number>,
  index: number
): Set<number> {
  const newSet = new Set(expandedIndices);
  if (newSet.has(index)) {
    newSet.delete(index);
  } else {
    newSet.add(index);
  }
  return newSet;
}

/**
 * Updates a persona at a specific index in the list
 */
export function updatePersonaAtIndex(
  personas: UserPersona[],
  index: number,
  updatedPersona: UserPersona
): UserPersona[] {
  return personas.map((p, idx) => idx === index ? updatedPersona : p);
}

/**
 * Handles exporting chat history to a markdown file
 */
export function handleChatExport(
  persona: UserPersona,
  messages: Array<{ role: 'user' | 'assistant'; content: string }>
): void {
  // Create markdown content from chat messages
  const markdown = `# Chat with ${persona.name}

**Persona:** ${persona.name}  
**Demographic:** ${persona.demographic}  
**Date:** ${new Date().toLocaleDateString()}

---

${messages.map((msg) => {
    const role = msg.role === 'user' ? '**You**' : `**${persona.name}**`;
    return `### ${role}\n\n${msg.content}\n`;
  }).join('\n')}`;

  // Download as markdown file
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chat-${persona.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Handles exporting a persona card in different formats
 */
export async function handlePersonaExport(
  persona: UserPersona,
  format: 'png' | 'pdf' | 'markdown',
  index: number,
  cardRefs: Map<number, HTMLDivElement>,
  expandedIndices: Set<number>,
  setExpandedIndices: (updater: (prev: Set<number>) => Set<number>) => void,
  setExportingIndex: (index: number | null) => void
): Promise<void> {
  const filename = `${persona.name.replace(/\s+/g, '-').toLowerCase()}-persona`;
  
  if (format === 'markdown') {
    exportToMarkdown(persona, filename);
    return;
  }

  // Hide buttons during export
  setExportingIndex(index);

  // For PNG and PDF, expand the card first to capture full details
  const wasExpanded = expandedIndices.has(index);
  
  if (!wasExpanded) {
    // Expand the card
    setExpandedIndices(prev => {
      const newSet = new Set(prev);
      newSet.add(index);
      return newSet;
    });
    
    // Wait for the DOM to update
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Get the expanded card element
  const cardElement = cardRefs.get(index);
  if (!cardElement) {
    alert('Unable to export: Card element not found');
    // Collapse back if it wasn't expanded
    if (!wasExpanded) {
      setExpandedIndices(prev => {
        const newSet = new Set(prev);
        newSet.delete(index);
        return newSet;
      });
    }
    return;
  }

  try {
    if (format === 'png') {
      await exportToPng(cardElement, filename);
    } else if (format === 'pdf') {
      await exportToPdf(cardElement, filename);
    }
  } catch (error) {
    console.error('Export error:', error);
    alert(`Failed to export as ${format.toUpperCase()}. Please try again.`);
  }
}

function _getInitialMessages(persona: UserPersona) {
  return [
    {
      role: 'assistant' as const,
      content: `Hi! I'm ${persona.name}, ${persona.demographic}. I'm here to help you understand my perspective as a user persona. Feel free to ask me anything about my needs, goals, or how I'd use your product!`
    }
  ];
}