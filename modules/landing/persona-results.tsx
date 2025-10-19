'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { UserPersona } from '../persona-generator/types';

type PersonaResultsProps = {
  personas: UserPersona[];
};

export function PersonaResults({ personas }: PersonaResultsProps) {
  if (!personas || personas.length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-black uppercase tracking-tight mb-2">
          User Personas
        </h2>
        <p className="text-muted-foreground">
          {personas.length} detailed {personas.length === 1 ? 'persona' : 'personas'} generated
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona, idx) => (
          <Card 
            key={idx}
            className="p-6 border-2 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all"
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-black uppercase">{persona.name}</h3>
                <div className="flex gap-2 mt-2">
                  <Badge className="border-2 border-black dark:border-white font-bold">
                    {persona.ageRange}
                  </Badge>
                </div>
              </div>

              <div>
                <span className="font-bold text-xs uppercase block mb-1">Demographic</span>
                <p className="text-sm">{persona.demographic}</p>
              </div>

              <div>
                <span className="font-bold text-xs uppercase block mb-2">Goals & Motivations</span>
                <ul className="space-y-1">
                  {persona.goalsMotivations.map((goal, i) => (
                    <li key={i} className="text-sm flex items-start">
                      <span className="mr-2">🎯</span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-xs uppercase block mb-2">Pain Points</span>
                <ul className="space-y-1">
                  {persona.painPoints.map((pain, i) => (
                    <li key={i} className="text-sm flex items-start">
                      <span className="mr-2">⚠️</span>
                      <span>{pain}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-xs uppercase block mb-2">Behaviors</span>
                <ul className="space-y-1">
                  {persona.behaviorsPreferences.map((behavior, i) => (
                    <li key={i} className="text-sm flex items-start">
                      <span className="mr-2">💡</span>
                      <span>{behavior}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-xs uppercase block mb-2">Use Cases</span>
                <div className="flex flex-wrap gap-1">
                  {persona.useCases.map((useCase, i) => (
                    <Badge 
                      key={i}
                      variant="outline"
                      className="border border-black dark:border-white text-xs"
                    >
                      {useCase}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-bold text-xs uppercase block mb-2">Visual Preferences</span>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Colors:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {persona.visualPreferences.preferredColors.map((color, i) => (
                        <Badge 
                          key={i}
                          variant="secondary"
                          className="text-xs"
                        >
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <strong>Style:</strong> {persona.visualPreferences.designStyle}
                  </div>
                  <div>
                    <strong>Layout:</strong> {persona.visualPreferences.layoutPreference}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
