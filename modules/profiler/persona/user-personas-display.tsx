'use client';

import { useState, useRef } from 'react';
import { PersonaCard } from './persona-card';
import { PersonaChatModal } from './persona-chat-modal';
import { PersonaEditModal } from './persona-edit-modal';
import { exportToPng, exportToPdf, exportToMarkdown } from '@/lib/export-utils';
import type { UserPersona, ProductProfile } from '../../llm/types';

type UserPersonasDisplayProps = {
  personas: UserPersona[];
  productProfile?: ProductProfile;
};

export function UserPersonasDisplay({ personas, productProfile }: UserPersonasDisplayProps) {
  const [selectedPersona, setSelectedPersona] = useState<UserPersona | null>(null);
  const [editingPersona, setEditingPersona] = useState<UserPersona | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());
  const [personasList, setPersonasList] = useState<UserPersona[]>(personas);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  
  // Store chat messages for each persona by their name
  const [chatHistories, setChatHistories] = useState<Map<string, Array<{ role: 'user' | 'assistant'; content: string }>>>(new Map());

  const toggleCard = (index: number) => {
    setExpandedIndices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleSavePersona = (updatedPersona: UserPersona) => {
    if (editingIndex !== null) {
      setPersonasList(prev => 
        prev.map((p, idx) => idx === editingIndex ? updatedPersona : p)
      );
    }
  };

  const getInitialMessages = (persona: UserPersona) => [
    {
      role: 'assistant' as const,
      content: `Hi! I'm ${persona.name}, ${persona.demographic}. I'm here to help you understand my perspective as a user persona. Feel free to ask me anything about my needs, goals, or how I'd use your product!`
    }
  ];

  const getChatHistory = (persona: UserPersona) => {
    return chatHistories.get(persona.name) || getInitialMessages(persona);
  };

  const updateChatHistory = (persona: UserPersona, messages: Array<{ role: 'user' | 'assistant'; content: string }>) => {
    setChatHistories(prev => {
      const newMap = new Map(prev);
      newMap.set(persona.name, messages);
      return newMap;
    });
  };

  const handleExport = async (persona: UserPersona, format: 'png' | 'pdf' | 'markdown', index: number) => {
    const filename = `${persona.name.replace(/\s+/g, '-').toLowerCase()}-persona`;
    
    if (format === 'markdown') {
      exportToMarkdown(persona, filename);
      return;
    }

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
    const cardElement = cardRefs.current.get(index);
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
    } finally {
      // Collapse back if it wasn't originally expanded
      if (!wasExpanded) {
        setExpandedIndices(prev => {
          const newSet = new Set(prev);
          newSet.delete(index);
          return newSet;
        });
      }
    }
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-2">
            User Personas
          </h2>
          <p className="text-muted-foreground">
            {personas.length} {personas.length === 1 ? 'persona' : 'personas'} generated
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {personasList.map((persona, idx) => (
            <PersonaCard
              key={idx}
              ref={(el: HTMLDivElement | null) => {
                if (el) cardRefs.current.set(idx, el);
              }}
              persona={persona}
              isExpanded={expandedIndices.has(idx)}
              onToggle={() => toggleCard(idx)}
              onChatClick={() => setSelectedPersona(persona)}
              onEditClick={() => {
                setEditingPersona(persona);
                setEditingIndex(idx);
              }}
              onExport={(format: 'png' | 'pdf' | 'markdown') => handleExport(persona, format, idx)}
            />
          ))}
        </div>
      </div>

      {/* Chat Modal */}
      {selectedPersona && (
        <PersonaChatModal
          persona={selectedPersona}
          productProfile={productProfile}
          isOpen={true}
          onClose={() => setSelectedPersona(null)}
          messages={getChatHistory(selectedPersona)}
          onMessagesChange={(messages) => updateChatHistory(selectedPersona, messages)}
        />
      )}

      {/* Edit Modal */}
      {editingPersona && (
        <PersonaEditModal
          persona={editingPersona}
          isOpen={true}
          onClose={() => {
            setEditingPersona(null);
            setEditingIndex(null);
          }}
          onSave={handleSavePersona}
        />
      )}
    </>
  );
}
