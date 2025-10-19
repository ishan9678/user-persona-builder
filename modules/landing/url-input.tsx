'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { ProcessState } from './types';

type UrlInputProps = {
  onSubmit: (url: string, personaCount: number) => void;
  processState: ProcessState;
};

export function UrlInput({ onSubmit, processState }: UrlInputProps) {
  const [url, setUrl] = useState('');
  const [personaCount, setPersonaCount] = useState([3]);
  const [error, setError] = useState('');

  const isProcessing = processState.stage !== 'idle' && 
                       processState.stage !== 'complete' && 
                       processState.stage !== 'error';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      new URL(url);
      onSubmit(url, personaCount[0]);
    } catch {
      setError('Please enter a valid URL');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">
          User Persona Builder
        </h1>
        <p className="text-muted-foreground text-lg">
          Transform any website into detailed user personas
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="url" className="text-sm font-bold uppercase tracking-wide">
            Website URL
          </label>
          <Input
            id="url"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isProcessing}
            className="h-12 border-2 border-black dark:border-white font-medium shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
          />
          {error && (
            <p className="text-sm text-red-600 font-medium">{error}</p>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="persona-count" className="text-sm font-bold uppercase tracking-wide">
              Number of Personas
            </label>
            <Badge 
              variant="outline" 
              className="border-2 border-black dark:border-white font-bold text-base px-3"
            >
              {personaCount[0]}
            </Badge>
          </div>
          <Slider
            id="persona-count"
            min={1}
            max={5}
            step={1}
            value={personaCount}
            onValueChange={setPersonaCount}
            disabled={isProcessing}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-muted-foreground font-medium">
            <span>1</span>
            <span>5</span>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isProcessing || !url}
          className="w-full h-12 text-lg font-bold border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          {isProcessing ? 'Processing...' : 'Generate Personas'}
        </Button>
      </form>

      {isProcessing && (
        <div className="space-y-3 p-6 border-2 border-black dark:border-white bg-muted/50">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm uppercase tracking-wide">
              {processState.message}
            </span>
            <span className="text-sm font-mono font-bold">
              {processState.progress}%
            </span>
          </div>
          <Progress 
            value={processState.progress} 
            className="h-3 border-2 border-black dark:border-white"
          />
        </div>
      )}
    </div>
  );
}
