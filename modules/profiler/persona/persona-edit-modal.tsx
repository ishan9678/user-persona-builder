'use client';

import { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { UserPersona } from '../../llm/types';

type PersonaEditModalProps = {
  persona: UserPersona;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedPersona: UserPersona) => void;
};

export function PersonaEditModal({ persona, isOpen, onClose, onSave }: PersonaEditModalProps) {
  const [editedPersona, setEditedPersona] = useState<UserPersona>(persona);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(editedPersona);
    onClose();
  };

  const updateField = (field: keyof UserPersona, value: any) => {
    setEditedPersona(prev => ({ ...prev, [field]: value }));
  };

  const updateArrayField = (field: keyof UserPersona, index: number, value: string) => {
    setEditedPersona(prev => {
      const array = [...(prev[field] as string[])];
      array[index] = value;
      return { ...prev, [field]: array };
    });
  };

  const addArrayItem = (field: keyof UserPersona) => {
    setEditedPersona(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), '']
    }));
  };

  const removeArrayItem = (field: keyof UserPersona, index: number) => {
    setEditedPersona(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }));
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl h-[600px] bg-background border-4 border-black dark:border-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b-2 border-black dark:border-white flex items-center justify-between bg-primary text-primary-foreground">
          <div>
            <h3 className="text-xl font-black uppercase">Edit Persona</h3>
            <p className="text-sm opacity-90">{persona.name}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-primary-foreground/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="font-bold text-xs uppercase block mb-2">Name</label>
              <Input
                value={editedPersona.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="border-2 border-black dark:border-white"
              />
            </div>

            <div>
              <label className="font-bold text-xs uppercase block mb-2">Age Range</label>
              <Input
                value={editedPersona.ageRange}
                onChange={(e) => updateField('ageRange', e.target.value)}
                className="border-2 border-black dark:border-white"
              />
            </div>

            <div>
              <label className="font-bold text-xs uppercase block mb-2">Demographic</label>
              <Input
                value={editedPersona.demographic}
                onChange={(e) => updateField('demographic', e.target.value)}
                className="border-2 border-black dark:border-white"
              />
            </div>
          </div>

          {/* Goals & Motivations */}
          <div>
            <label className="font-bold text-xs uppercase block mb-2">Goals & Motivations</label>
            <div className="space-y-2">
              {editedPersona.goalsMotivations.map((goal, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    value={goal}
                    onChange={(e) => updateArrayField('goalsMotivations', i, e.target.value)}
                    className="border-2 border-black dark:border-white"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeArrayItem('goalsMotivations', i)}
                    className="border-2 border-black dark:border-white shrink-0"
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => addArrayItem('goalsMotivations')}
                className="border-2 border-black dark:border-white w-full"
              >
                + Add Goal
              </Button>
            </div>
          </div>

          {/* Pain Points */}
          <div>
            <label className="font-bold text-xs uppercase block mb-2">Pain Points</label>
            <div className="space-y-2">
              {editedPersona.painPoints.map((pain, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    value={pain}
                    onChange={(e) => updateArrayField('painPoints', i, e.target.value)}
                    className="border-2 border-black dark:border-white"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeArrayItem('painPoints', i)}
                    className="border-2 border-black dark:border-white shrink-0"
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => addArrayItem('painPoints')}
                className="border-2 border-black dark:border-white w-full"
              >
                + Add Pain Point
              </Button>
            </div>
          </div>

          {/* Behaviors & Preferences */}
          <div>
            <label className="font-bold text-xs uppercase block mb-2">Behaviors & Preferences</label>
            <div className="space-y-2">
              {editedPersona.behaviorsPreferences.map((behavior, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    value={behavior}
                    onChange={(e) => updateArrayField('behaviorsPreferences', i, e.target.value)}
                    className="border-2 border-black dark:border-white"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeArrayItem('behaviorsPreferences', i)}
                    className="border-2 border-black dark:border-white shrink-0"
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => addArrayItem('behaviorsPreferences')}
                className="border-2 border-black dark:border-white w-full"
              >
                + Add Behavior
              </Button>
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <label className="font-bold text-xs uppercase block mb-2">Use Cases</label>
            <div className="space-y-2">
              {editedPersona.useCases.map((useCase, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    value={useCase}
                    onChange={(e) => updateArrayField('useCases', i, e.target.value)}
                    className="border-2 border-black dark:border-white"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeArrayItem('useCases', i)}
                    className="border-2 border-black dark:border-white shrink-0"
                  >
                    ✕
                  </Button>
                </div>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={() => addArrayItem('useCases')}
                className="border-2 border-black dark:border-white w-full"
              >
                + Add Use Case
              </Button>
            </div>
          </div>

          {/* Visual Preferences */}
          <div>
            <label className="font-bold text-xs uppercase block mb-2">Visual Preferences</label>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold block mb-2">Preferred Colors</label>
                <div className="space-y-2">
                  {editedPersona.visualPreferences.preferredColors.map((color, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        value={color}
                        onChange={(e) => {
                          const colors = [...editedPersona.visualPreferences.preferredColors];
                          colors[i] = e.target.value;
                          setEditedPersona(prev => ({
                            ...prev,
                            visualPreferences: { ...prev.visualPreferences, preferredColors: colors }
                          }));
                        }}
                        className="border-2 border-black dark:border-white"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const colors = editedPersona.visualPreferences.preferredColors.filter((_, idx) => idx !== i);
                          setEditedPersona(prev => ({
                            ...prev,
                            visualPreferences: { ...prev.visualPreferences, preferredColors: colors }
                          }));
                        }}
                        className="border-2 border-black dark:border-white shrink-0"
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      const colors = [...editedPersona.visualPreferences.preferredColors, ''];
                      setEditedPersona(prev => ({
                        ...prev,
                        visualPreferences: { ...prev.visualPreferences, preferredColors: colors }
                      }));
                    }}
                    className="border-2 border-black dark:border-white w-full"
                  >
                    + Add Color
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-2">Design Style</label>
                <Input
                  value={editedPersona.visualPreferences.designStyle}
                  onChange={(e) => setEditedPersona(prev => ({
                    ...prev,
                    visualPreferences: { ...prev.visualPreferences, designStyle: e.target.value }
                  }))}
                  className="border-2 border-black dark:border-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold block mb-2">Layout Preference</label>
                <Input
                  value={editedPersona.visualPreferences.layoutPreference}
                  onChange={(e) => setEditedPersona(prev => ({
                    ...prev,
                    visualPreferences: { ...prev.visualPreferences, layoutPreference: e.target.value }
                  }))}
                  className="border-2 border-black dark:border-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Save Button */}
        <div className="p-4 border-t-2 border-black dark:border-white">
          <Button
            onClick={handleSave}
            className="w-full border-2 border-black dark:border-white font-bold uppercase"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}