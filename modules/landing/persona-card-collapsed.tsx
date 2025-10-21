'use client';

import { useState, forwardRef } from 'react';
import { MessageCircle, ChevronDown, Pencil, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { UserPersona } from '../persona-generator/types';

type PersonaCardCollapsedProps = {
  persona: UserPersona;
  onExpand: () => void;
  onChatClick: () => void;
  onEditClick: () => void;
  onExport: (format: 'png' | 'pdf' | 'markdown') => void;
};

export const PersonaCardCollapsed = forwardRef<HTMLDivElement, PersonaCardCollapsedProps>(
  function PersonaCardCollapsed({ persona, onExpand, onChatClick, onEditClick, onExport }, ref) {
  const [showExportMenu, setShowExportMenu] = useState(false);

  return (
    <div ref={ref}>
      <Card className="p-6 border-2 max-h-70 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all relative">
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

      {/* Export Button - Top Right (before edit) */}
      <div className="absolute top-4 right-14">
        <Button
          size="icon"
          variant="outline"
          onClick={() => setShowExportMenu(!showExportMenu)}
          className="rounded-full w-8 h-8 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
        >
          <Download className="h-3 w-3" />
        </Button>
        
        {/* Export Dropdown Menu */}
        {showExportMenu && (
          <div className="absolute top-10 right-0 bg-background border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] z-10 min-w-[120px]">
            <button
              onClick={() => {
                onExport('png');
                setShowExportMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-sm font-bold hover:bg-muted transition-colors border-b border-black dark:border-white"
            >
              PNG
            </button>
            <button
              onClick={() => {
                onExport('pdf');
                setShowExportMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-sm font-bold hover:bg-muted transition-colors border-b border-black dark:border-white"
            >
              PDF
            </button>
            <button
              onClick={() => {
                onExport('markdown');
                setShowExportMenu(false);
              }}
              className="w-full px-4 py-2 text-left text-sm font-bold hover:bg-muted transition-colors"
            >
              Markdown
            </button>
          </div>
        )}
      </div>

      {/* Edit Button - Top Right */}
      <Button
        size="icon"
        variant="outline"
        onClick={onEditClick}
        className="absolute top-4 right-4 rounded-full w-8 h-8 border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
      >
        <Pencil className="h-3 w-3" />
      </Button>

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
    </div>
  );
});
