'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { UserPersona } from '../persona-generator/types';

type PersonaChatModalProps = {
  persona: UserPersona;
  isOpen: boolean;
  onClose: () => void;
};


export function PersonaChatModal({ persona, isOpen, onClose }: PersonaChatModalProps) {

    console.log('PersonaChatModal rendered with persona:', persona);

  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: `Hi! I'm ${persona.name}, ${persona.demographic}. I'm here to help you understand my perspective as a user persona. Feel free to ask me anything about my needs, goals, or how I'd use your product!`
    }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    
    // Simulate assistant response (you can integrate with real AI later)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `As someone who ${persona.goalsMotivations[0].toLowerCase()}, I think that's an interesting question. Let me think about it from my perspective...` 
      }]);
    }, 1000);

    setInput('');
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
            <h3 className="text-xl font-black uppercase">{persona.name}</h3>
            <p className="text-sm opacity-90">{persona.demographic}</p>
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

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t-2 border-black dark:border-white">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={`Ask ${persona.name} anything...`}
              className="flex-1 px-4 py-2 border-2 border-black dark:border-white bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              onClick={handleSend}
              className="border-2 border-black dark:border-white font-bold uppercase"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
