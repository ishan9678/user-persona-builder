'use client';

import { useState, useRef, useEffect } from 'react';
import { PersonaCard } from './persona-card';
import { PersonaChatModal } from './persona-chat-modal';
import { PersonaEditModal } from './persona-edit-modal';
import { getChatHistory, updateChatHistory, toggleCardExpansion, updatePersonaAtIndex, handlePersonaExport } from './utils';
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
  const [exportingIndex, setExportingIndex] = useState<number | null>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  
  // Store chat messages for each persona by their name
  const [chatHistories, setChatHistories] = useState<Map<string, Array<{ role: 'user' | 'assistant'; content: string }>>>(new Map());

  // Sync personasList with personas prop when it changes (e.g., when switching reports)
  useEffect(() => {
    setPersonasList(personas);
    setExpandedIndices(new Set()); // Reset expanded states when switching reports
    setChatHistories(new Map()); // Clear chat histories when switching reports
  }, [personas]);

  // Disable scroll when modals are open
  useEffect(() => {
    if (selectedPersona || editingPersona) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPersona, editingPersona]);

  const toggleCard = (index: number) => {
    setExpandedIndices(prev => toggleCardExpansion(prev, index));
  };

  const handleSavePersona = (updatedPersona: UserPersona) => {
    if (editingIndex !== null) {
      setPersonasList(prev => updatePersonaAtIndex(prev, editingIndex, updatedPersona));
    }
  };

  const handleUpdateChatHistory = (persona: UserPersona, messages: Array<{ role: 'user' | 'assistant'; content: string }>) => {
    setChatHistories(prev => updateChatHistory(prev, persona, messages));
  };

  const handleExport = async (persona: UserPersona, format: 'png' | 'pdf' | 'markdown', index: number) => {
    await handlePersonaExport(persona, format, index, cardRefs.current, expandedIndices, setExpandedIndices, setExportingIndex);
  };

  return (
    <>
      <div className="w-full max-w-[76rem] mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-2">
            User Personas
          </h2>
          <p className="text-muted-foreground">
            {personas.length} {personas.length === 1 ? 'persona' : 'personas'} generated
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto justify-items-center">
          {personasList.map((persona, idx) => (
            <PersonaCard
              key={idx}
              ref={(el: HTMLDivElement | null) => {
                if (el) cardRefs.current.set(idx, el);
              }}
              persona={persona}
              isExpanded={expandedIndices.has(idx)}
              hideButtons={exportingIndex === idx}
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
          messages={getChatHistory(chatHistories, selectedPersona)}
          onMessagesChange={(messages) => handleUpdateChatHistory(selectedPersona, messages)}
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
