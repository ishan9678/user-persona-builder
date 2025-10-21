'use client';

import { useState } from 'react';
import { PersonaCardCollapsed } from './persona-card-collapsed';
import { PersonaCardExpanded } from './persona-card-expanded';
import { PersonaChatModal } from './persona-chat-modal';
import type { UserPersona } from '../persona-generator/types';

type UserPersonasDisplayProps = {
  personas: UserPersona[];
};

export function UserPersonasDisplay({ personas }: UserPersonasDisplayProps) {
  const [selectedPersona, setSelectedPersona] = useState<UserPersona | null>(null);
  const [expandedPersonaNames, setExpandedPersonaNames] = useState<Set<string>>(new Set());

  const toggleCard = (persona: UserPersona) => {
    setExpandedPersonaNames(prev => {
      const newSet = new Set(prev);
      if (newSet.has(persona.name)) {
        newSet.delete(persona.name);
      } else {
        newSet.add(persona.name);
      }
      return newSet;
    });
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-2">
            User Personas
          </h2>
          <p className="text-muted-foreground">
            {personas.length} detailed {personas.length === 1 ? 'persona' : 'personas'} generated
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {personas.map((persona, idx) => {
            const isExpanded = expandedPersonaNames.has(persona.name);

            return isExpanded ? (
              <PersonaCardExpanded
                key={idx}
                persona={persona}
                onCollapse={() => toggleCard(persona)}
                onChatClick={() => setSelectedPersona(persona)}
              />
            ) : (
              <PersonaCardCollapsed
                key={idx}
                persona={persona}
                onExpand={() => toggleCard(persona)}
                onChatClick={() => setSelectedPersona(persona)}
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
    </>
  );
}
