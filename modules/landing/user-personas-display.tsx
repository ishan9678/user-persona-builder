'use client';

import { useState } from 'react';
import { PersonaCardCollapsed } from './persona-card-collapsed';
import { PersonaCardExpanded } from './persona-card-expanded';
import { PersonaChatModal } from './persona-chat-modal';
import { PersonaEditModal } from './persona-edit-modal';
import type { UserPersona } from '../persona-generator/types';

type UserPersonasDisplayProps = {
  personas: UserPersona[];
};

export function UserPersonasDisplay({ personas }: UserPersonasDisplayProps) {
  const [selectedPersona, setSelectedPersona] = useState<UserPersona | null>(null);
  const [editingPersona, setEditingPersona] = useState<UserPersona | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());
  const [personasList, setPersonasList] = useState<UserPersona[]>(personas);

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
          {personasList.map((persona, idx) => {
            const isExpanded = expandedIndices.has(idx);

            return isExpanded ? (
              <PersonaCardExpanded
                key={idx}
                persona={persona}
                onCollapse={() => toggleCard(idx)}
                onChatClick={() => setSelectedPersona(persona)}
                onEditClick={() => {
                  setEditingPersona(persona);
                  setEditingIndex(idx);
                }}
              />
            ) : (
              <PersonaCardCollapsed
                key={idx}
                persona={persona}
                onExpand={() => toggleCard(idx)}
                onChatClick={() => setSelectedPersona(persona)}
                onEditClick={() => {
                  setEditingPersona(persona);
                  setEditingIndex(idx);
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Chat Modal */}
      {selectedPersona && (
        <PersonaChatModal
          persona={selectedPersona}
          isOpen={true}
          onClose={() => setSelectedPersona(null)}
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
