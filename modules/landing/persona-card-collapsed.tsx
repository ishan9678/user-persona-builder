'use client';

import { MessageCircle, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { UserPersona } from '../persona-generator/types';

type PersonaCardCollapsedProps = {
  persona: UserPersona;
  onExpand: () => void;
  onChatClick: () => void;
};

export function PersonaCardCollapsed({ persona, onExpand, onChatClick }: PersonaCardCollapsedProps) {
  return (
    <Card className="p-6 border-2 max-h-65 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all relative">
      <div className="space-y-4 pb-12">
        {/* Basic Info */}
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
      </div>

      {/* Expand Button - Bottom Left */}
      <Button
        size="icon"
        variant="outline"
        onClick={onExpand}
        className="absolute bottom-4 left-4 rounded-full w-10 h-10 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-all"
      >
        <ChevronDown className="h-4 w-4" />
      </Button>

      {/* Chat Button - Bottom Right */}
      <Button
        size="icon"
        onClick={onChatClick}
        className="absolute bottom-4 right-4 rounded-full w-12 h-12 border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-all"
      >
        <MessageCircle className="h-5 w-5" />
      </Button>
    </Card>
  );
}
